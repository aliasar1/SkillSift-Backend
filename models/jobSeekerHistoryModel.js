const mongoose = require('mongoose');

const jobSeekerHistorySchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    jobseeker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: String
});

module.exports = mongoose.model('JobSeekerHistory', jobSeekerHistorySchema);