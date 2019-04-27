const validator = require('./validator');
const { check } = require('express-validator/check');
const User = require('app/models/user');
const path = require('path');

class userValidator extends validator {
	
	handle() {
		return [
			check('email')
				.custom(async (value , { req }) => {
					const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (! reg.test(value)) {
						throw new Error('مقدار وارد شده برای ایمیل نامعتبر است.');
					}
					const user = await User.findOne({ email : value });
					if (user) {
						throw new Error('چنین کاربری با این ایمیل قبلا در سایت ثبت نام شده است');
					}
				}),

			check('avatar')
				.custom(async (value , { req }) => {
					if (value === undefined) return;

					let fileExt = ['.png' , '.jpg' , '.jpeg' , '.svg'];
					if(! fileExt.includes(path.extname(value)))
						throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست')
				}),
			
			check('name')
				.not().isEmpty()
				.withMessage('فیلد نام کاربر نمیتواند خالی بماند'),


			check('xp')
				.custom(async (value , { req }) => {
					if (value === undefined) return;
					if (parseInt(value, 10) < 0)
						throw new Error('امتیاز کاربر نمیتواند کمتر از 0 باشد')
				}),

			check('password')
				.not().isEmpty()
				.withMessage('فیلد کلمه عبور نمیتواند خالی بماند')
				.isLength({ min : 8 })
				.withMessage('کلمه عبور نمیتواند کمتر از 8 کاراکتر باشد'),
		]
	}
	handleUpdate() {
		return [
			check('email')
				.custom(async (value , { req }) => {
					const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (! reg.test(value)) {
						throw new Error('مقدار وارد شده برای ایمیل نامعتبر است.');
					}
					const user = await User.findOne({
						$and: [
							{ $ne: { id: req.params.id } },
							{ email: value },
						],
					});
					if (user) {
						throw new Error('چنین کاربری با این ایمیل قبلا در سایت ثبت نام شده است');
					}
				}),

			check('avatar')
				.custom(async (value , { req }) => {
					if (value === undefined) return;

					let fileExt = ['.png' , '.jpg' , '.jpeg' , '.svg'];
					if(! fileExt.includes(path.extname(value)))
						throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست')
				}),
			
			check('name')
				.not().isEmpty()
				.withMessage('فیلد نام کاربر نمیتواند خالی بماند'),


			check('xp')
				.custom(async (value , { req }) => {
					if (value && value < 0)
						throw new Error('امتیاز کاربر نمیتواند کمتر از 0 باشد')
				}),

			check('password')
				.isEmpty()
				.isLength({ min : 8 })
				.withMessage('کلمه عبور نمیتواند کمتر از 8 کاراکتر باشد')
		]
	}

	
	slug(title) {
		return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
	}
}

module.exports = new userValidator();