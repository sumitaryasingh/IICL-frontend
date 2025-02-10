import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import programmeData from "../../src/api/programmeData.json";
import "./Navbar.css";

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string; external?: boolean }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {label:"Gallery",href:"/gallery"},
  { label: "About Us", href: "/about-us" },
  {
    label: "Programs", href: "#",  subItems: programmeData.map((category) => ({
      label: category.type,
      href: `/programs/${encodeURIComponent(category.type)}`, // Dynamically link to each course type
    }))
  },

  { label: "Franchise", href: "/franchise", subItems: [
    { label: "Franchise Form", href: "/franchise/form" },
    // { label: "Franchise Network", href: "/franchise/network" },
    { label: "Franchise Login", href: "/franchise/login" },
    { label: "Franchise Benefits", href: "/franchise/benefits" },
    { label: "Franchise Requirement", href: "/franchise/requirement" },
    { label: "Franchise Procedure", href: "/franchise/procedure" },
    { label: "Franchise Testimonials", href: "/franchise/testimonials" }
  ] },
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

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMouseEnter = (index: number) => setActiveDropdown(index);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        
        <div className="logo-box">
          <img src="../images/iicl-iconT.png" alt="" className="logo" />
        </div>

        {/* Mobile Menu Toggle */}
        <button className={`menu-toggle ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <div
                className="nav-link"
                onClick={() => item.subItems ? handleDropdownToggle(index) : navigate(item.href)}
              >
                {item.label}
              </div>
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

      </div>
    </nav>
  );
};

export default Navbar;
