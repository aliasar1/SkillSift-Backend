const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

exports.modifyUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (user.role == 'jobseeker') {

        }
        else if (user.role == 'recruiter') {

        }
        else {
            const { fullname, contact } = req.body;
            const admin = Admin.findOne({ email: user.email });
            if (!admin) {
                res.status(404).json({ error: 'Admin not found' });
                return;
            }
            admin.fullname = fullname;
            admin.contact = contact;

            await admin.save();
            res.json(admin);
        }


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.role == 'jobseeker') {

        }
        else if (user.role == 'recruiter') {

        }
        else {
            const admin = Admin.findOne({ email: user.email });
            if (!admin) {
                res.status(404).json({ error: 'Admin not found' });
                return;
            }

            await user.remove();
            await admin.remove();
            res.status(201).json({ message: 'Admin deleted successfully' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

exports.addUser = asyncHandler(async (req, res) => {
    const { username, email, password, role, fullname, contact } = req.body;
    try {
        if (role == 'jobseeker') {

        }
        else if (role == 'recruiter') {

        }
        else {
            const newUser = await User.create({ username, email, password, role });
            const newAdmin = await Admin.create({ user_id: newUser._id, fullname, contact })
            res.status(201).json(newAdmin);
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

exports.getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (currentUser.role == 'jobseeker') {

        }
        else if (currentUser.role == 'recruiter') {

        }
        else {
            const admin = await Admin.find({ email: currentUser.email });
            res.status(201).json(admin);
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

exports.modifyUserStatus = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const { status } = req.body;
        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

exports.getUserStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ status: user.status });
    } catch (err) {
        console.error('Error getting user status:', err);
        res.status(500).json({ error: 'Server error' });
    }
};