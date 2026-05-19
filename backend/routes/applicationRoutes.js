const express = require('express');
const { applyToStartup, getMyApplications, getStartupApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, restrictTo('Collaborator'), applyToStartup);
router.get('/my-applications', protect, restrictTo('Collaborator'), getMyApplications);
router.get('/startup-applications', protect, restrictTo('Founder'), getStartupApplications);
router.put('/:id/status', protect, restrictTo('Founder'), updateApplicationStatus);

module.exports = router;
