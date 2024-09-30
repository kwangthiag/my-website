import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BlogList.css'; 

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/blogs`, {
          params: {
            page: currentPage,
            sortField,
            sortOrder,
          },
        });
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
      await axios.delete(`/api/blogs/${blogId}`);
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>All Blogs</h1>
        <div>
          <label>Sort By:</label>
          <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
            <option value="createdAt">Date</option>
            <option value="title">Title</option>
          </select>
          <button class="button" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </button>
        </div>
      </div>

      <div className="blog-list">
        <ul>
          {blogs.map(blog => (
            <li key={blog.id}>
              <h2>{blog.title}</h2>
              <p>{blog.body}</p>
              {blog.media && (
                <>
                  {blog.media.endsWith('.jpg') || blog.media.endsWith('.png') || blog.media.endsWith('.jpeg') ? (
                    <img src={`${blog.media}`} alt={`${blog.media}`} />
                  ) : null}
                </>
              )}
              <button class="button" onClick={() => handleDelete(blog.id)}>Delete</button>
              <button class="button" onClick={() => window.location.href = `/edit-blog/${blog.id}`}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="pagination-controls">
        <button class="button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button class="button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BlogList;
