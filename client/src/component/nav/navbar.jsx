import React, { useState } from 'react';
import $ from 'jquery';
import 'bootstrap';
import { Link } from 'react-router-dom';
import MyIcon from './logo.png';

function Navbar() {
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
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/packages"
                onClick={handleLinkClick}
              >
                packages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop" onClick={handleLinkClick}>
                shop
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/booking_courses"
                id="nav-link-special"
                onClick={handleLinkClick}
              >
                online booking
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                id="nav-link-special"
                to="tel:2679168780"
                onClick={handleLinkClick}
              >
                267.916.8780
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// function disableTimeSlots(date) {
//   const formattedDate = date.toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true,
//   });

//   const newDay = daySelected.split('-');
//   const updatedDate = newDay[1] + '/' + newDay[2];

//   let formattedOnDrugs = [`${updatedDate}, ${formattedDate}`];
//   console.log(formattedOnDrugs);

//   // Check if the formatted date is in the forbiddenDates array
//   if (forbiddenDates.some((item) => formattedOnDrugs.includes(item))) {
//     console.log(formattedDate);
//     return true; // disable the button
//   }
//   return false; // enable the button
// }
