const express = require('express');
const router = express.Router();
const { sendNotification, registerToken, removeToken, getAllTokensOfUser } = require('../controllers/notificationsController');

router.post('/send', sendNotification);
router.post('/registerToken', registerToken);
router.post('/removeToken', removeToken);
router.get('/tokens/:userId', getAllTokensOfUser);

module.exports = router;
