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

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  toggleSidebar,
}) => {
  const role = localStorage.getItem("role");

  const [dropdowns, setDropdowns] = useState({
    franchise: false,
    batch: false,
    students: false,
    enquiry: false,
    gallery: false,
  });

  const toggleDropdown = useCallback((key: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.menu}>
          <li>
            <Link to="/dashboard" className={styles.menuItem} onClick={toggleSidebar}>
              <FaHome className={styles.icon} />
              Home
            </Link>
          </li>

          <li>
            <Link to="/dashboard/profile" className={styles.menuItem} onClick={toggleSidebar}>
              <FaUserShield className={styles.icon} />
              Profile
            </Link>
          </li>

          {role === "admin" && (
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
                    <Link to="/dashboard/franchise/add" onClick={toggleSidebar}>
                      Add Franchise
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/franchise/view" onClick={toggleSidebar}>
                      View Franchise
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {["admin", "franchise"].includes(role || "") && (
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
                    <Link to="/dashboard/batches/add" onClick={toggleSidebar}>
                      Add Batch
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/batches/view" onClick={toggleSidebar}>
                      View Batches
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

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
                  <Link to="/dashboard/student/add-student/" onClick={toggleSidebar}>
                    Add Student
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/students/view" onClick={toggleSidebar}>
                    View Students
                  </Link>
                </li>
                {role !== "franchise" && (
                  <li>
                    <Link to="/dashboard/students/add-marks" onClick={toggleSidebar}>
                      Mark Entry Form
                    </Link>
                  </li>
)}

              </ul>
            )}
          </li>

          {role === "admin" && (
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
                    <Link to="/dashboard/enquiry/view-franchise" onClick={toggleSidebar}>
                      View Franchise Enquiries
                    </Link>
                    <Link to="/dashboard/enquiry/view-contacts" onClick={toggleSidebar}>
                      View Contact Enquiries
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {["admin", "franchise"].includes(role || "") && (
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
                    <Link to="/dashboard/gallery-photo/add" onClick={toggleSidebar}>
                      Add Photo
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default memo(DashboardSidebar);
