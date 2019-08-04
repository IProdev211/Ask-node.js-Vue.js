const validator = require('./validator');
const { check } = require('express-validator/check');
const User = require('app/models/user');

class ticketValidator extends validator {
  handle() {
    return [
      check('title')
        .not()
        .isEmpty()
        .withMessage('فیلد عنوان تیکت نمیتواند خالی بماند'),
      check('user').custom(async (value, { req }) => {
        const user = await User.findById(value);
        if (! user) {
          throw new Error('کاربری با این مشخصات در سیستم پیدا نشد');
        }
        req.body.user = user;
      }),
      check('message')
        .not()
        .isEmpty()
        .withMessage('متن تیکت نمیتواند خالی بماند'),
      check('priority')
        .not()
        .isEmpty()
        .withMessage('اولویت تیکت نمیتواند خالی بماند')
        .custom(async (value, {req}) => {
          if ([
            "عادی",
            "مهم",
            "فوری",
          ].indexOf(value) == -1) {
            throw new Error('اولویت مشخص شده نامعتبر است.');
          }
        }),
      check('department')
        .not()
        .isEmpty()
        .withMessage('دپارتمان تیکت نمیتواند خالی بماند')
        .custom(async (value, {req}) => {
          if ([
            "پشتیبانی",
            "فروش و مالی",
            "آموزش",
          ].indexOf(value) == -1) {
            throw new Error('دپارتمان مشخص شده نامعتبر است.');
          }
        })
    ];
  }
  handleReply() {
    return [
      check('file').custom(async (value, { req }) => {
        if (value === undefined || (req.user && req.user.admin)) return;
  
        let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
        if (!fileExt.includes(path.extname(value)))
          throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
      }),
      check('message')
        .not()
        .isEmpty()
        .withMessage('متن تیکت نمیتواند خالی بماند'),
    ];
  }
}

module.exports = new ticketValidator();
