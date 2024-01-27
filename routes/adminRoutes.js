const express = require('express');
const {
    registerAdmin,
    loginAdmin,
    currentAdmin
} = require('../controllers/adminController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateAdminToken = validateToken('admin');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/current', validateAdminToken, currentAdmin);

module.exports = router;