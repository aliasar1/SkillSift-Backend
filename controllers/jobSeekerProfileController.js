const asyncHandler = require('express-async-handler');
const JobSeeker = require('../models/jobSeekerModel');

exports.getAllJobSeekers = asyncHandler(async (req, res) => {
    try {
        const jobSeekers = await JobSeeker.find().populate('user_id', 'username email');
        res.json(jobSeekers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.getJobSeekerById = asyncHandler(async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.findById(req.params.jobSeekerId).populate('user_id', 'username email');
        if (!jobSeeker) {
            return res.status(404).json({ error: 'Job Seeker not found' });
        }
        res.json(jobSeeker);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.updateJobSeekerProfile = asyncHandler(async (req, res) => {
    try {
        const { fullname, contact_no, profilePicUrl, email } = req.body;

        const jobSeeker = await JobSeeker.findById(req.params.jobSeekerId);
        if (!jobSeeker) {
            return res.status(404).json({ error: 'Job Seeker not found' });
        }

        jobSeeker.fullname = fullname || jobSeeker.fullname;
        jobSeeker.contact_no = contact_no || jobSeeker.contact_no;
        jobSeeker.profilePicUrl = profilePicUrl || jobSeeker.profilePicUrl;
        jobSeeker.email = email || jobSeeker.email;

        await jobSeeker.save();

        res.json(jobSeeker);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.deleteJobSeekerProfile = asyncHandler(async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.findById(req.params.jobSeekerId);
        if (!jobSeeker) {
            return res.status(404).json({ error: 'Job Seeker not found' });
        }

        await JobSeeker.deleteOne({ _id: jobSeeker._id });

        res.json({ message: 'Job Seeker profile deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});