const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');
const Recruiter = require('../models/recruiterModel');
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
    const job = await Job.findById(req.params.jobId);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    const { title, description, skill_tags, qualification_required, experience_required, mode, type, industry, min_salary, max_salary, jdUrl, deadline } = req.body;

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
    job.jdUrl = job.jdUrl;
    job.deadline = deadline || job.deadline;

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
