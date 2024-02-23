const express = require('express');
const adminRoutes = require('../routes/adminRoutes');
const jobSeekerRoutes = require('../routes/jobSeekerRoutes');
const userRoutes = require('../routes/userRoutes');
const recruiterRoutes = require('../routes/recruiterRoutes');

module.exports = function (app){
    app.use(express.json());
    app.use("/admin", adminRoutes);
    app.use("/user", userRoutes);
    app.use("/jobseeker", jobSeekerRoutes);
    app.use("/recruiter", recruiterRoutes);
}