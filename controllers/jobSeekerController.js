const asyncHandler = require('express-async-handler');
const JobSeeker = require('../models/jobSeekerModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerJobSeeker = asyncHandler(async (req, res) => {
    const { fullname, contact_no, email, password } = req.body;
    try {
        if (!fullname || !contact_no || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const jobSeekerExist = await JobSeeker.findOne({ email });
        if (jobSeekerExist) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPass, role: "jobseeker" });

        const jobSeeker = await JobSeeker.create({ user_id: user._id, fullname, contact_no, email, profilePicUrl: '' });

        res.status(201).json({ _id: jobSeeker._id, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "JobSeeker data not valid" });
    }
});

const getTotalJobSeekers = asyncHandler(async (req, res) => {
    try {
        const totalJobSeekers = await JobSeeker.countDocuments();
        res.status(200).json({ totalJobSeekers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const loginJobSeeker = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "All fields are required" });
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
        res.status  (401).json({ error: "Email or password is not valid" });
    }
});

const getCurrentJobseeker = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
;
        const jobseeker = await JobSeeker.findById(id);

        if (!jobseeker) {
            return res.status(404).json({ error: 'Jobseeker not found' });
        }

        res.status(200).json(jobseeker);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = { registerJobSeeker, loginJobSeeker, getCurrentJobseeker, getTotalJobSeekers };
