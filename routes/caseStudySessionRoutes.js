const express = require('express');
const router = express.Router();
const caseStudySessionController = require('../controllers/caseStudySessionController');

router.post('/:applicationId', caseStudySessionController.addStartTime);
router.get('/checkSession/:applicationId', caseStudySessionController.checkSessionExists);
router.get('checkScore/:applicationId', caseStudySessionController.checkScoreExists);
router.get('/:applicationId', caseStudySessionController.getSessionData);
router.get('/score/:applicationId', caseStudySessionController.getScoreByApplicationId);
router.put('/save-progress/:applicationId', caseStudySessionController.saveProgress);

module.exports = router;
