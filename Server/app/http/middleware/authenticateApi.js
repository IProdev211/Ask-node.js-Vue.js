const User = require('app/models/user');
const middleware = require('./middleware');
const passport = require('passport');

class authenticateApi extends middleware {
  handle(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        data: 'اجازه دسترسی ندارید',
        status: 'error'
      });
    }
    next();
  }
}

module.exports = new authenticateApi();
