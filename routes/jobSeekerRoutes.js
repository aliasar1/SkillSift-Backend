const express = require('express');
const { registerJobSeeker, loginJobSeeker, getCurrentJobseeker, getTotalJobSeekers } = require('../controllers/jobSeekerController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateJobSeekerToken = validateToken('jobSeeker');

const router = express.Router();

router.get('/total', getTotalJobSeekers);
router.post('/register', registerJobSeeker);
router.post('/login', loginJobSeeker);
router.get('/current/:id', getCurrentJobseeker);

module.exports = router;