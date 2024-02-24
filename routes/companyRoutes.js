const { addCompanyInfo } = require('../controllers/companyController');
const express = require('express');

const router = express.Router();

router.post('/updateInfo/:id', addCompanyInfo);

module.exports = router;