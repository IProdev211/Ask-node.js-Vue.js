const express = require('express');
const router = express.Router();
const passport = require('passport');
const Log = require('app/models/log');

// Controllers
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const forgotPasswordController = require('app/http/controllers/auth/forgotPasswordController');
const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');

// validators
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');
const forgotPasswordValidator = require('app/http/validators/forgotPasswordValidator');
const resetPasswordValidator = require('app/http/validators/resetPasswordValidator');

let backTo = "dashboard";

// Home Routes
router.get('/login', loginController.showLoginForm);
router.post('/login', loginValidator.handle(), loginController.loginProccess);

router.get('/register', registerController.showRegsitrationForm);
router.post(
  '/register',
  registerValidator.handle(),
  registerController.registerProccess
);

router.get('/password/reset', forgotPasswordController.showForgotPassword);
router.post(
  '/password/email',
  forgotPasswordValidator.handle(),
  forgotPasswordController.sendPasswordResetLink
);

router.get('/password/reset/:token', resetPasswordController.showResetPassword);
router.post(
  '/password/reset',
  resetPasswordValidator.handle(),
  resetPasswordController.resetPasswordProccess
);

router.get(
  '/google',
  (req, res, next) => {
    if (req.query.hasOwnProperty("backTo")) {
      backTo = req.query.backTo;
    } else {
      backTo = "dashboard";
    }
    return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  },
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: config.siteurl + '/register'
  }),
  (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let loginLog;
    if (!req.user.justRegistered) {
      loginLog = new Log({
        ip: ip,
        user: req.user.id,
        type: 'login',
        title: ` گزارش ورود به سیستم با آدرس آی پی ${ip} ثبت شده است. در صورتی که فکر میکنید این کار توسط شما انجام نشده هر چه سریع تر با مدیریت اسک آریا تماس بگیرید. `
      });
    } else {
      loginLog = new Log({
        ip: ip,
        user: req.user.id,
        type: 'register',
        title: `به مجموعه اسک آریا خوش آمدید.`
      });
    }
    loginLog.save();
    res.redirect(config.siteurl + `/${backTo}`);
  }
);

module.exports = router;
