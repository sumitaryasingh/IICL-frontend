import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo & About */}
        <div className="footer-section about">
          <img src="/images/iicl-iconT.png" alt="Company Logo" className="footer-logo" />
          <h2>
            IICL Education
          </h2>
          <p className="about-text">
            Our Company is a leading provider of quality services, dedicated to innovation and excellence in the industry.
          </p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <hr />
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li> <Link to={"/franchise/login"}> Center Login </Link></li>
          </ul>
        </div>

        {/* Right Section: Contact Info */}
        <div className="footer-section">
          <h2>Contact Us</h2>
          <hr />
          <div className="contact">
          <p>📍 Ram Rajya More, Siwan - 841226</p>
          <p>📧 info@yourcompany.com</p>
          <p>📞 9876543210</p>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 IICL Education. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
