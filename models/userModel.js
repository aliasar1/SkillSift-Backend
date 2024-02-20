const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"],
        minlength: 6,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add password"],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['admin', 'recruiter', 'jobseeker'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

module.exports = mongoose.model('User', userSchema);