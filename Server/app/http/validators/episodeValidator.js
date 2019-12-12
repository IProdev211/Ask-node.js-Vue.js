const validator = require('./validator');
const {
  check
} = require('express-validator/check');
const Course = require('app/models/course');
const path = require('path');

class episodeValidator extends validator {
  handle() {
    return [
      check('title')
      .isLength({
        min: 5
      })
      .withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد'),

      check('type')
      .not()
      .isEmpty()
      .withMessage('فیلد نوع دوره نمیتواند خالی بماند'),

      check('course')
      .not()
      .isEmpty()
      .withMessage('فیلد دوره مربوطه نمیتواند خالی بماند'),

      check('body')
      .isLength({
        min: 20
      })
      .withMessage('متن دوره نمیتواند کمتر از 20 کاراکتر باشد'),

      check('videoUrl')
      .not()
      .isEmpty()
      .withMessage(' لینک دانلود نمیتواند خالی بماند'),

      check('number')
      .not()
      .isEmpty()
      .withMessage('شماره جلسه نمیتواند خالی بماند'),

      check('time')
      .not()
      .isEmpty()
      .withMessage('طول فیلم نمیتواند خالی بماند')
      .custom(async (value, {
        req
      }) => {
        const matches = value.match(/^(\d{2})\:(\d{2})\:(\d{2})$/);
        if (!matches) {
          throw new Error(
            'طول فیلم را به فرمت HH:MM:SS وارد کنید.'
          );
        }
        if (matches[3] > 59) {
          throw new Error(
            'ثانیه نمیتواند مقداری بیشتراز 59 داشته باشد'
          );
        } else if (matches[2] > 59) {
          throw new Error(
            'دقیقه نمیتواند مقداری بیشتراز 59 داشته باشد'
          );
        }
      }),
    ];
  }

  slug(title) {
    return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/gi, '-');
  }
}

module.exports = new episodeValidator();