const mongoose = require('mongoose');

const level1Schema = new mongoose.Schema({
    application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    score: Number,
    status: String
});

module.exports = mongoose.model('Level1', level1Schema);