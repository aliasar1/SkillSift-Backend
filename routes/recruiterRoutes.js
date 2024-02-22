const express = require('express');
const { registerRecruiter, loginRecruiter, getCurrentRecruiter } = require('../controllers/recruiterController');
const router = express.Router();

router.post('/register', registerRecruiter);
router.post('/login', loginRecruiter);
router.get('/current/:id', getCurrentRecruiter);

module.exports = router;
