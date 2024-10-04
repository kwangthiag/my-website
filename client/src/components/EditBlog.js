import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditBlog() {
  const { id } = useParams(); // Get blog ID from URL
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [media, setMedia] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setTitle(response.data.title);
        setBody(response.data.body);
        setCode(response.data.code);
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
    formData.append('code', code);

    try {
      await axios.put(`/api/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.href = '/blogs'; // Redirect after successful update
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <div className="container create-blog" style={{ height:'100%' }} >
      <form onSubmit={handleSubmit} className="form-container"  style={{ height:'100%' }}>
          <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Enter title" />
          </div>
          <div>
              <label>Body:</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Enter body text here"></textarea>
          </div>
          <div>
              <label>Code:</label>
              <textarea className="code-area" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code here"></textarea>
          </div>
          <div>
              <label>Upload Photo or Video:</label>
              <input type="file" accept="image/*" onChange={(e) => setMedia(e.target.files[0])} />
          </div>
          <button type="submit">Create Blog</button>
      </form>

      <div className="preview-container">
          <div className="preview-title">{title || "Preview Title"}</div>
          <div className="preview-body">{body || "Preview of body content..."}</div>
          <div className="preview-code">
              {code || "Preview of code content..."}
          </div>
          {media && (
              <div className="preview-media">
                  <img src={URL.createObjectURL(media)} alt="Preview" />
              </div>
          )}
      </div>
  </div>
  );
}

export default EditBlog;
