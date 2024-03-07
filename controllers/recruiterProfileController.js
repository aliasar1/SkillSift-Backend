const asyncHandler = require('express-async-handler');
const Recruiter = require('../models/recruiterModel');

exports.getAllRecruiters = asyncHandler(async (req, res) => {
    try {
        const recruiters = await Recruiter.find()
        res.json(recruiters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRecruiterById = asyncHandler(async (req, res) => {
    try {
        const recruiter = await Recruiter.findById(req.params.recruiterId).populate('user_id', 'fullname contact_no profilePicUrl email');
        if (!recruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }
        res.json(recruiter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.updateRecruiterProfile = asyncHandler(async (req, res) => {
    try {
        const { fullname, contact_no, profilePicUrl, email } = req.body;

        const recruiter = await Recruiter.findById(req.params.recruiterId);
        if (!recruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        recruiter.fullname = fullname || recruiter.fullname;
        recruiter.contact_no = contact_no || recruiter.contact_no;
        recruiter.profilePicUrl = profilePicUrl || recruiter.profilePicUrl;
        recruiter.email = email || recruiter.email;

        await recruiter.save();

        res.json(recruiter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.deleteRecruiterProfile = asyncHandler(async (req, res) => {
    try {
        const recruiter = await Recruiter.findById(req.params.recruiterId);
        if (!recruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        await Recruiter.deleteOne({ _id: recruiter._id });

        res.json({ message: 'Recruiter profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.updateProfilePicUrl =  asyncHandler(async (req, res) => {
    const recruiterId = req.params.id;
    const { newUrl } = req.body;

    try {
        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        recruiter.profilePicUrl = newUrl;
        await recruiter.save();

        res.status(200).json({ message: 'Profile pic updated successfully', recruiter: recruiter });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});