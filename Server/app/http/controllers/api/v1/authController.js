const controller = require('app/http/controllers/api/controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const HomeController = require('./homeController');
const Log = require('app/models/log');

class authController extends controller {
  async login(req, res) {
    if (!(await this.validationData(req, res))) return;

    passport.authenticate('local.login', { session: true }, (err, user) => {
      if (err) return this.failed(err.message, res);
      if (!user) return this.failed('چنین کاربری وجود ندارد', res, 404);

      req.login(user, { session: true }, async err => {
        if (err) return this.failed(err.message, res);

        // create token
        const token = jwt.sign({ id: user.id }, config.jwt.secret_key, {
          expiresIn: 60 * 60 * 24
        });
        if (req.body.remember) {
          user.setRememberToken(res);
        }
        const ip =
          req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const loginLog = new Log({
          ip: ip,
          user: user.id,
          type: 'login',
          title: ` گزارش ورود به سیستم با آدرس آی پی ${ip} ثبت شده است. در صورتی که فکر میکنید این کار توسط شما انجام نشده هر چه سریع تر با مدیریت اسک آریا تماس بگیرید. `
        });
        await loginLog.save();
        user = await user
          .populate({
            path: 'roles',
            select: 'name label permissions',
            populate: [{ path: 'permissions' }]
          })
          .execPopulate();
        return res.json({
          data: {
            token,
            user: HomeController.filterUserData(user)
          },
          status: 'success'
        });
      });
    })(req, res);
  }
  async register(req, res) {
    if (!(await this.validationData(req, res))) return;
    passport.authenticate(
      'local.register',
      { failWithError: true },
      (err, user) => {
        if (err) return this.failed(err.message, res);
        if (!user)
          return this.failed('خطایی در حین ثبت نام بوجود آمده', res, 500);
        const ip =
          req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const registerLog = new Log({
          ip: ip,
          user: user.id,
          type: 'register',
          title: `به مجموعه اسک آریا خوش آمدید.`
        });
        registerLog.save();
        return res.json({
          data: {
            user: HomeController.filterUserData(user)
          },
          status: 'success'
        });
      }
    )(req, res);
  }
  async logout(req, res) {
    const user = req.user;
    user.removeRememberToken(res);
    req.logout();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const logoutLog = new Log({
      ip: ip,
      user: user.id,
      type: 'logout',
      title: ` گزارش خروج از سیستم با آدرس آی پی ${ip} ثبت شده است. `
    });
    logoutLog.save();
    res.json({
      status: 'success'
    });
  }
}

module.exports = new authController();
