const controller = require('app/http/controllers/api/controller');
const User = require('app/models/user');
const Payment = require('app/models/payment');
const fs = require('fs');

class userController extends controller {
  async index(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;
    let filter = {};
    if (req.query.filter) {
      filter = {
        $or: [
          { name: { $regex: req.query.filter, $options: 'i' } },
          { email: { $regex: req.query.filter, $options: 'i' } }
        ]
      };
    }
    const users = await User.paginate(filter, {
      page,
      sort: { createdAt: 1 },
      limit: parseInt(limit, 10)
    });
    const docs = [];
    const userIds = [];
    const userPayments = {};
    for (const user of users.docs) {
      userIds.push(user.id);
      userPayments[user.id] = {
        sum: 0,
        courses: []
      };
    }
    const payments = await Payment.find({
      user: { $in: userIds },
      payment: true
    }).populate('course');
    for (const payment of payments) {
      userPayments[payment.user].sum += payment.price;
      if (!payment.course) continue;
      for (const user of users.docs) {
        if (user.id == payment.user) {
          if (user.learning.indexOf(payment.course.id) !== -1) {
            userPayments[payment.user].courses.push({
              id: payment.course.id,
              title: payment.course.title,
              signupDate: payment.updatedAt
            });
          }
          break;
        }
      }
    }
    for (const user of users.docs) {
      docs.push(this.filterUserData(user, userPayments[user.id]));
    }
    res.json({
      ...users,
      docs: docs
    });
  }
  filterUserData(user, payments) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      vipTime: user.vipTime,
      vipFrom: user.vipFrom,
      createdAt: user.createdAt,
      amountspent: payments.sum
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      learning: payments.courses,
      xp: user.xp || 0,
      active: user.active
    };
  }
  async store(req, res) {
    if (!(await this.validationData(req, res))) return;
    let avatar = '';
    if (req.file) {
      avatar = this.getUrlImage(`${req.file.destination}/${req.file.filename}`);
    }
    const courses = [];
    let learning = [];
    if (req.body.courses) {
      learning = req.body.courses.map(course => {
        courses.push(course);
        return course.id;
      });
      delete req.body.courses;
    }
    let { name, email, password, xp, active} = req.body;

    const newUser = new User({
      name: name,
      email: email,
      password: password,
      xp: xp || 0,
      avatar: avatar || null,
      active: active,
      learning
    });
    await newUser.save();
    let payment;
    if (courses) {
      for (const course of courses) {
        payment = new Payment({
          user: newUser.id,
          course: course.id,
          resnumber: ' ',
          price: 0,
          payment: true
        });
        await payment.save(err => {
          if (err) {
            return this.failed(err, res, 500);
          }
        });
      }
    }
    return res.json({
      data: {
        user: this.filterUserData(newUser, {
          sum: 0,
          courses: courses.map(course => {
            return {
              id: course.id,
              title: course.title,
              signupDate: payment.updatedAt,
            };
          }),
        }),
      },
      status: 'success'
    });
  }
  async update(req, res, next) {
    if (!(await this.validationData(req, res))) return;
    let user = await User.findById(req.params.id);
    if (!user) {
      return this.failed('چنین کاربری وجود ندارد.', res, 404);
    }
    const objForUpdate = {};
    if (req.file) {
      objForUpdate.avatar = this.getUrlImage(
        `${req.file.destination}/${req.file.filename}`
      );
    }
    let courses = [];
    if (req.body.courses) {
      if (! user.learning) {
        user.learning = [];
      }
      const items = [];
      for (const course of req.body.courses) {
        if (user.learning.indexOf(course.id) === -1) {
          courses.push(course);
        }
        items.push(course.id);
      }
      objForUpdate.learning = items;
      delete req.body.courses;
    }
    delete req.body.file;
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body, ...objForUpdate }
      },
      {
        new: true
      }
    );
    if (courses) {
      for (const course of courses) {
        const payment = new Payment({
          user: user.id,
          course: course.id,
          resnumber: ' ',
          price: 0,
          payment: true
        });
        await payment.save(err => {
          if (err) {
            return this.failed(err, res, 500);
          }
        });
      }
    }
    const userPayments = {
      sum: 0,
      courses: []
    };
    const payments = await Payment.find({
      user: user.id,
      payment: true
    }).populate('course');
    for (const payment of payments) {
      userPayments.sum += payment.price;
      if (! payment.course) continue;
      userPayments.courses.push({
        id: payment.course.id,
        title: payment.course.title,
        signupDate: payment.updatedAt
      });
    }
    return res.json({
      data: {
        user: this.filterUserData(user, userPayments)
      },
      status: 'success'
    });
  }
  async destroy(req, res, next) {
    this.isMongoId(res, req.params.id);
    let user = await User.findById(req.params.id).exec();
    if (!user) {
      this.failed('چنین کاربری وجود ندارد', res, 404);
      return;
    }
    if (user.avatar) {
      // delete avatar
      fs.unlinkSync(`./public${user.avatar}`);
    }
    // delete user
    user.remove();
    return res.json({
      status: 'success'
    });
  }
  getUrlImage(dir) {
    return dir.substring(8);
  }
}

module.exports = new userController();
