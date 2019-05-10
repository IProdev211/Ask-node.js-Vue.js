const validator = require('./validator');
const { check } = require('express-validator/check');

class profileValidator extends validator {
  handle() {
    return [
      check('email')
        .isEmail()
        .withMessage('فیلد ایمیل معتبر نیست'),

      check('name')
        .isString()
        .withMessage('لطفا نام خود را بصورت صحیح وارد کنید.'),

      check('lang')
        .isIn(['en', 'fa'])
        .optional()
        .withMessage('زبان انتخاب شده معتبر نیست.'),

      check('avatar').custom(async value => {
        if (!value) {
          return;
        }
        const fileExt = ['.png', '.jpg', '.jpeg'];
        if (!fileExt.includes(path.extname(value))) {
          throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست');
        }
      })
    ];
  }
}

module.exports = new profileValidator();
