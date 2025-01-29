import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <pre>
          IICL
          Education
        </pre>
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

      {/* Collapsible Navigation Menu */}
      <div className={`menu-container ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li className="nav-item">Home</li>
          <li className="nav-item">Programme</li>
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
