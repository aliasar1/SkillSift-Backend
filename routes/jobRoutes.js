const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob, updateUrl, updateJsonUrl, updateJobStatus, getTotalJobs} = require('../controllers/jobsController');

router.get('/total', getTotalJobs);

router.get('/jobs/:jobId', getJobById);

router.put('/jobs/:jobId',updateJob);

router.delete('/jobs/:jobId', deleteJob);

router.put('/jobs/update/:jobId', updateUrl);

router.put('/jobs/updateJson/:jobId', updateJsonUrl);

router.put('/jobs/updateStatus/:jobId', updateJobStatus);

router.get('/jobs', getAllJobs);

router.post('/jobs', createJob);

// router.get('/jobs/search/:id', getRecruiterAddedJobs);

module.exports = router;