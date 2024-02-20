const mongoose = require('mongoose');

const qnaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    industry: String,
    answers: [String],
    correctAns: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('QnA', qnaSchema);