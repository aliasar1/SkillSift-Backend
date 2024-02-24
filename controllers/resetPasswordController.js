const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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
