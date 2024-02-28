const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob, updateUrl } = require('../controllers/jobsController');

router.post('/jobs', createJob);

router.get('/jobs', getAllJobs);

router.get('/jobs/:jobId', getJobById);

router.put('/jobs/:jobId',updateJob);

router.delete('/jobs/:jobId', deleteJob);

router.put('/jobs/:jobId', updateUrl);

module.exports = router;