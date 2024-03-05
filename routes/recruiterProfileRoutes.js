const express = require('express');
const router = express.Router();

const { getAllRecruiters, getRecruiterById, updateRecruiterProfile, deleteRecruiterProfile } = require('../controllers/recruiterProfileController');


router.get('/', getAllRecruiters);
router.get('/:recruiterId', getRecruiterById);
router.put('/:recruiterId', updateRecruiterProfile);
router.delete('/:recruiterId', deleteRecruiterProfile);


module.exports = router;


