// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBell, FaSignOutAlt } from "react-icons/fa";
import styles from "./styles/Navbar.module.css";
import { logoutService } from "../../services/authService";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutService();
      toast.success("Logout successfully")
      // Optionally clear any stored data (like context or localStorage) if needed
      navigate("/franchise/login"); // Redirect user to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
      // Optionally show an error notification to the user
    }
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/dashboard" className={styles.logo}>
          Dashboard
        </Link>
      </div>
      <div className={styles.navItems}>
        <button className={styles.logout} onClick={handleLogout}>
          <FaSignOutAlt className={styles.icon} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
