const autoBind = require('auto-bind');
const { validationResult } = require('express-validator/check');
const isMongoId = require('validator/lib/isMongoId');

module.exports = class controller {
  constructor() {
    autoBind(this);
  }

  failed(msg, res, statusCode = 500) {
    res.status(statusCode).json({
      data: msg,
      status: 'error'
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
};
