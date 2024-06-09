const asyncHandler = require('express-async-handler');
const Recruiter = require('../models/recruiterModel');
const Company = require('../models/companyModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerRecruiter = asyncHandler(async (req, res) => {
    const { fullname, contact_no, email,  password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({  email, password: hashedPass, role: "recruiter" });

        const recruiter = await Recruiter.create({ user_id: user._id, fullname, contact_no, email, company_id: null });

        res.status(201).json(recruiter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

exports.loginRecruiter = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

exports.getCurrentRecruiter = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
;
        const recruiter = await Recruiter.findById(id);

        if (!recruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        res.status(200).json(recruiter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

exports.getCurrentRecruiterCompany = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
;
        const recruiter = await Recruiter.findById(id).populate('company_id');

        if (!recruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        res.status(200).json(recruiter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

exports.getTotalRecruiter = asyncHandler(async (req, res) => {
    try {
        const totalRecruiter = await Recruiter.countDocuments();
        res.status(200).json({ totalRecruiter });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});