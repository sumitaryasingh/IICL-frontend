import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {programData} from "../api/programmeData";
import "./Navbar.css";

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string; external?: boolean }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {label:"Gallery",href:"/gallery"},
  { label: "About Us", href: "/about-us", 
    subItems: [
      {label: "About Institution" , href: "/about-us"},
      {label: "Authorization Certificate", href: "https://drive.google.com/file/d/1ubvg01vha_D_jh2mRpdYnDwNmI7POCDn/view?usp=sharing", external: true },
      {label: "ISO Certificate", href: "https://drive.google.com/file/d/1P0IGU5LEnNAAqxfrkC3z8ODHz6be3Otv/view?usp=sharing", external: true },
      {label: "MSME Certificate", href: "https://drive.google.com/file/d/1Z1MWXi0rwGUU3cz0RoEdOUdmYLIISIT0/view?usp=sharing", external: true },
      {label: "NGO Darpan Certificate", href: "https://drive.google.com/file/d/1182tgrhBzvopiLg593s3fflb1tuhtArS/view?usp=sharing", external: true },
      {label: "Institution Pan Details", href: "https://drive.google.com/file/d/1EqL9PCta8-6CXLsofypxfDMF_PNJGACV/view?usp=sharing", external: true },
      {label: "Trust Deed", href: "https://drive.google.com/file/d/1bemDujnbcpTY288o_BmlzY5gQBer8FvS/view?usp=sharing", external: true },
    ]
   },
  {
    label: "Programs", href: "#",  subItems: programData.map((category: any) => ({
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
      { label: "Enrollment & I-Card", href: "/student/enrollment" },
      { label: "Course Prospectus", href: "https://drive.google.com/file/d/1vbBRuPbEAIhSWTQbRPs4MtF6x9rcSItZ/view?usp=sharing" },
      { label: "Institution Prospectus", href: "https://drive.google.com/file/d/1xQH0sW2ngStlOohA1lszAm1BRSaBtJWA/view?usp=sharing" },

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
