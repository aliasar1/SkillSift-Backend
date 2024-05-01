const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSchema = new Schema({
  responses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizResponse',
    required: true
  }],
  application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
