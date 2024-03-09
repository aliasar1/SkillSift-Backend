const express = require('express');
const router = express.Router();
const { forgotPassword, resetPasswordController, verifyResetToken, updatePassword } = require('../controllers/passwordController');

router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPasswordController);
router.get('/verify/:token', verifyResetToken);
router.put('/update/:userId', updatePassword);

module.exports = router;
