import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditBlog() {
  const { id } = useParams(); // Get blog ID from URL
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('media', media);

    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.href = '/'; // Redirect after successful update
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
      </div>
      <div>
        <label>Upload New Photo or Video:</label>
        <input type="file" accept="image/*, video/*" onChange={(e) => setMedia(e.target.files[0])} />
      </div>
      <button type="submit">Update Blog</button>
    </form>
  );
}

export default EditBlog;
