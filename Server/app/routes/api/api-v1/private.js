const express = require('express');
const router = express.Router();

const HomeController = require('app/http/controllers/api/v1/homeController');
const DashboardController = require('app/http/controllers/api/v1/dashboardController');
const profileValidator = require('app/http/validators/profileValidator');
const courseController = require('app/http/controllers/api/v1/courseController');
const adminCourseController = require('app/http/controllers/api/v1/admin/courseController');
const userController = require('app/http/controllers/api/v1/admin/userController');
const adminEpisodeController = require('app/http/controllers/api/v1/admin/episodeController');
const courseValidator = require('app/http/validators/courseValidator');
const userValidator = require('app/http/validators/userValidator');
const blogController = require('app/http/controllers/api/v1/admin/blogController');
const blogValidator = require('app/http/validators/blogValidator');
const episodeValidator = require('app/http/validators/episodeValidator');
const gate = require('app/helpers/gate');
const upload = require('app/helpers/uploadImage');
const convertFileToField = require('app/http/middleware/convertFileToField');

router.get('/user', HomeController.user);
router.get('/user/history', HomeController.history);
router.get('/dashboard', DashboardController.index);
router.get('/dashboard/logs', DashboardController.logs);
router.put(
  '/profile',
  upload.single('avatar'),
  convertFileToField.handle,
  profileValidator.handle(),
  DashboardController.updateProfile
);

router.get('/courses/purchased', courseController.PurchasedCourses);
router.get('/courses/:slug', courseController.singleCourse);
router.get('/courses/episode/:id', courseController.singleEpisode);
router.get('/courses/episode/download/:id', courseController.downloadEpisode);

router.post('/courses/:course/buy', courseController.buy);
router.post('/courses/payments/verification', courseController.verification);

// Admin section

router.get(
  '/admin/courses',
  /** gate.can('show-courses'), */ adminCourseController.index
);
router.post(
  '/admin/courses/create',
  upload.single('images'),
  convertFileToField.handle,
  courseValidator.handle(),
  adminCourseController.store
);
router.post(
  '/admin/courses/:id/edit',
  upload.single('images'),
  convertFileToField.handle,
  courseValidator.handleUpdate(),
  adminCourseController.update
);
router.post('/admin/courses/:id/delete', adminCourseController.destroy);
router.get('/admin/users', /** gate.can('show-users'), */ userController.index);
router.post(
  '/admin/users/create',
  upload.single('avatar'),
  convertFileToField.handle,
  userValidator.handle(),
  userController.store
);
router.post(
  '/admin/users/:id/edit',
  upload.single('avatar'),
  convertFileToField.handle,
  userValidator.handleUpdate(),
  userController.update
);
router.post('/admin/users/:id/delete', userController.destroy);
router.get('/admin/blog/posts', blogController.index);
router.post(
  '/admin/blog/posts/add',
  upload.single('image'),
  convertFileToField.handle,
  blogValidator.handle(),
  blogController.store
);
router.post(
  '/admin/blog/posts/:id/edit',
  upload.single('image'),
  convertFileToField.handle,
  blogValidator.handleUpdate(),
  blogController.update
);
router.post('/admin/blog/posts/:id/delete', blogController.destroy);
router.post(
  '/admin/blog/images/upload',
  upload.single('file'),
  convertFileToField.handle,
  blogController.upload
);

router.get(
  '/admin/episodes',
  /** gate.can('show-episodes'), */ adminEpisodeController.index
);
router.post(
  '/admin/courses/:course/insert/episode/number',
  adminCourseController.getInsertEpisodeNumber
);
router.post(
  '/admin/episodes/add',
  episodeValidator.handle(),
  adminEpisodeController.store
);
router.post(
  '/admin/episodes/:episode/edit',
  episodeValidator.handle(),
  adminEpisodeController.update
);
router.post('/admin/episodes/:episode/delete', adminEpisodeController.destroy);

module.exports = router;
