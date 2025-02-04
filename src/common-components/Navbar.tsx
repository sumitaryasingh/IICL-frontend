import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import programmeData from "../../src/api/programmeData.json"; // Assuming the course data is here
import "./Navbar.css";

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string; external?: boolean }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us", href: "/about-us",
    subItems: [
      { label: "Our Mission", href: "/our-mission" },
      { label: "Our Team", href: "/our-team" }
    ]
  },
  {
    label: "Programme", href: "#",
    subItems: programmeData.map((category) => ({
      label: category.type,
      href: `/programs/${encodeURIComponent(category.type)}`, // Dynamically link to each course type
    }))
  },
  {
    label: "Franchise", href: "/franchise/login",
    subItems: [
      { label: "Franchise Form", href: "/franchise/form" },
      { label: "Franchise Login", href: "/franchise/login" },
      { label: "Franchise Benefits", href: "/franchise/benefits" },
      { label: "Franchise Requirement", href: "/franchise/requirement" },
      { label: "Franchise Procedure", href: "/franchise/procedure" },
      { label: "Franchise Testimonials", href: "/franchise/testimonials" }
    ]
  },
  {
    label: "Student Zone", href: "/student-zone",
    subItems: [
      { label: "Enrollment", href: "/student/enrollment" },
      { label: "I-Card", href: "/student/icard" },
      { label: "Prospectus", href: "https://drive.google.com/file/d/1gkPSy3dM0I93YTn4dn2vvkZmzQ3b81yr/view?usp=sharing", external: true }
    ]
  },
  { label: "Contact Us", href: "/contact-us" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleMouseEnter = (index: number) => setActiveDropdown(index);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>IICL Education</div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`bar ${isMenuOpen ? "open" : ""}`} />
          <span className={`bar ${isMenuOpen ? "open" : ""}`} />
          <span className={`bar ${isMenuOpen ? "open" : ""}`} />
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className="nav-item"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div onClick={() => navigate(item.href)}>{item.label}</div>
              {item.subItems && (
                <ul className={`dropdown ${activeDropdown === index ? "show" : ""}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      {subItem.external ? (
                        <a style={{ color: "inherit" }} href={subItem.href} target="_blank" rel="noopener noreferrer">
                          {subItem.label}
                        </a>
                      ) : (
                        <div onClick={() => navigate(subItem.href)}>{subItem.label}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Authentication Buttons */}
        <div className="auth-buttons">
          <button className="login-button" onClick={() => navigate("/login")}>Log In</button>
          <button className="register-button" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
