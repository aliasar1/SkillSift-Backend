const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getAllApplications);
router.get('/total', applicationController.getTotalApplications);
router.get('/jobseeker/:id', applicationController.getApplicationsByJobSeeker);
router.get('/job/application-count/:id', applicationController.getTotalApplicationsOfJob);
router.get('/status/:id', applicationController.getApplicationStatus);
router.get('/:id', applicationController.findApplicationById);
router.get('/job/:jobId', applicationController.findApplicationsByJobId);
router.get('/sort', applicationController.findApplicationsSorted);
router.get('/max-level/:jobId', applicationController.findTheMaxLevel);
router.post('/', applicationController.apply);
router.put('/update-url/:id', applicationController.updateApplicationUrl);
router.put('/update-status', applicationController.updateApplicationStatusAndLevel);

module.exports = router;
