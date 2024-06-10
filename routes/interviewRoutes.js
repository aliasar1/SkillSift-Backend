const express = require('express');
const router = express.Router();
const interviewScheduleController = require('../controllers/interviewController');

router.post('/schedule', interviewScheduleController.scheduleInterview);
router.post('/sendEmail', interviewScheduleController.sendInterviewEmail);
router.post('/check', interviewScheduleController.checkInterviewExists);

module.exports = router;
