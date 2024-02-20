const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
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
    profilePicUrl: String
});

module.exports =  mongoose.model('JobSeeker', jobSeekerSchema);