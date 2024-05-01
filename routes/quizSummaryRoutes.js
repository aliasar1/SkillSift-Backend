const express = require('express');
const router = express.Router();
const quizSummaryController = require('../controllers/quizSummaryController');

router.post('/', quizSummaryController.addSummary);
router.get('/:applicationId', quizSummaryController.getQuizSummariesByApplicationId);

module.exports = router;
