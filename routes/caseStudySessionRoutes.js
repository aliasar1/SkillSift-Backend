const express = require('express');
const router = express.Router();
const caseStudySessionController = require('../controllers/caseStudySessionController');

router.post('/:applicationId', caseStudySessionController.addStartTime);
router.get('/:applicationId', caseStudySessionController.getSessionData);
router.put('/save-progress/:applicationId', caseStudySessionController.saveProgress);

module.exports = router;
