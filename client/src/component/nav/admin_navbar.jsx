import React, { useState } from 'react';
import $ from 'jquery';
import 'bootstrap';
import { Link } from 'react-router-dom';
import MyIcon from './logo.png';

function AdminNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src={MyIcon} alt="My Icon" />
      </a>

      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin" onClick={handleLinkClick}>
                home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/login"
                onClick={handleLinkClick}
              >
                login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/register"
                onClick={handleLinkClick}
              >
                register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard"
                onClick={handleLinkClick}
              >
                dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/bookings/all"
                onClick={handleLinkClick}
              >
                view bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/courses"
                onClick={handleLinkClick}
              >
                courses
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/dashboard"
                onClick={handleLinkClick}
              >
                dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
