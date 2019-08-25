const controller = require('app/http/controllers/api/controller');
const HomeController = require('app/http/controllers/api/v1/homeController');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const Payment = require('app/models/payment');
const ZarinpalCheckout = require('zarinpal-checkout');
const path = require('path');
const sharp = require('sharp');
const Log = require('app/models/log');

class dashboardController extends controller {
  async index(req, res) {
    let page = req.query.page || 1;
    let condition = {};
    const isVip = req.user.vipTime && new Date(req.user.vipTime) > new Date();
    if (true || isVip) {
      condition = {
        $or: [{ _id: { $in: req.user.learning } }, { type: 'VIP' }]
      };
    } else {
      condition = { _id: { $in: req.user.learning } };
    }
    const courses = await Course.find(condition, '_id').exec();
    console.log('courses', courses);
    const promises = [
      Episode.countDocuments().exec(),
      Episode.countDocuments({
        course: {
          $in: courses.map(course => {
            return course.id;
          })
        }
      }).exec(),
      Payment.paginate(
        { user: req.user.id },
        {
          page: page,
          sort: { createdAt: -1 },
          limit: 20,
          populate: {
            path: 'course',
            select: '_id title images thumb price vip'
          },
          select: '_id createdAt price payment course vip'
        }
      )
    ];

    const results = await Promise.all(promises);
    const response = {
      status: true,
      courses: courses.length,
      episodes: [results[1], results[0]],
      payments: {
        ...results[2]
      }
    };
    res.json(response);
  }
  async updateProfile(req, res) {
    if (!(await this.validationData(req, res))) return;
    let avatar;
    if (req.file) {
      avatar = this.imageResize(req.file, 250);
    }
    const user = await req.user
      .populate({
        path: 'roles',
        select: 'name label permissions',
        populate: [{ path: 'permissions' }]
      })
      .populate({
        path: 'roles',
        select: 'name label permissions',
        populate: [{ path: 'permissions' }]
      })
      .execPopulate();

    user.name = req.body.name;
    user.email = req.body.email;
    user.lang = req.body.lang;
    if (avatar) {
      user.avatar = avatar;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    try {
      await user.save();
      res.json({
        status: true,
        user: HomeController.filterUserData(user)
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }
  async logs(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const logs = await Log.paginate(
      { user: req.user.id },
      {
        page,
        sort: {
          createdAt: -1
        },
        limit: parseInt(limit, 10),
        populate: [{ path: 'user' }]
      }
    );
    const data = {
      ...logs,
      docs: logs.docs.map(this.filterLogData)
    };
    res.json(data);
  }
  filterLogData(log) {
    return {
      id: log.id,
      title: log.title,
      ip: log.ip,
      type: log.type,
      createdAt: log.createdAt,
      user: {
        id: log.user.id,
        name: log.user.name
      }
    };
  }
  imageResize(image, size) {
    const imageInfo = path.parse(image.path);
    const imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;

    const url = this.getUrlImage(`${image.destination}/${imageName}`);

    sharp(image.path)
      .resize(size, null)
      .toFile(`${image.destination}/${imageName}`);
    return url;
  }
  getUrlImage(dir) {
    return dir.substring(8);
  }
  async vipPayment(req, res) {
    try {
      let price;
      let vipMonth = 1;
      switch (req.body.plan) {
        case 4:
          price = 139000;
          vipMonth = 4;
          break;
        case 12:
          price = 309000;
          vipMonth = 12;
          break;
        default:
          price = 39000;
          break;
      }
      const zarinpal = ZarinpalCheckout.create(
        config.service.zarinpal.merchant_id,
        true
      );
      const response = await zarinpal.PaymentRequest({
        Amount: price,
        CallbackURL: `${config.siteurl}/courses`,
        Description: `بابت افزایش اعتبار ویژه`
      });
      if (response.status === 100) {
        const payment = new Payment({
          user: req.user.id,
          vip: true,
          resnumber: response.authority,
          price: price,
          vipMonth: vipMonth
        });
        await payment.save();
        return res.json({
          redirect: response.url,
          status: 'success'
        });
      }
    } catch (err) {
      return this.failed(err.errors, res, 500);
    }
  }
  async vipPaymentVerfication(req, res) {
    if (!req.body.status || req.body.status !== 'OK') {
      return this.failed('پرداخت شما با موفقیت انجام نشد', res, 500);
    }
    const payment = await Payment.findOne({
      resnumber: req.body.authority
    })
      .populate([{ path: 'user' }])
      .exec();

    if (!payment.vip) {
      return this.failed(
        'تراکنش مالی شما مربوط به خرید اشتراک ویژه نیست.',
        res,
        500
      );
    }
    const zarinpal = ZarinpalCheckout.create(
      config.service.zarinpal.merchant_id,
      true
    );
    const response = await zarinpal.PaymentVerification({
      Amount: payment.price,
      Authority: payment.resnumber
    });
    if (response.status !== 100) {
      return this.failed('پرداخت شما با موفقیت انجام نشد', res, 500);
    }
    let time, type;
    switch (payment.price) {
      case 39000:
        time = 1;
        type = 'month';
        break;
      case 139000:
        time = 4;
        type = '4month';
        break;
      case 309000:
        time = 12;
        type = '12month';
        break;
    }
    let vipTime = (payment.user.isVip()
      ? new Date(payment.user.vipTime)
      : new Date()
    ).getTime();
    vipTime += time * 30.41 * 86400 * 1000;
    vipTime = new Date(vipTime);
    payment.user.set({ vipTime, vipType: type });
    await payment.user.save();
    payment.payment = true;
    await payment.save();
    const paymentLog = new Log({
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      user: payment.user.id,
      type: 'vip_payment',
      title: `از پرداخت شما سپاسگزاریم، اعتبار اکانت ویژه شما تا ${time} ماه دیگر تمدید شد.`
    });
    await paymentLog.save();
    return res.json({
      vipTime,
      message: 'پرداخت شما با موفقیت انجام شد',
      status: true
    });
  }
}

module.exports = new dashboardController();
