// components/DashboardLayout.tsx
import React, { useState, useCallback } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "./Navbar";
import styles from "./styles/Dashboard.module.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={`${styles.dashboardContainer} ${
        !isSidebarOpen ? styles["sidebar-closed"] : ""
      }`}
    >
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
