const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');
const Episode = require('app/models/episode');
const Comment = require('app/models/comment');
const striptags = require('striptags');

class homeController extends controller {
  async index(req, res) {
    let courses = await Course.find({
        lang: req.getLocale()
      })
      .sort({
        createdAt: 1
      })
      .limit(8)
      .exec();
    res.render('home/index', {
      courses
    });
  }

  async about(req, res) {
    res.render('home/about');
  }

  async comment(req, res, next) {
    try {
      let status = await this.validationData(req);
      if (!status) return this.back(req, res);

      let newComment = new Comment({
        user: req.user.id,
        ...req.body
      });

      await newComment.save();

      return this.back(req, res);
    } catch (err) {
      next(err);
    }
  }

  async feedCourses(req, res, next) {
    try {
      let courses = await Course.find({})
        .populate('user')
        .sort({
          createdAt: -1
        })
        .exec();
      courses.forEach(course => {
        feed.item({
          title: course.title,
          description: striptags(course.body.substr(0, 100)),
          date: course.createdAt,
          url: course.path(),
          author: course.user.name
        });
      });

      res.header('Content-type', 'application/xml');
      res.send(feed.xml());
    } catch (err) {
      next(err);
    }
  }

  async feedEpisodes(req, res, next) {
    try {
      let episodes = await Episode.find({})
        .populate({
          path: 'course',
          populate: 'user'
        })
        .sort({
          createdAt: -1
        })
        .exec();
      episodes.forEach(episode => {
        feed.item({
          title: episode.title,
          description: striptags(episode.body.substr(0, 100)),
          date: episode.createdAt,
          url: episode.path(),
          author: episode.course.user.name
        });
      });

      res.header('Content-type', 'application/xml');
      res.send(feed.xml());
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new homeController();