const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    contact: String,
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "Email address already taken"],
    },
});

module.exports =  mongoose.model('Admin', adminSchema);