const express = require('express');
const router = express.Router();
const { sendNotificationToRecruiter, sendNotificationToJobSeeker } = require('../controllers/notificationController');

router.post('/sendNotificationToRecruiter', sendNotificationToRecruiter);

router.post('/sendNotificationToJobSeeker', sendNotificationToJobSeeker);

module.exports = router;
