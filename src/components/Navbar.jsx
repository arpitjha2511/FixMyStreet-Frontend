import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/navbar.css';
import Logo from '../assets/logo.png';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on the login screen
  if (location.pathname === '/') return null;

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/user/${searchTerm}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <a class="navbar-brand" href="#">
      <img src={Logo} alt="Bootstrap"  height="24"/>
    </a>
        <a className="navbar-brand" href="/">FixMyStreet</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/landing">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/project-report">Project Report</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/arpitjha2511/FixMyStreet-Backend">Source Code</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Logout</a>
            </li>
          </ul>
  
          {/* Search Form and Logout Button on the right */}
          <div className="d-flex align-items-center ms-auto">
            <form
              className="d-flex me-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by name"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
  
  
}

export default Navbar;
