// src/Navbar.tsx
import React, { useState } from 'react';
import './Navbar.css';

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '#home',
    subItems: [
      { label: 'Subitem 1', href: '#home-sub1' },
      { label: 'Subitem 2', href: '#home-sub2' },
    ],
  },
  {
    label: 'About Us',
    href: '#about-us',
    subItems: [
      { label: 'Our Mission', href: '#our-mission' },
      { label: 'Our Team', href: '#our-team' },
    ],
  },
  {
    label: 'Online Course',
    href: '#online-course',
    subItems: [
      { label: 'Course 1', href: '#course1' },
      { label: 'Course 2', href: '#course2' },
    ],
  },
  {
    label: 'Programme',
    href: '#programme',
    subItems: [
      { label: 'Programme 1', href: '#programme1' },
      { label: 'Programme 2', href: '#programme2' },
    ],
  },
  {
    label: 'Franchise',
    href: '#franchise',
    subItems: [
      { label: 'Franchise 1', href: '#franchise1' },
      { label: 'Franchise 2', href: '#franchise2' },
    ],
  },
  {
    label: 'Student Zone',
    href: '#student-zone',
    subItems: [
      { label: 'Resources', href: '#resources' },
      { label: 'Support', href: '#support' },
    ],
  },
  {
    label: 'Contact Us',
    href: '#contact-us',
  },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">IICL Education</h2>

      {/* Mobile Menu Toggle Icon */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`toggle-icon ${isMenuOpen ? 'open' : ''}`}></div>
      </button>

      {/* Navigation Links and Auth Buttons */}
      <div className={`menu-container ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="nav-item"
              onClick={() => handleDropdownToggle(index)}
            >
              <a href={item.href}>{item.label}</a>
              {item.subItems && (
                <ul className={`dropdown ${activeDropdown === index ? 'show' : ''}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="dropdown-item">
                      <a href={subItem.href}>{subItem.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <button className="login-button">Log In</button>
          <button className="register-button">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
