import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Blog() {
    const { id } = useParams(); // Get blog ID from URL
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [media, setMedia] = useState(null);
    const [code, setCode] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
          try {
            const response = await axios.get(`/api/blogs/${id}`);
            console.log(response.data);
            setTitle(response.data.title);
            setBody(response.data.body);
            setCode(response.data.code);
            setMedia(response.data.media);
          } catch (error) {
            console.error('Error fetching blog:', error);
          }
        };
        fetchBlog();
    }, [id]);

    return (
        <div className="container">
            <div className="row">
            <div className="col-md-6  p-3 bg-dark">
                <h1>{title}</h1>
                <p>{body}</p>
               
            </div>
            <div className="col-md-6  p-3 bg-dark">
                {code && code.trim() !== '' && (
                    <>
                        <h2>Code:</h2>
                        <div className="code-block p-3 bg-black text-white rounded mb-3">
                            <pre><code>{code}</code></pre>
                        </div>
                    </>
                )}
                {media && (
                    <>
                    {media.endsWith('.jpg') || media.endsWith('.png') || media.endsWith('.jpeg') ? (
                        <img src={`${media}`} alt={`${media}` } className="img-fluid rounded" />
                    ) : null}
                    </>
                )}

            </div>
            </div>
        </div>
    );
}

export default Blog;