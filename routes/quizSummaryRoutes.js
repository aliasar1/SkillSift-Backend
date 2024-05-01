const express = require('express');
const router = express.Router();
const quizSummaryController = require('../controllers/quizSummaryController');

router.post('/', quizSummaryController.addQuizSummary);
router.get('/:jobseekerId/:jobId', quizSummaryController.getQuizSummariesByJobseekerAndJob);

module.exports = router;
