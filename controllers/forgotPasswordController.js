const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mailer = require('../utils/mailer');

exports.forgotPassword = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        console.log('Reset Token:', resetToken);
        console.log('Email Content:', `To reset your password, click on the following link: ${process.env.CLIENT_URL}/reset/reset-password/${resetToken}`);

        await mailer(email, 'Password Reset', `To reset your password, click on the following link: ${process.env.CLIENT_URL}/reset/reset-password/${resetToken}`);

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});
