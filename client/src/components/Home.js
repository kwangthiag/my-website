import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css'; 

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Welcome to My Personal Website!</h1>
        <p>This is the homepage of my personal website.</p>
        
        <section>
          <h2>About Me</h2>
          <p>
            Hi, I'm Kwang Thiag, an aspiring developer.
            This is my personal website where I use as a playground to learn new technologies, share things that I learn, and put things that interest me in general.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Feel free to <Link to="/contact">reach out</Link> if you'd like to work together or learn more about my projects.</p>
        </section>

        <section>
          <h2>Blog Tab</h2>
          <p><Link to="/blogs">Here are my blogs</Link></p>
        </section>

        <section>
          <p><Link to="/create-blog">Create a blog</Link></p>
        </section>
      </header>
    </div>
  );
}

export default Home;
