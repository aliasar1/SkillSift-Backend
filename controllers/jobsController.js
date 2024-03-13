const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');
const Recruiter = require('../models/recruiterModel');
const Company = require('../models/companyModel');
const moment = require('moment');

exports.createJob = asyncHandler(async (req, res) => {
    const { recruiter_id, title, description, skill_tags, qualification_required, experience_required, mode, type, industry, min_salary, max_salary, jdUrl, deadline } = req.body;

    const recruiter = await Recruiter.findById(recruiter_id);
    if (!recruiter) {
        return res.status(404).json({ error: 'Recruiter not found' });
    }

    const formattedDeadline = moment(deadline, 'DD-MM-YYYY').toDate();
    console.log(formattedDeadline)
    const job = await Job.create({
        recruiter_id,
        title,
        description,
        skill_tags,
        qualification_required,
        experience_required,
        mode,
        type,
        industry,
        min_salary,
        max_salary,
        jdUrl: '',
        deadline: formattedDeadline,
        status: 'active'
    });

    recruiter.jobsAdded.push(job._id);
    await recruiter.save();

    res.status(201).json(job);
});

// exports.getRecruiterAddedJobs = asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     const recruiter = await Recruiter.findById(id);
//     if (!recruiter) {
//         return res.status(404).json({ error: 'Recruiter not found' });
//     }
//     const jobs = await Job.find({'_id': id}).populate('jobsAdded');
//     console.log(jobs);
//     res.status(200).json(jobs);
// });

exports.getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find().populate();
    res.json(jobs);
});

exports.getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
});

exports.updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    const { title, description, skill_tags, qualification_required, experience_required, mode, type, industry, min_salary, max_salary, deadline } = req.body;

    job.title = title || job.title;
    job.description = description || job.description;
    job.skill_tags = skill_tags || job.skill_tags;
    job.qualification_required = qualification_required || job.qualification_required;
    job.experience_required = experience_required || job.experience_required;
    job.mode = mode || job.mode;
    job.type = type || job.type;
    job.industry = industry || job.industry;
    job.min_salary = min_salary || job.min_salary;
    job.max_salary = max_salary || job.max_salary;
    job.deadline = deadline ? moment(deadline, 'DD-MM-YYYY').toDate() : job.deadline;

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

    res.json({ success: true, message: 'Job deleted successfully' });
});

exports.updateUrl = asyncHandler(async (req, res) => {
    const jobId = req.params.jobId;
    const { newUrl } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        job.jdUrl = newUrl;
        await job.save();

        res.status(200).json({ message: 'Job URL updated successfully', job: job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
