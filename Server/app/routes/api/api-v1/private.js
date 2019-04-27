const express = require('express');
const router = express.Router();

const HomeController = require('app/http/controllers/api/v1/homeController');
const DashboardController = require('app/http/controllers/api/v1/dashboardController');
const profileValidator = require("app/http/validators/profileValidator");
const courseController = require('app/http/controllers/api/v1/admin/courseController');
const userController = require('app/http/controllers/api/v1/admin/userController');
const courseValidator = require('app/http/validators/courseValidator');
const userValidator = require('app/http/validators/userValidator');
const gate = require('app/helpers/gate');
const upload = require('app/helpers/uploadImage');
const convertFileToField = require('app/http/middleware/convertFileToField');

router.get('/user' , HomeController.user);
router.get('/user/history' , HomeController.history);
router.get('/dashboard', DashboardController.index);
router.put('/profile', upload.single("avatar"), convertFileToField.handle, profileValidator.handle(), DashboardController.updateProfile);

// Admin section

router.get('/admin/courses', /** gate.can('show-courses'), */courseController.index);
router.post('/admin/courses/create',
    upload.single('images'),
    convertFileToField.handle,
    courseValidator.handle(),
    courseController.store
);
router.post('/admin/courses/:id/edit',
    upload.single('images'),
    convertFileToField.handle,
    courseValidator.handleUpdate(),
    courseController.update
);
router.post('/admin/courses/:id/delete',
    courseController.destroy
);
router.get('/admin/users', /** gate.can('show-users'), */userController.index);
router.post('/admin/users/create',
    upload.single('avatar'),
    convertFileToField.handle,
    userValidator.handle(),
    userController.store
);
router.post('/admin/users/:id/edit',
    upload.single('avatar'),
    convertFileToField.handle,
    userValidator.handleUpdate(),
    userController.update
);
router.post('/admin/users/:id/delete',
    userController.destroy
);

module.exports = router;