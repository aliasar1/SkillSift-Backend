const express = require('express');
const { getAllUsers, modifyUser, deleteUser, addUser, getCurrentUser, modifyUserStatus, } = require('../controllers/userController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateAdminToken = validateToken('admin');
const validateUserToken = validateToken('user');

const router = express.Router();

router.get('/', validateAdminToken, getAllUsers);

router.put('/:userId', validateUserToken, modifyUser);

router.delete('/:userId', validateAdminToken, deleteUser);

router.patch('/:userId', validateAdminToken, modifyUserStatus);

router.post('/', addUser);

router.get('/current/:userId', getCurrentUser);

module.exports = router;
