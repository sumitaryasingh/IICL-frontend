import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserShield,
  FaPhoneAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosPerson } from "react-icons/io";
import styles from "./styles/Sidebar.module.css";

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [dropdowns, setDropdowns] = useState({
    franchise: false,
    batch: false,
    students: false,
    enquiry: false,
    gallery: false,
  });

  // Toggle a specific dropdown, wrapped in useCallback for performance.
  const toggleDropdown = useCallback((key: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.menu}>
          <li>
            <Link to="/dashboard" className={styles.menuItem}>
              <FaHome className={styles.icon} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className={styles.menuItem}>
              <FaUserShield className={styles.icon} />
              Profile
            </Link>
          </li>

          {/* Franchise Management */}
          <li>
            <div className={styles.menuItem} onClick={() => toggleDropdown("franchise")}>
              <FaUsers className={styles.icon} />
              Franchise Management
              <RiArrowDropDownLine
                className={`${styles.dropIcon} ${dropdowns.franchise ? styles.rotate : ""}`}
              />
            </div>
            {dropdowns.franchise && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/dashboard/franchise/add">Add Franchise</Link>
                </li>
                <li>
                  <Link to="/dashboard/franchise/view">View Franchise</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Batch Management */}
          <li>
            <div className={styles.menuItem} onClick={() => toggleDropdown("batch")}>
              <FaUsers className={styles.icon} />
              Batch Management
              <RiArrowDropDownLine
                className={`${styles.dropIcon} ${dropdowns.batch ? styles.rotate : ""}`}
              />
            </div>
            {dropdowns.batch && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/dashboard/batches/add">Add Batch</Link>
                </li>
                <li>
                  <Link to="/dashboard/batches/view">View Batches</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Students Management */}
          <li>
            <div className={styles.menuItem} onClick={() => toggleDropdown("students")}>
              <IoIosPerson className={styles.icon} />
              Students Management
              <RiArrowDropDownLine
                className={`${styles.dropIcon} ${dropdowns.students ? styles.rotate : ""}`}
              />
            </div>
            {dropdowns.students && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/dashboard/students/add">Add Student</Link>
                </li>
                <li>
                  <Link to="/dashboard/students/view">View Students</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Enquiry Management */}
          <li>
            <div className={styles.menuItem} onClick={() => toggleDropdown("enquiry")}>
              <FaPhoneAlt className={styles.icon} />
              Enquiry Management
              <RiArrowDropDownLine
                className={`${styles.dropIcon} ${dropdowns.enquiry ? styles.rotate : ""}`}
              />
            </div>
            {dropdowns.enquiry && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/dashboard/enquiry/view">View Enquiries</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Gallery Photo Management */}
          <li>
            <div className={styles.menuItem} onClick={() => toggleDropdown("gallery")}>
              Manage Gallery Photo
              <RiArrowDropDownLine
                className={`${styles.dropIcon} ${dropdowns.gallery ? styles.rotate : ""}`}
              />
            </div>
            {dropdowns.gallery && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/dashboard/gallery-photo/add">Add Photo</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default memo(DashboardSidebar);
