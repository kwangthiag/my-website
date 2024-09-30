import React, { useState } from 'react';
import axios from 'axios';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [media, setMedia] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('media', media);

    try {
      await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.href = '/'; // Redirect after successful creation
    } catch (err) {
      console.error('Error creating blog:', err);
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
        <label>Upload Photo or Video:</label>
        <input type="file" accept="image/*" onChange={(e) => setMedia(e.target.files[0])} />
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
}

export default CreateBlog;
