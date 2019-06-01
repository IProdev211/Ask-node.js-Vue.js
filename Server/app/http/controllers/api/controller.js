const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const { validationResult } = require('express-validator/check');
const isMongoId = require('validator/lib/isMongoId');

module.exports = class controller {
  constructor() {
    autoBind(this);
    this.recaptchaConfig();
  }

  failed(msg, res, statusCode = 500) {
    res.status(statusCode).json({
      data: msg,
      status: 'error'
    });
  }
  recaptchaConfig() {
    this.recaptcha = new Recaptcha(
      config.service.recaptcha.client_key,
      config.service.recaptcha.secret_key,
      { ...config.service.recaptcha.options }
    );
  }

  recaptchaValidation(req, res) {
    return new Promise((resolve, reject) => {
      this.recaptcha.verify(req, (err, data) => {
        if (err) {
          this.failed(
            'گزینه امنیتی مربوط به شناسایی روبات خاموش است، لطفا از فعال بودن آن اطمینان حاصل نمایید و مجدد امتحان کنید',
            res,
            403
          );
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async validationData(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];

      errors.forEach(err => messages.push(err.msg));

      this.failed(messages, res, 403);

      return false;
    }

    return true;
  }
  isMongoId(res, paramId) {
    if (!isMongoId(paramId)) this.failed('ای دی وارد شده صحیح نیست', res, 404);
  }
  secondsToTime(seconds) {
		const hour = Math.floor(seconds / 3600);
		const min = Math.floor((seconds % 3600) / 60);
		const second = Math.floor((seconds % 3600) % 60);
		return (hour > 0 ?(hour <= 9 ? "0" + hour : hour) + ":" : "") + (min <= 9 ? "0" + min : min) + ":" + (second <= 9 ? "0" + second : second);
	}
	timeToSeconds(time) {
		let seconds = 0;
		const parts = time.split(":", 3);
		for (let x = 0; x < parts.length; x++) {
			seconds += (parseInt(parts[x]) || 0) * Math.pow(60, parts.length - x - 1);
		}
		return seconds;
	}
};
