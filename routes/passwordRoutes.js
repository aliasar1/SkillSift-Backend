const express = require('express');
const router = express.Router();
const { forgotPassword, resetPasswordController, verifyResetToken } = require('../controllers/passwordController');

router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPasswordController);
router.get('/verify/:token', verifyResetToken);

module.exports = router;
