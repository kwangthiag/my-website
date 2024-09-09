const fs = require('fs');
const path = require('path');
const Blog = require('../models/blog');


// Get all blogs
const getBlogs = async (req, res) => {
  const { page = 1, sortField = 'createdAt', sortOrder = 'DESC' } = req.query;

  const limit = 10; // Set the number of blogs per page
  const offset = (page - 1) * limit;

  try {
    // Fetch blogs with sorting and pagination
    const { rows: blogs, count: totalBlogs } = await Blog.findAndCountAll({
      order: [[sortField, sortOrder.toUpperCase()]],
      limit,
      offset
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalBlogs / limit);

    // Send response back to client
    res.json({
      blogs,      
      totalPages,  
      currentPage: page,
      totalBlogs   
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Create a blog
const createBlog = async (req, res) => {
  try {
    
    const { title, body } = req.body;
    const mediaFile = req.file; 
    let filePath = "";
    if (mediaFile) filePath = req.file.path.replace(/\\/g, '/');
    console.log(filePath);
    const newBlog = await Blog.create({
      title,
      body,
      media: mediaFile ? filePath : null, 
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const mediaFile = req.file;
  let filePath = "";
  if (mediaFile) filePath = req.file.path.replace(/\\/g, '/');
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      blog.title = title || blog.title;
      blog.body = body || blog.body;
      if (blog.media && mediaFile) {
        const mediaPath = path.join(__dirname, '..', blog.media);
        fs.unlink(mediaPath, (err) => {
          if (err) {
            console.error('Failed to update media file:', err);
          } else {
            console.log('Media file updated successfully');
          }
        });
      }
      blog.media = mediaFile ? filePath : blog.media;
      await blog.save();
      res.json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      // Check if the blog has a media file
      if (blog.media) {
        // Get the path to the media file
        const mediaPath = path.join(__dirname, '..', blog.media);
        console.log(mediaPath);
        // Delete the media file from the file system
        fs.unlink(mediaPath, (err) => {
          if (err) {
            console.error('Failed to delete media file:', err);
          } else {
            console.log('Media file deleted successfully');
          }
        });
      }
      await blog.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

module.exports = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog
};
