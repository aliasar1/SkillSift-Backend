const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Recruiter = require('../models/recruiterModel');
const JobSeeker = require('../models/jobSeekerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require('../models/companyModel');

exports.login = asyncHandler(async (req, res) => {
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
        if(user.role == 'recruiter') {
            const recruiter = await Recruiter.findOne({ user_id : user._id });
            if(!recruiter){
                return res.status(401).json({ error: 'Recruiter not found.' });
            }
            res.status(201).json({ token, role: user.role, recruiter });
        }
        else{
            const jobseeker = await JobSeeker.findOne({ user_id : user._id });
            if(!jobseeker){
                return res.status(401).json({ error: 'JobSeeker not found.' });
            }
            res.status(201).json({ token, role: user.role, jobseeker });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

