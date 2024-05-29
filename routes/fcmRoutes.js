const express = require('express');
const router = express.Router();
const fcmController = require('../controllers/fcmController'); 

router.post('/', fcmController.createFcmToken);

router.get('/', fcmController.getAllFcmTokens);

router.get('/:id', fcmController.getFcmTokenById);

router.put('/:id', fcmController.updateFcmTokenById);

router.delete('/:id', fcmController.deleteFcmTokenById);

module.exports = router;
