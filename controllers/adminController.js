const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAdmin = asyncHandler(async (req, res) => {
    const { fullname, contact, email, password } = req.body;
    try {
        if (!fullname || !contact || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const adminExist = await Admin.findOne({ email });
        if (adminExist) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({  email, password: hashedPass, role: "admin" });

        const admin = await Admin.create({ user_id: user._id, fullname, contact, email });

        res.status(201).json({ _id: admin._id, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Admin data not valid" });
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const admin = Admin.findOne({ email });
        const accessToken = jwt.sign({
            admin: {
                fullname: admin.fullname,
                email: user.email,
                id: admin.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ error: "Email or password is not valid" });
    }
});

const currentAdmin = asyncHandler(async (req, res) => {
    res.json(req.admin);
});

module.exports = { registerAdmin, loginAdmin, currentAdmin };
