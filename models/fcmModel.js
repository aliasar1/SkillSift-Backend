const mongoose = require('mongoose');

const fcmSchema = new mongoose.Schema({
    fcmToken: [{
        type: String,
        required: true
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
});

const FCM = mongoose.model('FCM', fcmSchema);

module.exports = FCM;
