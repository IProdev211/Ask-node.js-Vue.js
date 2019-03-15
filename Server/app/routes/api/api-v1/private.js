const express = require('express');
const router = express.Router();

const HomeController = require('app/http/controllers/api/v1/homeController');
const DashboardController = require('app/http/controllers/api/v1/dashboardController');
const profileValidator = require("app/http/validators/profileValidator");
const upload = require('app/helpers/uploadImage');
const convertFileToField = require('app/http/middleware/convertFileToField');

router.get('/user' , HomeController.user);
router.get('/user/history' , HomeController.history);
router.get('/dashboard', DashboardController.index);
router.put('/profile', upload.single("avatar"), convertFileToField.handle, profileValidator.handle(), DashboardController.updateProfile);

module.exports = router;