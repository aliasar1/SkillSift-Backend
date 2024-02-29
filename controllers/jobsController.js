const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');
const Recruiter = require('../models/recruiterModel');

exports.createJob = asyncHandler(async (req, res) => {
    const { recruiter_id, title, description, skillsrequired, experienceRequired, deadline, qualificationRequired, mode, minSalary, maxSalary, type } = req.body;

    const recruiter = await Recruiter.findById(recruiter_id);
    if (!recruiter) {
        return res.status(404).json({ error: 'Recruiter not found' });
    }

    const job = await Job.create({
        recruiter_id,
        title,
        description,
        skillsrequired,
        experienceRequired,
        deadline,
        qualificationRequired,
        mode,
        minSalary,
        maxSalary,
        type,
        status: 'active',
        jdUrl: '',
    });

    recruiter.jobsAdded.push(job._id);
    await recruiter.save();

    res.status(201).json(job);
});

exports.getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find().populate('recruiter_id', 'fullname contact_no email');
    res.json(jobs);
});

exports.getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.jobId).populate('recruiter_id', 'fullname contact_no email');
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
});

exports.updateJob = asyncHandler(async (req, res) => {
    const { title, description, skillsrequired, experienceRequired, deadline, qualificationRequired, mode, minSalary, maxSalary, type, jdUrl } = req.body;

    const job = await Job.findById(req.params.jobId);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    job.title = title || job.title;
    job.description = description || job.description;
    job.skillsrequired = skillsrequired || job.skillsrequired;
    job.experienceRequired = experienceRequired || job.experienceRequired;
    job.deadline = deadline || job.deadline;
    job.qualificationRequired = qualificationRequired || job.qualificationRequired;
    job.mode = mode || job.mode;
    job.minSalary = minSalary || job.minSalary;
    job.maxSalary = maxSalary || job.maxSalary;
    job.type = type || job.type;
    job.jdUrl = jdUrl || job.jdUrl;

    await job.save();

    res.json(job);
});

exports.deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    const recruiter = await Recruiter.findById(job.recruiter_id);
    recruiter.jobsAdded = recruiter.jobsAdded.filter(jobId => jobId.toString() !== job._id.toString());
    await recruiter.save();

    await Job.deleteOne({ _id: job._id });

    res.json({ message: 'Job deleted successfully' });
});

exports.updateUrl = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId;
    const { newUrl } = req.body;
    console.log(jobId);
    console.log(newUrl);
    

    try {
        const job = await Job.findById(jobId);
        console.log(job);
        
        console.log(newUrl);
        job.jdUrl = newUrl;
        console.log(job.jdUrl);
        
        await job.save();
        console.log(job)

        res.status(200).json({ message: 'Job URL updated successfully', job: job});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});