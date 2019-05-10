const controller = require('app/http/controllers/api/controller');
const Post = require('app/models/blogPost');

class blogController extends controller {
  async bySlug(req, res) {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } }
    )
      .populate([
        {
          path: 'author',
          select: 'id name'
        },
        {
          path: 'tags',
          select: 'name slug'
        },
        {
          path: 'categories',
          select: 'name slug'
        }
      ])
      .exec();
    if (!post) {
      return this.failed('چنین مطلبی وجود ندارد', res, 404);
    }
    return res.json({
      post: this.filterData(post),
      status: 'success'
    });
  }
  filterData(post) {
    return {
      id: post.id,
      slug: post.slug,
      name: post.name,
      views: post.views,
      content: post.content,
      image: post.image,
      author: {
        id: post.author.id,
        name: post.author.name
      },
      tags: post.tags.map(tag => {
        return {
          name: tag.name,
          slug: tag.slug
        };
      }),
      categories: post.categories.map(cat => {
        return {
          name: cat.name,
          slug: cat.slug
        };
      })
    };
  }
}

module.exports = new blogController();
