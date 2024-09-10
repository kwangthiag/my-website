import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  // Fetch blogs with pagination and sorting
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs`, {
          params: {
            page: currentPage,
            sortField,
            sortOrder
          }
        });
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, [currentPage, sortField, sortOrder]);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
      setBlogs(blogs.filter(blog => blog.id !== blogId)); // Remove the deleted blog from the state
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <h1>All Blogs</h1>
      {/* Sort Dropdown */}
      <div>
        <label>Sort By:</label>
        <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
      </div>

      {/* Blog List */}
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            {blog.media && (
              <>
                {/* If it's an image */}
                {blog.media.endsWith('.jpg') || blog.media.endsWith('.png') || blog.media.endsWith('.jpeg') ? (
                  <img src={`http://localhost:5000/${blog.media}`} alt={blog.title} style={{ maxWidth: '100%', height: 'auto' }} />
                ) : null}

                {/* If it's a video */}
                {blog.media.endsWith('.mp4') || blog.media.endsWith('.webm') ? (
                  <video controls style={{ maxWidth: '100%', height: 'auto' }}>
                    <source src={`http://localhost:5000/${blog.media}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </>
            )}
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
            <button onClick={() => window.location.href = `/edit-blog/${blog.id}`}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BlogList;
