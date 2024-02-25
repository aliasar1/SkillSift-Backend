const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const mailer = require('../utils/mailer');

const resetPassword = async (token, newPassword) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new Error('Invalid or expired token');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
    } catch (error) {
        throw new Error('Password reset failed');
    }
};

exports.resetPasswordController = asyncHandler(async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        await resetPassword(token, newPassword);

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

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

        await mailer(email, 'Password Reset', `Your OTP is: ${resetToken}`);

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

exports.verifyResetToken = asyncHandler(async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new Error('Invalid or expired token');
        }

        res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

