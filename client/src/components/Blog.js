import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Blog.css'; 

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

    // const formatText = text => text.split('\n').map((line, index) => (
    //     <span key={index}>
    //       {line}
    //       <br />
    //     </span>
    // ));
    

    return (
        <div className="container-fluid"  style={{ height: '100vh'}}>   
            <div className="row h-100" style={{ height: '100%'}}>
                <div className="col-md-1 p-3 bg-dark" style={{borderTopLeftRadius: 20}}></div>
                <div className="col-md-5 p-3 bg-dark">
                    <div className="header bg-secondary" style={{paddingTop: '2%', paddingLeft: '10%', height: '10%', borderRadius:20, marginBottom: '3%'}}>{title}</div>
                    <div className="bg-secondary" style={{paddingTop: '5%', paddingLeft: '10%', height: '90%', overflowY: 'auto',  whiteSpace: 'pre-wrap',  borderRadius:20}} >
                        {body.trim()}
                    </div>
                </div>
                <div className="col-md-5 p-3 bg-dark" style={{ height: '100%'}}>
                    <div className="row" style={{ height: '100%'}}>
                        <div className="col-12 p-3 bg-secondary mb-3" style={{ height: '50%', borderRadius:20, marginBottom: '3%'}}>
                            {code && code.trim() !== '' && (
                                <>
                                    <h2 className='header' style={{ height:'10%'}}>Code</h2>
                                    <div className="code-window" style={{ borderRadius:20}}>
                                        {code.split('\n').map((line, index) => (
                                            <div key={index}>{line}</div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="col-12 p-3 bg-secondary mb-3" style={{ height: '50%', borderRadius:20}}>
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
                <div className="col-md-1 p-3 bg-dark" style={{borderTopRightRadius: 20}}></div>
            </div>
        </div>
    );
}

export default Blog;