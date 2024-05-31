const express = require('express');
const router = express.Router();
const { sendNotification, registerToken, removeToken } = require('../controllers/notificationsController');

router.post('/send', sendNotification);
router.post('/registerToken', registerToken);
router.post('/removeToken', removeToken);

module.exports = router;
