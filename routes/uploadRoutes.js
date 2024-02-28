const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/upload/:directory', uploadController.uploadFile);
router.get('/list', uploadController.listFiles);
router.get('/download/:filename', uploadController.downloadFile);
router.delete('/delete/:filename', uploadController.deleteFile);

module.exports = router;