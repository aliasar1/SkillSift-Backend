const Bookmark = require('../models/bookmarkModel');
const asyncHandler = require('express-async-handler');

exports.addBookmark = asyncHandler(async (req, res) => {
  const { jobseeker_id, job_id } = req.body;
  try {
    let bookmark = await Bookmark.findOne({ jobseeker_id });

    if (!bookmark) {
      bookmark = new Bookmark({
        jobseeker_id,
        job_ids: [job_id] 
      });
    } else {
      bookmark.job_ids.push(job_id);
    }

    await bookmark.save();
    res.status(201).json({ message: 'Bookmark added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.removeBookmark = asyncHandler(async (req, res) => {
  const { jobseeker_id, job_id } = req.body;
  try {
    const bookmark = await Bookmark.findOne({ jobseeker_id });

    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    bookmark.job_ids = bookmark.job_ids.filter(id => id.toString() !== job_id);

    await bookmark.save();
    res.status(200).json({ message: 'Bookmark removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.getBookmarks = asyncHandler(async (req, res) => {
  const jobseeker_id = req.params.id;
  try {
    const bookmarks = await Bookmark.findOne({ jobseeker_id });
    if (!bookmarks) {
      return res.status(404).json({ error: 'Bookmarks not found for this user' });
    }
    res.status(200).json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.checkBookmarkExists = asyncHandler(async (req, res) => {
    const { jobseeker_id, job_id } = req.body;
    try {
        const bookmark = await Bookmark.findOne({ jobseeker_id });

        if (!bookmark) {
        return res.status(404).json({ exists: false, message: 'Bookmark not found for this user' });
        }

        const exists = bookmark.job_ids.includes(job_id);
        res.status(200).json({ exists, message: 'Bookmark status checked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});