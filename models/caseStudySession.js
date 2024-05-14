const mongoose = require('mongoose');

const caseStudySessionSchema = new mongoose.Schema({
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    question: {
        type: String,
    },
    response: {
        type: String,
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: { type: String, required: true },
    submissionTime: {
        type: Date,
    },
});

const CaseStudySession = mongoose.model('CaseStudySession', caseStudySessionSchema);

module.exports = CaseStudySession;
