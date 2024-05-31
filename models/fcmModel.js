const mongoose = require('mongoose');

const fcmSchema = new mongoose.Schema({
    fcmTokens: [{
        type: String,
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
});

const FCM = mongoose.model('FCM', fcmSchema);

module.exports = FCM;
