const express = require('express');
const router = express.Router();
const courseController = require('app/http/controllers/api/v1/courseController');

const forEveryOne = require('./public');
const forUser = require('./private');

const authenticateApi = require('app/http/middleware/authenticateApi');

router.get(
  '/courses/purchased',
  authenticateApi.handle,
  courseController.PurchasedCourses
);
router.use(forEveryOne);
router.use(authenticateApi.handle, forUser);

module.exports = router;