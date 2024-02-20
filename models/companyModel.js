const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: String,
    location: String,
    phone: String,
    email: String,
    country: String,
    state: String,
    city: String,
    street: String,
    postalCode: String,
    logoImage: String
});

module.exports = mongoose.model('Company', companySchema);