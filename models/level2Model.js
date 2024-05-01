const mongoose = require('mongoose');

const level2Schema = new mongoose.Schema({
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    score: Number,
    status: String,
    qna_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizSummary'
    }
});

module.exports = mongoose.model('Level2', level2Schema);