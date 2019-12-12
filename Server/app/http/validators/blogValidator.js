const validator = require('./validator');
const {
  check
} = require('express-validator/check');
const path = require('path');
const User = require('app/models/user');
const Post = require('app/models/blogPost');

class blogValidator extends validator {
  handle() {
    return [
      check('image').custom(async (value, {
        req
      }) => {
        if (value === undefined) return;

        let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
        if (!fileExt.includes(path.extname(value)))
          throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
      }),
      check('name')
      .not()
      .isEmpty()
      .withMessage('فیلد نام پست نمیتواند خالی بماند')
      .custom(async (value, {
        req
      }) => {
        let post = await Post.findOne({
          slug: this.slug(value)
        });
        if (post) {
          throw new Error(
            'چنین پستی با این عنوان قبلا در سایت قرار داد شده است'
          );
        }
      }),
      check('author').custom(async (value, {
        req
      }) => {
        const user = await User.findById(value);
        if (!user) {
          throw new Error('کاربری با این مشخصات در سیستم پیدا نشد');
        }
      }),
      check('name')
      .not()
      .isEmpty()
      .withMessage('محتوای پست نمیتواند خالی بماند'),
      check('tags')
      .not()
      .isEmpty()
      .withMessage('تگ های پست نمیتواند خالی بماند'),
      check('categories')
      .not()
      .isEmpty()
      .withMessage('دسته ندی های پست نمیتواند خالی بماند')
    ];
  }
  handleUpdate() {
    return [
      check('image').custom(async (value, {
        req
      }) => {
        if (value === undefined) return;

        let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
        if (!fileExt.includes(path.extname(value)))
          throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
      }),
      check('name')
      .not()
      .isEmpty()
      .withMessage('فیلد نام پست نمیتواند خالی بماند')
      .custom(async (value, {
        req
      }) => {
        let post = await Post.findById(req.params.id);
        if (post.name === value) return;

        post = await Post.findOne({
          slug: this.slug(value)
        });
        if (post) {
          throw new Error(
            'چنین پستی با این عنوان قبلا در سایت قرار داد شده است'
          );
        }
      }),
      check('author').custom(async (value, {
        req
      }) => {
        const user = await User.findById(value);
        if (!user) {
          throw new Error('کاربری با این مشخصات در سیستم پیدا نشد');
        }
      }),
      check('name')
      .not()
      .isEmpty()
      .withMessage('محتوای پست نمیتواند خالی بماند'),
      check('tags')
      .not()
      .isEmpty()
      .withMessage('تگ های پست نمیتواند خالی بماند'),
      check('categories')
      .not()
      .isEmpty()
      .withMessage('دسته ندی های پست نمیتواند خالی بماند')
    ];
  }
  slug(title) {
    return title.trim().replace(/([^۰-۹آ-یa-z0-9]|-)+/gi, '-');
  }
}

module.exports = new blogValidator();