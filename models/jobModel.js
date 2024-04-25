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
    skill_tags: [String],
    qualification_required: String,
    experience_required: String,
    mode: String,
    type: String,
    industry: String,
    min_salary: Number,
    max_salary: Number,
    jdUrl: String,
    jdJsonUrl: String,
    status: String,
    deadline: Date,
    time_stamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);
