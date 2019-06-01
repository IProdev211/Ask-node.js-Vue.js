const express = require('express');
const router = express.Router();

// Controllers
const CourseController = require('app/http/controllers/api/v1/courseController');
const HomeController = require('app/http/controllers/api/v1/homeController');
const AuthController = require('app/http/controllers/api/v1/authController');
const BlogController = require('app/http/controllers/api/v1/blogController');

//validator
const loginValidator = require('app/http/validators/loginValidator');
const registerValidator = require('app/http/validators/registerValidator');
const forgotPasswordValidator = require('app/http/validators/forgotPasswordValidator');
const resetPasswordValidator = require('app/http/validators/resetPasswordValidator');
const courseController = require('app/http/controllers/api/v1/courseController');


router.get('/home', HomeController.index);
router.get('/courses', CourseController.courses);

router.post('/login', loginValidator.handle(), AuthController.login);
router.post('/register', registerValidator.handle(), AuthController.register);

router.post('/password/email', forgotPasswordValidator.handle(), AuthController.sendPasswordResetLink);
router.post('/password/reset/:token', resetPasswordValidator.handle(), AuthController.resetPasswordProccess);

router.get('/blog/:slug', BlogController.bySlug);

router.get('/courses/:slug', courseController.singleCourse);
router.get('/courses/:slug/unit-:unit', courseController.singleEpisode);

module.exports = router;
