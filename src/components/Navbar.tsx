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

    {/* Mobile Toggle Icon */}
<button className="menu-toggle" onClick={toggleMenu}>
  <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
  <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
  <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
</button>


      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li className="nav-item">Home</li>
        <li className="nav-item">Programme</li>
        <li className="nav-item">Franchise</li>
        <li className="nav-item">Student Zone</li>
        <li className="nav-item">Gallery</li>
      </ul>

      {/* Authentication Buttons */}
      <div className={`auth-buttons ${isMenuOpen ? 'active' : ''}`}>
        <button className="login-button">Log In</button>
        <button className="register-button">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
