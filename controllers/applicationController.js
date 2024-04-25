const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');

const getAllApplications = asyncHandler(async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getTotalApplicationsOfJob = asyncHandler(async (req, res) => {
    try {
        const applications = await Application.find({ job_id: req.params.id });
        
        res.status(200).json({count: applications.length});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const findApplicationById = asyncHandler(async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const findApplicationsByJobId =  asyncHandler(async (req, res) => {
    try {
        const applications = await Application.find({ job_id: req.params.jobId });
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const apply =  asyncHandler(async (req, res) => {
    const application = new Application({
        job_id: req.body.job_id,
        jobseeker_id: req.body.jobseeker_id,
        application_status: req.body.application_status,
        currentLevel: req.body.currentLevel,
        cvUrl: ''
    });

    try {
        const newApplication = await application.save();
        res.status(200).json(newApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const updateApplicationUrl =  asyncHandler(async (req, res) => {
    const applicationId = req.params.id;
    const { newUrl } = req.body;

    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        application.cvUrl = newUrl;
        await application.save();

        res.status(200).json({ message: 'CV Url updated successfully', application: application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

const getApplicationStatus = asyncHandler(async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ application_status: application.application_status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const getApplicationsByJobSeeker = asyncHandler(async (req, res) => {
    try {
        const applications = await Application.find({ jobseeker_id: req.params.id });
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = {
    getAllApplications,
    findApplicationById,
    findApplicationsByJobId,
    apply,
    updateApplicationUrl,
    getApplicationsByJobSeeker,
    getApplicationStatus,
    getTotalApplicationsOfJob
};
