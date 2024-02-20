const mongoose = require('mongoose');

const recruiterJobHistorySchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    recruiter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: String
});

module.exports = mongoose.model('RecruiterJobHistory', recruiterJobHistorySchema);