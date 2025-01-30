import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div>
       <h2 className="logo">
    {/* <img src="/images/iicl-iconT.png" alt="IICL Logo" className="iicl-icon" /> */}
    <span className='logo-text'>IICL Education</span>
  </h2>

      {/* Always visible Auth Buttons on the upper side */}
      <div className="auth-buttons-top">
        <button className="login-button">Log In</button>
        <button className="register-button">Register</button>
      </div>

      {/* Mobile Toggle Icon */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
      </button>


      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li className="nav-item"><Link to={'/'}>Home</Link></li>
        <li className="nav-item"> <Link to={'/programme'}> Programme</Link></li>
        <li className="nav-item">Franchise</li>
        <li className="nav-item">Student Zone</li>
        <li className="nav-item">Gallery</li>
      </ul>

        {/* Auth Buttons inside the collapsible menu for mobile */}
        <div className="auth-buttons">
          <button className="login-button">Log In</button>
          <button className="register-button">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
