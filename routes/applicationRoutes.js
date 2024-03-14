const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getAllApplications);
router.get('/:id', applicationController.findApplicationById);
router.get('/job/:jobId', applicationController.findApplicationsByJobId);
router.post('/', applicationController.apply);
router.put('/update-url/:id', applicationController.updateApplicationUrl);

module.exports = router;
