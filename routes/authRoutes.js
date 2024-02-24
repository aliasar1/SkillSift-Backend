const { login } = require('../controllers/authController');
// const {forgotPassword}  = require('../controllers/forgotPasswordController');
const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();

router.use(bodyParser.json());

router.post('/login', login);


// router.post('/forgot-password',forgotPassword);

module.exports = router;