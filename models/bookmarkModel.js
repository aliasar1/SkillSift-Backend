const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    jobseeker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker',
        required: true
    },
    job_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }]
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
