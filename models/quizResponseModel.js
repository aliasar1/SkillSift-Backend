const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  question: { type: String, required: true },
  choices: { type: [String], required: true },
  correctAns: { type: String, required: true },
  userAnswer: { type: String, required: true },
  status: { type: String, required: true },
  application_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application', 
    required: true
  }
});

const QuizSummary = mongoose.model('QuizResponse', quizResponseSchema);

module.exports = QuizSummary;
