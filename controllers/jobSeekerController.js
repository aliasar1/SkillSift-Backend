const asyncHandler = require('express-async-handler');
const JobSeeker = require('../models/jobSeekerModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerJobSeeker = asyncHandler(async (req, res) => {
    const { fullname, contact_no, email, password } = req.body;
    try {
        if (!fullname || !contact_no || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const jobSeekerExist = await JobSeeker.findOne({ email });
        if (jobSeekerExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPass, role: "jobseeker" });

        const jobSeeker = await JobSeeker.create({ user_id: user._id, fullname, contact_no, email });

        res.status(201).json({ _id: jobSeeker._id, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "JobSeeker data not valid" });
    }
});


const loginJobSeeker = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const jobSeeker = await JobSeeker.findOne({ email });
        const accessToken = jwt.sign({
            jobSeeker: {
                fullname: jobSeeker.fullname,
                email: user.email,
                id: jobSeeker.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

        res.status(200).json({ accessToken });
    } else {
        res.status  (401).json({ message: "Email or password is not valid" });
    }
});

const currentJobSeeker = asyncHandler(async (req, res) => {
    res.json(req.jobSeeker);
});

module.exports = { registerJobSeeker, loginJobSeeker, currentJobSeeker };
