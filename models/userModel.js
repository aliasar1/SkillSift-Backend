const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        enum: ['rejected', 'accepted', 'pending'],
        default: 'pending'
    }
    ,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

module.exports = mongoose.model('User', userSchema);