const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
    scenario: {
        type: String,
        required: true
    },
    industry: String
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);