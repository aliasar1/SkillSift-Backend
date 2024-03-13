const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.post('/add', bookmarkController.addBookmark);
router.delete('/remove', bookmarkController.removeBookmark);
router.get('/get/:id', bookmarkController.getBookmarks);
router.post('/getStatus', bookmarkController.checkBookmarkExists);

module.exports = router;
