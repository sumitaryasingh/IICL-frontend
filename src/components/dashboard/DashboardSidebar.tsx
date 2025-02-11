import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaUserShield, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { RiAddLargeFill, RiAddLine, RiArrowDropDownLine, RiListView } from "react-icons/ri";
import { IoIosPerson } from "react-icons/io";
import styles from "./styles/Sidebar.module.css";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Dropdown states
  const [franchiseDropdown, setFranchiseDropdown] = useState(false);
  const [batchDropdown, setBatchDropdown] = useState(false);
  const [studentsDropdown, setStudentsDropdown] = useState(false);
  const [enquiryDropdown, setEnquiryDropdown] = useState(false);

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
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
            <div
              className={styles.menuItem}
              onClick={() => setFranchiseDropdown(!franchiseDropdown)}
            >
              <FaUsers className={styles.icon} />
              Franchise Management
              <RiArrowDropDownLine
                className={`${styles.dropIcon} ${franchiseDropdown ? styles.rotate : ""}`}
              />
            </div>
            {franchiseDropdown && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/dashboard/franchise/add">
                  Add Franchise
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/franchise/view">View Franchise</Link>
                </li>
              </ul>
            )}
          </li>


          {/* Batch Management */}
          <li>
            <div className={styles.menuItem} onClick={() => setBatchDropdown(!batchDropdown)}>
              <FaUsers className={styles.icon} />
              Batch Management
              <RiArrowDropDownLine className={`${styles.dropIcon} ${batchDropdown ? styles.rotate : ""}`} />
            </div>
            {batchDropdown && (
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
            <div className={styles.menuItem} onClick={() => setStudentsDropdown(!studentsDropdown)}>
              <IoIosPerson className={styles.icon} />
              Students Management
              <RiArrowDropDownLine className={`${styles.dropIcon} ${studentsDropdown ? styles.rotate : ""}`} />
            </div>
            {studentsDropdown && (
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
            <div className={styles.menuItem} onClick={() => setEnquiryDropdown(!enquiryDropdown)}>
              <FaPhoneAlt className={styles.icon} />
              Enquiry Management
              <RiArrowDropDownLine className={`${styles.dropIcon} ${enquiryDropdown ? styles.rotate : ""}`} />
            </div>
            {enquiryDropdown && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/dashboard/enquiry/view">View Enquiries</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardSidebar;
