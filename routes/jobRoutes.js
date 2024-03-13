const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob, updateUrl} = require('../controllers/jobsController');

router.get('/jobs/:jobId', getJobById);

router.put('/jobs/:jobId',updateJob);

router.delete('/jobs/:jobId', deleteJob);

router.put('/jobs/update/:jobId', updateUrl);

router.get('/jobs', getAllJobs);

router.post('/jobs', createJob);

// router.get('/jobs/search/:id', getRecruiterAddedJobs);

module.exports = router;