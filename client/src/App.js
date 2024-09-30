import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import BlogList from './components/BlogList';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';
import Blog from './components/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Router>
        {/* Global Navbar */}
        <nav className="navbar navbar-expand-sm navbarfont navbar-dark">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                  }
                >
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Suspense for lazy-loaded components */}
        <Suspense fallback={<div style={{ color: '#f1f1f1' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
