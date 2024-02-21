const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAdmin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("Email address already registered");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: username,
        email: email,
        password: hashedPass,
        role: 'admin'  
    });

    const admin = await Admin.create({
        user_id: user._id,  
        fullname: req.body.fullname,
        contact: req.body.contact
    });

    if (admin) {
        res.status(201).json({ _id: admin._id, email: admin.user_id.email });
    } else {
        res.status(400);
        throw new Error("Admin data not valid");
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const admin = await Admin.findOne({ user_id: user._id });
        if (!admin) {
            res.status(401);
            throw new Error("Admin data not found");
        }

        const accessToken = jwt.sign({
            admin: {
                username: user.username,
                email: user.email,
                id: user._id,
                fullname: admin.fullname,
                contact: admin.contact,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "365d" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid.");
    }
});


const currentAdmin = asyncHandler(async (req, res) => {
    res.json(req.admin);
});

module.exports = { registerAdmin, loginAdmin, currentAdmin };
