const express = require('express');
const router = express.Router();

const HomeController = require('app/http/controllers/api/v1/homeController');
const DashboardController = require('app/http/controllers/api/v1/dashboardController');
const AuthController = require('app/http/controllers/api/v1/authController');
const profileValidator = require('app/http/validators/profileValidator');
const courseController = require('app/http/controllers/api/v1/courseController');
const adminCourseController = require('app/http/controllers/api/v1/admin/courseController');
const userController = require('app/http/controllers/api/v1/admin/userController');
const adminEpisodeController = require('app/http/controllers/api/v1/admin/episodeController');
const courseValidator = require('app/http/validators/courseValidator');
const userValidator = require('app/http/validators/userValidator');
const blogController = require('app/http/controllers/api/v1/admin/blogController');
const blogValidator = require('app/http/validators/blogValidator');
const ticketValidator = require('app/http/validators/ticketValidator');
const episodeValidator = require('app/http/validators/episodeValidator');
const gate = require('app/helpers/gate');
const upload = require('app/helpers/uploadImage');
const fileUpload = require('app/helpers/uploadFile');
const convertFileToField = require('app/http/middleware/convertFileToField');
const redirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin');
const adminTicketController = require('app/http/controllers/api/v1/admin/ticketController');
const ticketController = require('app/http/controllers/api/v1/ticketController');

router.get('/user', HomeController.user);
router.get('/user/history', HomeController.history);
router.get('/dashboard', DashboardController.index);
router.get('/dashboard/logs', DashboardController.logs);
router.get('/dashboard/payments', DashboardController.payments);
router.get('/logout', AuthController.logout);
router.put(
  '/profile',
  upload.single('avatar'),
  convertFileToField.handle,
  profileValidator.handle(),
  DashboardController.updateProfile
);
router.post('/vip/payment', DashboardController.vipPayment);
router.post(
  '/vip/payment/verification',
  DashboardController.vipPaymentVerfication
);

router.post('/courses/:course/buy', courseController.buy);
router.post('/courses/payments/verification', courseController.verification);

router.post(
  '/course/episodes/:episode/mark-as-done',
  courseController.markAsDoneEpisode
);
router.post(
  '/course/episodes/:episode/mark-as-notdone',
  courseController.markAsNotDoneEpisode
);

router.get('/tickets', ticketController.search);

router.get('/tickets/view/:ticket', ticketController.singleTicket);

router.post(
  '/tickets/add',
  upload.single('file'),
  convertFileToField.handle,
  ticketController.store
);

router.post(
  '/tickets/reply',
  fileUpload.single('file'),
  convertFileToField.handle,
  ticketValidator.handleReply(),
  ticketController.reply
);

router.get('/tickets/view/:message/:filename', ticketController.downloadFile);

// Admin section

router.get(
  '/admin/courses',
  redirectIfNotAdmin.handle,
  /** gate.can('show-courses'), */
  adminCourseController.index
);
router.post(
  '/admin/courses/create',
  redirectIfNotAdmin.handle,
  upload.single('images'),
  convertFileToField.handle,
  courseValidator.handle(),
  adminCourseController.store
);
router.post(
  '/admin/courses/:id/edit',
  redirectIfNotAdmin.handle,
  upload.single('images'),
  convertFileToField.handle,
  courseValidator.handleUpdate(),
  adminCourseController.update
);
router.post(
  '/admin/courses/:id/delete',
  redirectIfNotAdmin.handle,
  adminCourseController.destroy
);
router.get(
  '/admin/users',
  redirectIfNotAdmin.handle,
  /** gate.can('show-users'), */
  userController.index
);
router.post(
  '/admin/users/create',
  redirectIfNotAdmin.handle,
  upload.single('avatar'),
  convertFileToField.handle,
  userValidator.handle(),
  userController.store
);
router.post(
  '/admin/users/:id/edit',
  redirectIfNotAdmin.handle,
  upload.single('avatar'),
  convertFileToField.handle,
  userValidator.handleUpdate(),
  userController.update
);
router.post(
  '/admin/users/:id/delete',
  redirectIfNotAdmin.handle,
  userController.destroy
);
router.get(
  '/admin/blog/posts',
  redirectIfNotAdmin.handle,
  blogController.index
);
router.post(
  '/admin/blog/posts/add',
  redirectIfNotAdmin.handle,
  upload.single('image'),
  convertFileToField.handle,
  blogValidator.handle(),
  blogController.store
);
router.post(
  '/admin/blog/posts/:id/edit',
  redirectIfNotAdmin.handle,
  upload.single('image'),
  convertFileToField.handle,
  blogValidator.handleUpdate(),
  blogController.update
);
router.post(
  '/admin/blog/posts/:id/delete',
  redirectIfNotAdmin.handle,
  blogController.destroy
);
router.post(
  '/admin/blog/images/upload',
  redirectIfNotAdmin.handle,
  upload.single('file'),
  convertFileToField.handle,
  blogController.upload
);

router.get(
  '/admin/episodes',
  redirectIfNotAdmin.handle,
  /** gate.can('show-episodes'), */
  adminEpisodeController.index
);
router.post(
  '/admin/courses/:course/insert/episode/number',
  redirectIfNotAdmin.handle,
  adminCourseController.getInsertEpisodeNumber
);
router.post(
  '/admin/episodes/add',
  redirectIfNotAdmin.handle,
  episodeValidator.handle(),
  adminEpisodeController.store
);
router.post(
  '/admin/episodes/:episode/edit',
  redirectIfNotAdmin.handle,
  episodeValidator.handle(),
  adminEpisodeController.update
);
router.post(
  '/admin/episodes/:episode/delete',
  redirectIfNotAdmin.handle,
  adminEpisodeController.destroy
);
router.get(
  '/admin/tickets',
  redirectIfNotAdmin.handle,
  adminTicketController.search
);
router.post(
  '/admin/tickets/add',
  redirectIfNotAdmin.handle,
  fileUpload.single('file'),
  convertFileToField.handle,
  ticketValidator.handle(),
  adminTicketController.store
);
router.post(
  '/admin/tickets/:ticket/highlight',
  redirectIfNotAdmin.handle,
  adminTicketController.toggleHighLight
);
router.post(
  '/admin/tickets/:ticket/delete',
  redirectIfNotAdmin.handle,
  adminTicketController.destroy
);
router.post(
  '/admin/tickets/:ticket/edit',
  redirectIfNotAdmin.handle,
  adminTicketController.update
);
router.post(
  '/admin/tickets/messages/:message/delete',
  redirectIfNotAdmin.handle,
  adminTicketController.destroyMessage
);
router.post(
  '/admin/tickets/messages/:message/edit',
  redirectIfNotAdmin.handle,
  adminTicketController.editMessage
);

module.exports = router;