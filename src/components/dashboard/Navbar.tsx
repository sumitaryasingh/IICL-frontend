import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBell, FaSignOutAlt } from "react-icons/fa";
import styles from "./styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div >
       <Link to="/dashboard" className={styles.logo}> Dashboard</Link>
        </div>
      <div className={styles.navItems}>
        <button className={styles.logout}>
          <FaSignOutAlt className={styles.icon} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
