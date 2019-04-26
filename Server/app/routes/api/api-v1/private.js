const express = require('express');
const router = express.Router();

const HomeController = require('app/http/controllers/api/v1/homeController');
const DashboardController = require('app/http/controllers/api/v1/dashboardController');
const profileValidator = require("app/http/validators/profileValidator");
const courseController = require('app/http/controllers/api/v1/admin/courseController');
const courseValidator = require('app/http/validators/courseValidator');
const gate = require('app/helpers/gate');
const upload = require('app/helpers/uploadImage');
const convertFileToField = require('app/http/middleware/convertFileToField');

router.get('/user' , HomeController.user);
router.get('/user/history' , HomeController.history);
router.get('/dashboard', DashboardController.index);
router.get('/admin/courses', /** gate.can('show-courses'), */courseController.index);
router.put('/profile', upload.single("avatar"), convertFileToField.handle, profileValidator.handle(), DashboardController.updateProfile);

// Admin section

router.post('/courses/create',
    upload.single('images'),
    convertFileToField.handle,
    courseValidator.handle(),
    courseController.store
);
router.post('/courses/:id/edit',
    upload.single('images'),
    convertFileToField.handle,
    courseValidator.handleUpdate(),
    courseController.update
);

module.exports = router;