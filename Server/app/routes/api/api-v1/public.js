const express = require('express');
const router = express.Router();

// Controllers
const CourseController = require('app/http/controllers/api/v1/courseController');
const HomeController = require('app/http/controllers/api/v1/homeController');
const AuthController = require('app/http/controllers/api/v1/authController');

//validator 
const loginValidator = require('app/http/validators/loginValidator');
const registerValidator = require('app/http/validators/registerValidator');

router.get('/home' , HomeController.index);
router.get('/courses' , CourseController.courses);
router.get('/courses/:course' , CourseController.singleCourse);
router.get('/courses/:course/comments' , CourseController.commentForSingleCourse);

router.post('/login' , loginValidator.handle() , AuthController.login);
router.post('/register' , registerValidator.handle() , AuthController.register);

module.exports = router;