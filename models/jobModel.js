const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    recruiter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skillsrequired: [String],
    experienceRequired: Number,
    timestamp: {
        type: Date,
        default: Date.now
    },
    deadline: Date,
    qualificationRequired: String,
    mode: String,
    minSalary: Number,
    maxSalary: Number,
    type: String,
    status: String,
    jdUrl: String
});

module.exports = mongoose.model('Job', jobSchema);