const express = require('express');
const { getBlog, getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage for multer to keep the original file extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename but keep the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, uniqueSuffix + ext); // Save file with unique name and original extension
  }
});

const upload = multer({ storage: storage });

// Define routes for blogs
router.get('/blogs', getBlogs);      // GET /api/blogs
router.get('/blogs/:id', getBlog);  
router.post('/blogs', upload.single('media'), createBlog);     // POST /api/blogs
router.put('/blogs/:id', upload.single('media'), updateBlog);  // PUT /api/blogs/:id
router.delete('/blogs/:id', deleteBlog); // DELETE /api/blogs/:id

module.exports = router;
