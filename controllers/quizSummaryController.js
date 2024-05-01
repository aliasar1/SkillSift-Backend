const QuizSummary = require('../models/quizSummaryModel');
const QuizResponse = require('../models/quizResponseModel');

exports.addSummary = async (req, res) => {
  try {
    const { responses, application_id } = req.body;
    const responseIds = [];

    for (const response of responses) {
      const { question, choices, correctAns, userAnswer, status } = response;
      const quizResponse = new QuizResponse({
        question,
        choices,
        correctAns,
        userAnswer,
        status,
        application_id
      });
      const savedResponse = await quizResponse.save();
      responseIds.push(savedResponse._id);
    }

    const quizSummary = new QuizSummary({
      responses: responseIds,
      application_id
    });

    await quizSummary.save();

    res.status(201).json({ message: 'Quiz summary added successfully', quizSummary });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getQuizSummariesByApplicationId = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const quizSummaries = await QuizSummary.find({ application_id: applicationId }).populate('responses');
    res.status(200).json(quizSummaries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
