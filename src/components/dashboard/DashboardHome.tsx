import React, { useState, useCallback } from "react";
import styles from "./styles/Dashboard.module.css";


const DashboardHome: React.FC = () => {

  return (
    // Conditionally add the "sidebar-closed" class when the sidebar is not open.
    <div className={`${styles.dashboardContainer }`}>
      <div className={styles.mainContent}>
        <div className={styles.pageContent}>
          <h1>Welcome to the Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
