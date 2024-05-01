const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSummarySchema = new Schema({
  question: { type: String, required: true },
  choices: { type: [String], required: true },
  correctAns: { type: String, required: true },
  userAnswer: { type: String, required: true },
  status: { type: String, required: true },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobseeker_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker',
    required: true
  }
});

const QuizSummary = mongoose.model('QuizSummary', quizSummarySchema);

module.exports = QuizSummary;
