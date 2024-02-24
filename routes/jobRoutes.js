const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobsController');

router.post('/jobs', createJob);

router.get('/jobs', getAllJobs);

router.get('/jobs/:jobId', getJobById);

router.put('/jobs/:jobId',updateJob);

router.delete('/jobs/:jobId', deleteJob);

module.exports = router;
