const express = require('express');
const adminRoutes = require('../routes/adminRoutes');
const jobSeekerRoutes = require('../routes/jobSeekerRoutes');
const userRoutes = require('../routes/userRoutes');
const recruiterRoutes = require('../routes/recruiterRoutes');
const authRoutes = require('../routes/authRoutes');
const passwordRoutes = require('../routes/passwordRoutes');
const companyRoutes = require('../routes/companyRoutes');
const jobRoutes = require('../routes/jobRoutes');
// const uploadRoutes = require('../routes/uploadRoutes');
const jobSeekerProfileRoutes = require('../routes/jobSeekerProfileRoutes');
const recruiterProfileRoutes = require('../routes/recruiterProfileRoutes');

module.exports = function (app) {
    app.use(express.json());
    app.use("/admin", adminRoutes);
    app.use("/user", userRoutes);
    app.use("/jobseeker", jobSeekerRoutes);
    app.use("/recruiter", recruiterRoutes);
    app.use("/authenticate", authRoutes);
    app.use('/password', passwordRoutes)
    app.use("/company", companyRoutes);
    app.use("/job", jobRoutes);
    // app.use("/s3", uploadRoutes);
    app.use("/jobseekerprofile", jobSeekerProfileRoutes);
    app.use("/recruiterprofile", recruiterProfileRoutes);
}