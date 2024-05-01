const express = require('express');
const adminRoutes = require('../routes/adminRoutes');
const jobSeekerRoutes = require('../routes/jobSeekerRoutes');
const userRoutes = require('../routes/userRoutes');
const recruiterRoutes = require('../routes/recruiterRoutes');
const authRoutes = require('../routes/authRoutes');
const passwordRoutes = require('../routes/passwordRoutes');
const companyRoutes = require('../routes/companyRoutes');
const jobRoutes = require('../routes/jobRoutes');
const uploadRoutes = require('../routes/uploadRoutes');
const jobSeekerProfileRoutes = require('../routes/jobSeekerProfileRoutes');
const recruiterProfileRoutes = require('../routes/recruiterProfileRoutes');
const bookmarkRoutes = require('../routes/bookmarkRoutes');
const applicationRoutes = require('../routes/applicationRoutes');
const level1Routes= require('../routes/level1Routes');
const quizSummaryRoutes= require('../routes/quizSummaryRoutes');
const level2Routes= require('../routes/level2Routes');

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/v1/admin", adminRoutes);
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/jobseeker", jobSeekerRoutes);
    app.use("/api/v1/recruiter", recruiterRoutes);
    app.use("/api/v1/authenticate", authRoutes);
    app.use('/api/v1/password', passwordRoutes)
    app.use("/api/v1/company", companyRoutes);
    app.use("/api/v1/job", jobRoutes);
    app.use("/api/v1/s3", uploadRoutes);
    app.use("/api/v1/jobseekerprofile", jobSeekerProfileRoutes);
    app.use("/api/v1/recruiterprofile", recruiterProfileRoutes);
    app.use("/api/v1/bookmark", bookmarkRoutes);
    app.use('/api/v1/applications', applicationRoutes);
    app.use('/api/v1/level1', level1Routes);
    app.use('/api/v1/summary', quizSummaryRoutes);
    app.use('/api/v1/level2', level2Routes);
}