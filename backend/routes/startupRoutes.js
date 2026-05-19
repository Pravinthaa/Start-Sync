const express = require('express');
const { createStartup, getStartups, getStartupById } = require('../controllers/startupController');
const { protect, restrictTo } = require('../middlewares/auth');
const router = express.Router();

router.route('/')
  .post(protect, restrictTo('Founder', 'Admin'), createStartup)
  .get(getStartups);

router.route('/:id').get(getStartupById);

module.exports = router;
