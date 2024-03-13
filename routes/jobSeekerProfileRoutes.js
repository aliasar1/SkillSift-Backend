const express = require('express');
const router = express.Router();
const { getAllJobSeekers, getJobSeekerById, updateJobSeekerProfile, deleteJobSeekerProfile, updateProfilePicUrl } = require('../controllers/jobSeekerProfileController');


router.get('/', getAllJobSeekers);
router.get('/:jobSeekerId', getJobSeekerById);
router.put('/:jobSeekerId', updateJobSeekerProfile);
router.put('/update-url/:id', updateProfilePicUrl);
router.delete('/:jobSeekerId', deleteJobSeekerProfile);

module.exports = router;


