const validator = require('./validator');
const { check } = require('express-validator/check');
const User = require('app/models/user');
const path = require('path');
const moment = require('moment');

class userValidator extends validator {
  handle() {
    return [
      check('email').custom(async (value, { req }) => {
        const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(value)) {
          throw new Error('مقدار وارد شده برای ایمیل نامعتبر است.');
        }
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error(
            'چنین کاربری با این ایمیل قبلا در سایت ثبت نام شده است'
          );
        }
      }),

      check('avatar').custom(async (value, { req }) => {
        if (value === undefined) return;

        let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
        if (!fileExt.includes(path.extname(value)))
          throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
      }),

      check('name')
        .not()
        .isEmpty()
        .withMessage('فیلد نام کاربر نمیتواند خالی بماند'),

      check('xp').custom(async (value, { req }) => {
        if (value === undefined) return;
        if (parseInt(value, 10) < 0)
          throw new Error('امتیاز کاربر نمیتواند کمتر از 0 باشد');
      }),

      check('password')
        .not()
        .isEmpty()
        .withMessage('فیلد کلمه عبور نمیتواند خالی بماند')
        .isLength({ min: 8 })
        .withMessage('کلمه عبور نمیتواند کمتر از 8 کاراکتر باشد'),

      check('vipTime')
        .not()
        .isEmpty()
        .withMessage('فیلد زمان پایان VIP نمیتواند خالی بماند')
        .custom(async (value, { req }) => {
          const moment = moment(value);
          if (!moment.isValid()) {
            throw new Error('مقدار وارد شده برای پایان زمان VIP نامعتبر است.');
          }
          req.body.vipTime = moment.toISOString();
        }),
      check('vipFrom')
        .not()
        .isEmpty()
        .withMessage('فیلد زمان شروع VIP نمیتواند خالی بماند')
        .custom(async (value, { req }) => {
          const moment = moment(value);
          if (!moment.isValid()) {
            throw new Error('مقدار وارد شده برای شروع زمان VIP نامعتبر است.');
          }
          req.body.vipFrom = moment.toISOString();
        })
    ];
  }
  handleUpdate() {
    return [
      check('email').custom(async (value, { req }) => {
        const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(value)) {
          throw new Error('مقدار وارد شده برای ایمیل نامعتبر است.');
        }
        const user = await User.findOne({
          $and: [{ _id: { $ne: req.params.id } }, { email: value }]
        });
        if (user) {
          throw new Error(
            'چنین کاربری با این ایمیل قبلا در سایت ثبت نام شده است'
          );
        }
      }),

      check('avatar').custom(async (value, { req }) => {
        if (value === undefined) return;

        let fileExt = ['.png', '.jpg', '.jpeg', '.svg'];
        if (!fileExt.includes(path.extname(value)))
          throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
      }),

      check('name')
        .not()
        .isEmpty()
        .withMessage('فیلد نام کاربر نمیتواند خالی بماند'),

      check('xp').custom(async (value, { req }) => {
        if (value === undefined) return;
        if (value < 0) throw new Error('امتیاز کاربر نمیتواند کمتر از 0 باشد');
      }),

      check('password').custom(async (value, { req }) => {
        if (value === undefined) return;
        if (value.length < 8) {
          throw new Error('کلمه عبور نمیتواند کمتر از 8 کاراکتر باشد');
        }
      }),
      check('vipTime')
        .not()
        .isEmpty()
        .withMessage('فیلد زمان پایان VIP نمیتواند خالی بماند')
        .custom(async (value, { req }) => {
          value = moment(value, 'YYYY/MM/DD');
          if (!value.isValid()) {
            throw new Error('مقدار وارد شده برای پایان زمان VIP نامعتبر است.');
          }
          req.body.vipTime = value.toDate().toISOString();
        }),
      check('vipFrom')
        .not()
        .isEmpty()
        .withMessage('فیلد زمان شروع VIP نمیتواند خالی بماند')
        .custom(async (value, { req }) => {
          value = moment(value, 'YYYY/MM/DD');
          if (! value.isValid()) {
            throw new Error('مقدار وارد شده برای شروع زمان VIP نامعتبر است.');
          }
          req.body.vipFrom = value.toDate().toISOString();
        })
    ];
  }

  slug(title) {
    return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/gi, '-');
  }
}

module.exports = new userValidator();
