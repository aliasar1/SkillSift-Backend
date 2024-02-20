const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    jobsAdded: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    profilePicUrl: String
});

module.exports = mongoose.model('Recruiter', recruiterSchema);