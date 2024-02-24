const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    industry: String,
    geolocation: {
        type: [Number], 
        index: '2dsphere' 
    },
    companyPhone: String, 
    companyEmail: String,
    country: String,
    state: String,
    city: String,
    street: String,
    postalCode: String,
    logoImage: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('Company', companySchema);
