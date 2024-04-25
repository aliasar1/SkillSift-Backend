const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getAllApplications);
router.get('/jobseeker/:id', applicationController.getApplicationsByJobSeeker);
router.get('/job/application-count/:id', applicationController.getTotalApplicationsOfJob);
router.get('/status/:id', applicationController.getApplicationStatus);
router.get('/:id', applicationController.findApplicationById);
router.get('/job/:jobId', applicationController.findApplicationsByJobId);
router.post('/', applicationController.apply);
router.put('/update-url/:id', applicationController.updateApplicationUrl);

module.exports = router;
