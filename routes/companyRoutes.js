const { addCompanyInfo, getCompanyDetails } = require('../controllers/companyController');
const express = require('express');

const router = express.Router();

router.post('/updateInfo/:id', addCompanyInfo);
router.get('/getCompanyInfo/:id', getCompanyDetails);

module.exports = router;