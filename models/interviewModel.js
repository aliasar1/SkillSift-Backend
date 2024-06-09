const mongoose = require('mongoose');

const interviewScheduleSchema = new mongoose.Schema({
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const InterviewSchedule = mongoose.model('InterviewSchedule', interviewScheduleSchema);

module.exports = InterviewSchedule;
