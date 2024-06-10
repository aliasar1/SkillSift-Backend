const express = require('express');
const { registerRecruiter, loginRecruiter, getCurrentRecruiter, getCurrentRecruiterCompany, getTotalRecruiter,getAllRecruiters } = require('../controllers/recruiterController');
const router = express.Router();

router.get('/total', getTotalRecruiter);
router.post('/register', registerRecruiter);
router.post('/login', loginRecruiter);
router.get('/current/:id', getCurrentRecruiter);
router.get('/recruiter-company/:id', getCurrentRecruiterCompany);
router.get('/getRecruiters',getAllRecruiters );


module.exports = router;
