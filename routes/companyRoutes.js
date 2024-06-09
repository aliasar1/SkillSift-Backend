const { addCompanyInfo, getCompanyDetails,getAllCompanies } = require('../controllers/companyController');
const express = require('express');

const router = express.Router();

router.post('/updateInfo/:id', addCompanyInfo);
router.get('/getCompanyInfo/:id', getCompanyDetails);
router.get('/getCompaniesInfo', getAllCompanies);

module.exports = router;