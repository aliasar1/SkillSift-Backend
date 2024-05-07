const mongoose = require('mongoose');

const level3Schema = new mongoose.Schema({
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    score: Number,
    caseStudy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaseStudySession'
    }
});

module.exports = mongoose.model('Level3', level3Schema);