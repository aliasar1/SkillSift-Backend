const mongoose = require('mongoose');

const level2Schema = new mongoose.Schema({
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    score: Number,
    qna_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QnA'
    }]
});

module.exports = mongoose.model('Level2', level2Schema);