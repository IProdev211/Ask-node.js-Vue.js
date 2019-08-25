const controller = require('app/http/controllers/api/controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const HomeController = require('./homeController');
const Log = require('app/models/log');
const User = require('app/models/user');
const PasswordReset = require('app/models/password-reset');
const uniqueString = require('unique-string');
const mail = require('app/helpers/mail');
const ActivationCode = require('app/models/activationCode');

class authController extends controller {
  async login(req, res) {
    if (!(await this.recaptchaValidation(req, res))) {
      return;
    }
    if (!(await this.validationData(req, res))) return;

    passport.authenticate(
      'local.login',
      { session: true },
      async (err, user) => {
        if (err) return this.failed(err.message, res);
        if (!user) return this.failed('چنین کاربری وجود ندارد', res, 404);
        if (!user.active) {
          const activeCode = await ActivationCode.findOne({
            user: user.id
          })
            .gt('expire', new Date())
            .sort({
              createdAt: 1
            })
            .populate('user')
            .exec();
          if (activeCode) {
            return this.failed(
              'لینک فعال سازی اکانت به ایمیل شما ارسال شده برای ارسال دوباره لطفا 10 دقیقه صبر کنید و دوباره اقدام به ورود کنید تا لینک جدید به ایمیل شما ارسال شود',
              res,
              403
            );
          } else {
            return this.sendActivateEmail(res, user);
          }
        } else {
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
        }
      }
    )(req, res);
  }
  async register(req, res) {
    if (!(await this.recaptchaValidation(req, res))) {
      return;
    }
    if (!(await this.validationData(req, res))) return;
    passport.authenticate(
      'local.register',
      { failWithError: true },
      async (err, user) => {
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
        if (!user.active) {
          return await this.sendActivateEmail(res, user);
        } else {
          return res.json({
            data: {
              user: HomeController.filterUserData(user)
            },
            status: 'success'
          });
        }
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
  async sendPasswordResetLink(req, res, next) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      this.failed('چنین کاربری وجود ندارد', res);
      return this.back(req, res);
    }

    const newPasswordReset = new PasswordReset({
      email: req.body.email,
      token: uniqueString()
    });

    await newPasswordReset.save();

    const mailOptions = {
      from: '"اسک آریا 👻" <info@askarya.ir>',
      to: `${newPasswordReset.email}`,
      subject: 'ریست کردن پسورد',
      html: `<h2>ریست کردن پسورد</h2>
             <p>برای ریست کردن پسورد بر روی لینک زیر کلیک کنید</p>
             <a href="${config.siteurl}/auth/password/reset/${newPasswordReset.token}">ریست کردن</a>`
    };

    mail.sendMail(mailOptions, err => {
      if (err) {
        this.failed('متاسفانه امکان ارسال ایمیل وجود ندارد.', res, 500);
        console.log(err);
        return;
      }
      res.json({
        status: 'success'
      });
    });
  }
  async resetPasswordProccess(req, res, next) {
    if (!(await this.validationData(req, res))) {
      return;
    }
    const field = await PasswordReset.findOne({ token: req.params.token });
    if (!field) {
      return this.failed('اطلاعات وارد شده صحیح نیست لطفا دقت کنید', res, 403);
    }

    if (field.use) {
      return this.failed(
        'از این لینک برای بازیابی پسورد قبلا استفاده شده است',
        res,
        403
      );
    }

    const user = await User.findOneAndUpdate(
      { email: field.email },
      {
        $set: {
          password: req.body.password
        }
      }
    );
    if (!user) {
      return this.failed('اپدیت شدن انجام نشد', res, 500);
    }
    await field.updateOne({ use: true });
    res.json({
      status: 'success'
    });
  }
  async sendActivateEmail(res, user) {
    const code = uniqueString();
    const newActiveCode = new ActivationCode({
      user: user.id,
      code,
      expire: Date.now() + 1000 * 60 * 10
    });

    await newActiveCode.save();

    const mailOptions = {
      from: '"اسک آریا" <info@askarya.ir>', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'فعال سازی اکانت اسک آریا', // Subject line
      html: `
                      <h2>فعال سازی اکانت اسک آریا</h2>
                      <p>برای فعال شدن اکانت بر روی لینک زیر کلیک کنید</p>
                      <a href="${config.siteurl}/user/activation/${newActiveCode.code}">فعال سازی</a>
                  ` // html body
    };

    mail.sendMail(mailOptions, (err, info) => {
      if (err) {
        this.failed('متاسفانه امکان ارسال ایمیل وجود ندارد.', res, 500);
        console.log('sendMail.err', err);
        return;
      }
      console.log('Message Sent : %s', info.messageId);
      return res.json({
        data: 'ایمیل حاوی لینک فعال سازی به ایمیل شما ارسال شد',
        status: 'success'
      });
    });
  }
}

module.exports = new authController();
