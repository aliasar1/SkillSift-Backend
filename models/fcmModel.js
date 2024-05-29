const mongoose = require('mongoose');

const fcmSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fcmToken: {
        type: String,
        required: true
    },
});

module.exports =  mongoose.model('Fcm', fcmSchema);