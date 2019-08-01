const controller = require('app/http/controllers/api/controller');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const Comment = require('app/models/comment');
const request = require('request');
const ZarinpalCheckout = require('zarinpal-checkout');
const Payment = require('app/models/payment');
const DoneEpisode = require('app/models/doneEpisode');
const User = require('app/models/user');
const Log = require('app/models/log');

class courseController extends controller {
  async courses(req, res, next) {
    try {
      const page = req.query.page || 1;
      const promises = [];
      promises.push(
        Course.paginate(
          {},
          {
            page,
            sort: {
              createdAt: 1
            },
            limit: 4,
            populate: [
              { path: 'categories' },
              { path: 'user' },
              { path: 'episodesCount' }
            ]
          }
        )
      );
      promises.push(Episode.find({}, 'time').exec());
      const results = await Promise.all(promises);
      const courses = results[0];
      const episodes = results[1];
      let seconds = 0;
      for (const episode of episodes) {
        seconds += this.timeToSeconds(episode.time);
      }
      const data = {
        ...courses,
        docs: courses.docs.map(this.filterCourse),
        episodes: episodes.length,
        seconds
      };
      res.json(data);
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  filterCourse(course) {
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      body: course.body,
      thumb: course.thumb,
      type: course.type,
      categories: course.categories.map(cate => {
        return {
          name: cate.name,
          slug: cate.slug
        };
      }),
      user: {
        id: course.user.id,
        name: course.user.name
      },
      price: course.price,
      oldPrice: course.oldPrice,
      createdAt: course.createdAt,
      time: course.time,
      tags: course.tags || "",
      episodes: course.episodesCount
    };
  }

  async singleCourse(req, res) {
    try {
      const course = await Course.findOneAndUpdate(
        { slug: req.params.slug },
        {
          $inc: { viewCount: 1 }
        }
      ).populate([
        {
          path: 'user',
          select: 'name'
        },
        {
          path: 'episodes',
          options: { sort: { number: 1 } }
        },
        {
          path: 'categories',
          select: 'name slug'
        },
        {
          path: 'usersCount'
        }
      ]);
      if (!course) return this.failed('چنین دوره ای یافت نشد', res, 404);
      const user = req.user ? await User.findById(req.user.id) : undefined;
      res.json({
        data: {
          course: await this.filterCourseData(course, user, true),
          enrolled: user && (user.admin || user.checkLearning(course.id)),
          enrolledCount: course.usersCount
        },
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  async filterCourseData(course, user, videoURL = false) {
    const episodes = [];
    for (const episode of course.episodes) {
      episodes.push(await this.filterEpisodeData(episode, user));
    }
    const data = {
      id: course.id,
      title: course.title,
      slug: course.slug,
      body: course.body,
      image: course.thumb,
      type: course.type,
      time: course.time,
      categories: course.categories.map(cate => {
        return {
          name: cate.name,
          slug: cate.slug
        };
      }),
      user: {
        id: course.user.id,
        name: course.user.name
      },
      episodes: episodes,
      price: course.price,
      oldPrice: course.oldPrice,
      createdAt: course.createdAt,
    };
    if (videoURL) {
      data.download = course.download(!!user, user);
    }
    if (user) {
      data.done = await this.getCourseDonePercentage(course, user);
    }
    return data;
  }
  async filterEpisodeData(episode, user) {
    return {
      time: episode.time,
      downloadCount: episode.downloadCount,
      viewCount: episode.viewCount,
      commentCount: episode.commentCount,
      id: episode.id,
      title: episode.title,
      body: episode.body,
      type: episode.type,
      number: episode.number,
      createdAt: episode.createdAt,
      download: episode.download(!!user, user),
      done: await this.hasDoneEpisode(episode, user),
    };
  }
  async singleEpisode(req, res) {
    try {
      const course = await Course.findOne({ slug: req.params.slug }).populate([
        {
          path: 'user',
          select: 'name'
        },
        {
          path: 'episodes',
          options: { sort: { number: 1 } }
        },
        {
          path: 'categories',
          select: 'name slug'
        },
        {
          path: 'usersCount'
        }
      ]);
      let episode = undefined;
      for (let x = 0; x < course.episodes.length; x++) {
        if (course.episodes[x].number == req.params.unit) {
          episode = course.episodes[x];
          break;
        }
      }
      if (!episode) return this.failed('چنین درسی یافت نشد', res, 404);
      episode.updateOne({
        $inc: { viewCount: 1 }
      });
      const user = req.user ? await User.findById(req.user.id) : undefined;
      res.json({
        data: {
          episode: await this.filterEpisodeData(episode, user),
          course: await this.filterCourseData(course, user),
          enrolled:
            user && (user.admin || user.checkLearning(episode.course.id)),
          enrolledCount: episode.course.usersCount
        },
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }
  async downloadCourse(req, res) {
    const mac = req.query.mac;
    const t = req.query.t;
    if (!mac || !t || new Date() >= t) {
      return this.failed('چنین دوره ای یافت نشد', res, 404);
    }
    const course = await Course.findById(req.params.id);
    if (!course || ! course.id || !course.validateDownload(mac, t)) {
      return this.failed('چنین دوره ای یافت نشد', res, 404);
    }
    const reqo = request(course.videoUrl);
    req.pipe(reqo);
    reqo.pipe(res);
  }
  async downloadEpisode(req, res) {
    const mac = req.query.mac;
    const t = req.query.t;
    if (!mac || !t || new Date() >= t) {
      return this.failed('چنین درسی یافت نشد', res, 404);
    }
    let episode;

    if (req.user) {
      episode = await Episode.findById(req.params.id)
    } else {
      episode = await Episode.find({type: 'free', id: req.params.id}).exec();
    }
    if (! episode || ! episode.id || !episode.validateDownload(mac, t)) {
      return this.failed('چنین درسی یافت نشد', res, 404);
    }
    const reqo = request(episode.videoUrl);
    req.pipe(reqo);
    reqo.pipe(res);
  }
  async commentForSingleCourse(req, res) {
    try {
      let comments = await Comment.find({
        course: req.params.course,
        parent: null,
        approved: true
      }).populate([
        {
          path: 'user',
          select: 'name'
        },
        {
          path: 'comments',
          match: {
            approved: true
          },
          populate: { path: 'user', select: 'name' }
        }
      ]);
      return res.json(comments);
    } catch (err) {
      this.failed(err.message, res);
    }
  }
  async buy(req, res) {
    const course = await Course.findById(req.params.course);
    if (!course) {
      return this.failed('چنین دوره ای یافت نشد !', res, 404);
    }
    if (course.price == 0 || (course.type == 'vip' || course.type == 'free')) {
      return this.failed(
        'این دوره مخصوص اعضای ویژه یا رایگان است و قابل خریداری نیست .',
        res,
        403
      );
    }
    if (await req.user.checkLearning(course)) {
      return this.failed('شما قبلا در این دوره ثبت نام کرده اید .', res, 403);
    }
    const zarinpal = ZarinpalCheckout.create(
      config.service.zarinpal.merchant_id,
      true
    );
    const price = parseInt(course.price.replace(/,/g, ''), 10);
    const timeout = setTimeout(() => {
      this.failed(
        'ارتباط با سامانه برقرار نشد. لطفا از اتصال اینترنت خود اطمینان کسب و سپس امتحان کنید.',
        res,
        408
      );
    }, 10000);
    zarinpal
      .PaymentRequest({
        Amount: price,
        CallbackURL: `${config.siteurl}/courses/payments/verification`,
        Description: 'خرید دوره ' + course.title
      })
      .then(response => {
        if (timeout) {
          clearTimeout(timeout);
        }
        if (response.status === 100) {
          const payment = new Payment({
            user: req.user.id,
            course: course.id,
            resnumber: response.authority,
            price: price
          });
          payment.save(err => {
            if (err) {
              return this.failed(err, res, 500);
            }
            return res.json({
              redirect: response.url,
              status: 'success'
            });
          });
        }
      })
      .catch(err => {
        if (timeout) {
          clearTimeout(timeout);
        }
        return this.failed(err.errors, res, 500);
      });
  }
  async verification(req, res) {
    if (!req.body.hasOwnProperty('status') || req.body.status !== 'OK') {
      return this.failed('پرداخت شما با موفقیت انجام نشد', res, 500);
    }
    const payment = await Payment.findOne({
      resnumber: req.body.authority
    })
      .populate([{ path: 'course' }, { path: 'user' }])
      .exec();

    if (!payment.course) {
      return this.failed('دوره ای که شما پرداخت کرده اید وجود ندارد', res, 500);
    }
    const timeout = setTimeout(() => {
      this.failed(
        'ارتباط با سامانه برقرار نشد. لطفا از اتصال اینترنت خود اطمینان کسب و سپس امتحان کنید.',
        res,
        408
      );
    }, 30000);
    const zarinpal = ZarinpalCheckout.create(
      config.service.zarinpal.merchant_id,
      true
    );
    zarinpal
      .PaymentVerification({
        Amount: payment.price,
        Authority: payment.resnumber,
        timeout: 30000
      })
      .then(response => {
        if (timeout) {
          clearTimeout(timeout);
        }
        if (response.status === 100) {
          payment.user.learning.push(payment.course.id);
          payment.user.save();
          payment.payment = true;
          payment.save();
          const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
          const buyCourseLog = new Log({
            ip: ip,
            user: payment.user.id,
            type: 'buy_course',
            title: ` با تشکر از حسن انتخاب شما, خرید دوره ${
              payment.course.title
            } با موفقیت انجام شد و هم اکنون می توانید بصورت کامل از این دوره استفاده کنید. `
          });
          buyCourseLog.save();
          return res.json({
            course: {
              id: payment.course.id,
              slug: payment.course.slug
            },
            message: 'پرداخت شما با موفقیت انجام شد',
            status: true
          });
        } else {
          return this.failed('پرداخت شما با موفقیت انجام نشد', res, 500);
        }
      })
      .catch(err => {
        if (timeout) {
          clearTimeout(timeout);
        }
        return this.failed(err.errors, res, 500);
      });
  }
  async PurchasedCourses(req, res) {
    const page = req.query.page || 1;
    // Update User data
    const user = await User.findById(req.user.id);
    const courses = await Course.paginate(
      {
        _id: { $in: user.learning }
      },
      {
        page,
        sort: {
          createdAt: 1
        },
        limit: 24,
        populate: [
          { path: 'categories' },
          { path: 'user' },
          { path: 'episodesCount' }
        ]
      }
    );
    res.json({
      ...courses,
      docs: courses.docs.map(this.filterCourse)
    });
  }
  async getCourseDonePercentage(course, user) {
    const items = [];
    for (const item of course.episodes) {
      items.push(item.id);
    }
    if (! items.length) {
      return 0;
    }
    const donedEpisodes = await DoneEpisode.countDocuments({
      user: user.id,
      episode: { $in: items },
    }).exec();
    return (donedEpisodes * 100 / items.length).toFixed(2);
  }
  async markAsDoneEpisode(req, res) {
    if (! req.user.id) {
      return this.failed('پیدا نشد!', res, 404);
    }
    const episode = await Episode.findById(req.params.episode).populate({
      path: "course",
      populate: [
        {
          path: 'episodes',
          options: { sort: { number: 1 } }
        },
      ],
    });
    if (! episode || (! req.user.learning.indexOf(episode.course.id) !== -1 && ! req.user.admin)) {
      return this.failed('چنین دوره ای یافت نشد !', res, 404);
    }
    const has = await this.hasDoneEpisode(episode, req.id);
    if (! has) {
      const model = new DoneEpisode({
        user: req.user.id,
        episode: episode.id,
      });
      await model.save();
    }
    const done = await this.getCourseDonePercentage(episode.course, req.user);
    return res.json({
      done: done,
      status: "success",
    });
  }
  async markAsNotDoneEpisode(req, res) {
    if (! req.user.id) {
      return this.failed('پیدا نشد!', res, 404);
    }
    const episode = await Episode.findById(req.params.episode).populate({
      path: "course",
      populate: [
        {
          path: 'episodes',
          options: { sort: { number: 1 } }
        },
      ],
    });
    if (! episode || (! req.user.learning.indexOf(episode.course.id) !== -1 && ! req.user.admin)) {
      return this.failed('چنین دوره ای یافت نشد !', res, 404);
    }
    const has = await this.hasDoneEpisode(episode, req.user);
    if (has) {
      await DoneEpisode.deleteOne({
        user: req.user.id,
        episode: episode.id,
      });
    }
    const done = await this.getCourseDonePercentage(episode.course, req.user);
    return res.json({
      done: done,
      status: "success",
    });
  }
  async hasDoneEpisode(episode, user) {
    if (! user) {
      return false;
    }
    const has = await DoneEpisode.findOne({
      user: user.id,
      episode: episode.id,
    }).exec();
    return !!has;
  }
}

module.exports = new courseController();
