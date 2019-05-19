const controller = require('app/http/controllers/api/controller');
const blogPost = require('app/models/blogPost');
const blogCategory = require('app/models/blogCategory');
const blogTag = require('app/models/blogTag');
const User = require('app/models/user');

class blogController extends controller {
  async index(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 15;
    let filter = {};
    if (req.query.filter) {
      filter = {
        $or: [
          { id: req.query.filter },
          { name: { $regex: req.query.filter, $options: 'i' } }
        ]
      };
    }
    const posts = await blogPost.paginate(filter, {
      page,
      sort: {
        createdAt: 1
      },
      limit: parseInt(limit, 10),
      populate: [
        { path: 'author', select: 'id name' },
        { path: 'tags', select: 'name' },
        { path: 'categories', select: 'name' }
      ]
    });
    const data = {
      ...posts,
      docs: posts.docs.map(this.filterData)
    };
    res.json(data);
  }

  filterData(post) {
    return {
      id: post.id,
      name: post.name,
      slug: post.slug,
      content: post.content,
      views: post.views,
      image: post.image,
      tags: post.tags.map(tag => tag.name),
      categories: post.categories.map(cate => cate.name),
      author: {
        id: post.author.id,
        name: post.author.name
      },
      createdAt: post.createdAt
    };
  }
  async store(req, res) {
    if (!(await this.validationData(req, res))) return;
    let image;
    if (req.file) {
      image = this.getUrlImage(`${req.file.destination}/${req.file.filename}`);
    }
    let { name, author, content, tags, categories } = req.body;
    const tagObjects = [];
    if (typeof tags == 'string') {
      tags = tags.split(',');
    }
    if (typeof categories == 'string') {
      categories = categories.split(',');
    }
    for (const tag of tags) {
      let obj = await blogTag.findOne({ name: tag }).exec();
      if (!obj) {
        obj = new blogTag({
          name: tag.trim(),
          slug: this.slug(tag)
        });
        await obj.save();
      }
      tagObjects.push(obj);
    }
    const coategoryObjects = [];
    for (const category of categories) {
      let obj = await blogCategory.findOne({ name: category }).exec();
      if (!obj) {
        obj = new blogCategory({
          name: category.trim(),
          slug: this.slug(category)
        });
        await obj.save();
      }
      coategoryObjects.push(obj);
    }
    const newPost = await new blogPost({
      name: name,
      slug: this.slug(name),
      image: image || null,
      author: author,
      content: content,
      tags: tagObjects.map(tag => tag.id),
      categories: coategoryObjects.map(category => category.id)
    });
    await newPost.save();
    res.json({
      post: this.filterPostData(
        newPost,
        await User.findById(author),
        tagObjects,
        coategoryObjects
      ),
      status: 'success'
    });
  }
  async update(req, res) {
    if (!(await this.validationData(req, res))) return;
    let post = await blogPost.findById(req.params.id).exec();
    if (!post) {
      return this.failed('چنین پستی وجود ندارد.', res, 404);
    }
    const objForUpdate = {};
    if (req.file) {
      objForUpdate.image = this.getUrlImage(
        `${req.file.destination}/${req.file.filename}`
      );
    }
    let { tags, categories } = req.body;
    const tagObjects = [];
    if (typeof tags == 'string') {
      tags = tags.split(',');
    }
    if (typeof categories == 'string') {
      categories = categories.split(',');
    }
    for (const tag of tags) {
      let obj = await blogTag.findOne({ name: tag }).exec();
      if (!obj) {
        obj = new blogTag({
          name: tag.trim(),
          slug: this.slug(tag)
        });
        await obj.save();
      }
      tagObjects.push(obj);
    }
    delete req.body.tags;
    objForUpdate.tags = tagObjects.map(tag => tag.id);
    const coategoryObjects = [];
    for (const category of categories) {
      let obj = await blogCategory.findOne({ name: category }).exec();
      if (!obj) {
        obj = new blogCategory({
          name: category.trim(),
          slug: this.slug(category)
        });
        await obj.save();
      }
      coategoryObjects.push(obj);
    }
    delete req.body.categories;
    objForUpdate.slug = this.slug(req.body.name);
    objForUpdate.categories = coategoryObjects.map(category => category.id);
    post = await blogPost.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body, ...objForUpdate }
      },
      {
        new: true
      }
    );
    res.json({
      post: this.filterPostData(
        post,
        await User.findById(req.body.author),
        tagObjects,
        coategoryObjects
      ),
      status: 'success'
    });
  }
  filterPostData(post, author, categories, tags) {
    return {
      id: post.id,
      name: post.name,
      slug: post.slug,
      content: post.content,
      views: post.views,
      image: post.image,
      tags: tags.map(tag => {
        return {
          name: tag.name,
          slug: tag.slug
        };
      }),
      categories: categories.map(cate => {
        return {
          name: cate.name,
          slug: cate.slug
        };
      }),
      author: {
        id: author.id,
        name: author.name
      },
      createdAt: post.createdAt
    };
  }
  async destroy(req, res) {
    this.isMongoId(res, req.params.id);
    const post = await blogPost.findById(req.params.id).exec();
    if (!post) {
      return this.failed('چنین پستی وجود ندارد', res, 404);
    }
    post.remove();
    return res.json({
      status: 'success'
    });
  }
  async upload(req, res) {
    if (!req.file) {
      return this.failed('فایل ارسال شده معتبر نیست', res, 403);
    }
    const image = this.getUrlImage(
      `${req.file.destination}/${req.file.filename}`
    );
    res.json({
      image: image,
      status: 'success'
    });
  }
  getUrlImage(dir) {
    return dir.substring(8);
  }
  slug(title) {
    return title.trim().replace(/([^۰-۹آ-یa-z0-9]|-)+/gi, '-');
  }
}

module.exports = new blogController();
