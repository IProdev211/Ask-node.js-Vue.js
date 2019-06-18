const controller = require('app/http/controllers/api/controller');
const Payment = require('app/models/payment');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const CourseController = require('./courseController');
const Post = require('app/models/blogPost');
const blogController = require('./blogController');

class homeController extends controller {
  async index(req, res) {
    const topCourses = Course.find()
      .populate('user', 'id name')
      .populate('categories', 'name slug')
      .populate('episodesCount')
      .limit(4)
      .sort({
        viewCount: 'desc'
      })
      .exec();
    const user = req.user
      ? req.user
          .populate({
            path: 'roles',
            select: 'name label permissions',
            populate: [
              {
                path: 'permissions'
              }
            ]
          })
          .execPopulate()
      : undefined;
    const topBlogPosts = Post.find()
      .limit(8)
      .sort({ viewCount: 'desc' })
      .populate([
        {
          path: 'author',
          select: 'id name'
        },
        {
          path: 'tags',
          select: 'name slug'
        },
        {
          path: 'categories',
          select: 'name slug'
        }
      ])
      .exec();
    const results = await Promise.all([
      topCourses,
      user,
      topBlogPosts,
      Episode.find({}, 'time').exec(),
      Course.estimatedDocumentCount()
    ]);
    let seconds = 0;
    for (const episode of results[3]) {
      seconds += this.timeToSeconds(episode.time);
    }
    return res.json({
      status: 'success',
      topCourses: results[0].map(CourseController.filterCourse),
      user: results[1] ? this.filterUserData(results[1]) : undefined,
      topPosts: results[2].map(blogController.filterData),
      seconds,
      courses: results[4],
      episodes: results[3].length
    });
  }
  async user(req, res) {
    let user = await req.user
      .populate({
        path: 'roles',
        select: 'name label permissions',
        populate: [
          {
            path: 'permissions'
          }
        ]
      })
      .execPopulate();

    return res.json({
      data: this.filterUserData(user),
      status: 'success'
    });
  }

  async history(req, res) {
    try {
      let page = req.query.page || 1;
      let payments = await Payment.paginate(
        {
          user: req.user.id
        },
        {
          page,
          sort: {
            createdAt: -1
          },
          limit: 20,
          populate: [
            {
              path: 'course'
            },
            {
              path: 'user',
              select: 'name email'
            }
          ]
        }
      );

      res.json({
        data: this.filterPaymentData(payments),
        status: 'success'
      });
    } catch (err) {
      this.failed(err.message, res);
    }
  }

  filterPaymentData(payments) {
    return {
      ...payments,
      docs: payments.docs.map(pay => {
        return {
          payment: pay.payment,
          resnumber: pay.resnumber,
          price: pay.price,
          user: {
            name: pay.user.name,
            email: pay.user.email
          }
        };
      })
    };
  }

  filterUserData(user) {
    return {
      id: user.id,
      active: user.active,
      admin: user.admin,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      vipTime: user.vipTime,
      vipType: user.vipType,
      lang: user.lang,
      avatar: user.avatar,
      roles: user.roles
        ? user.roles.map(role => {
            return {
              name: role.name,
              label: role.label,
              permissions: role.permissions.map(per => {
                return {
                  name: per.name,
                  label: per.label
                };
              })
            };
          })
        : undefined
    };
  }
}

module.exports = new homeController();
