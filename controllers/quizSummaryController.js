const QuizSummary = require('../models/quizSummaryModel');

exports.addQuizSummary = async (req, res) => {
  try {
    const { question, choices, correctAns, userAnswer, status, job_id, jobseeker_id } = req.body;
    const quizSummary = new QuizSummary({
      question,
      choices,
      correctAns,
      userAnswer,
      status,
      job_id,
      jobseeker_id
    });
    await quizSummary.save();
    res.status(201).json({ message: 'Quiz summary added successfully', quizSummary });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getQuizSummariesByJobseekerAndJob = async (req, res) => {
  try {
    const { jobseekerId, jobId } = req.params;
    const quizSummaries = await QuizSummary.find({ jobseeker_id: jobseekerId, job_id: jobId });
    res.status(200).json(quizSummaries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
