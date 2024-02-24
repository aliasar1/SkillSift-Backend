const asyncHandler = require('express-async-handler');
const Recruiter = require('../models/recruiterModel');
const Company = require('../models/companyModel');

exports.addCompanyInfo = asyncHandler(async (req, res) => {
    try {
        const {
            companyName,
            industry,
            companyPhone,
            companyEmail,
            country,
            state,
            city,
            street,
            postalCode,
            geolocation,
            logoImage 
        } = req.body;

        // Check for required fields
        const requiredFields = ['companyName', 'industry', 'companyPhone', 'companyEmail', 'country', 'state', 'city', 'street', 'postalCode', 'geolocation'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        console.log(companyPhone)
        console.log(geolocation)

        const newCompany = new Company({
            companyName,
            industry,
            companyPhone,
            companyEmail,
            country,
            state,
            city,
            street,
            postalCode,
            geolocation,
            logoImage
        });

        console.log(newCompany);

        const recruiterId = req.params.id;
        const recruiter = await Recruiter.findById(recruiterId);

        if (!recruiter) {
            return res.status(404).json({ success: false, error: 'Recruiter not found' });
        }

        recruiter.company_id = newCompany._id;

        await newCompany.save();
        await recruiter.save();

        return res.status(201).json({ success: true, data: newCompany });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
