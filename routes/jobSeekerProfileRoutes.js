const express = require('express');
const router = express.Router();
const { getAllJobSeekers, getJobSeekerById, updateJobSeekerProfile, deleteJobSeekerProfile } = require('../controllers/jobSeekerProfileController');


router.get('/', getAllJobSeekers);
router.get('/:jobSeekerId', getJobSeekerById);
router.put('/:jobSeekerId', updateJobSeekerProfile);
router.delete('/:jobSeekerId', deleteJobSeekerProfile);

module.exports = router;


