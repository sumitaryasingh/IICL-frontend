import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import styles from "./styles/Dashboard.module.css";
import Navbar from "./Navbar";

const DashboardIndex = () => {
  return (
    <div className={styles.dashboardContainer}>
      <DashboardSidebar />
      <div className={styles.mainContent}>
        <Navbar/>
        <div className={styles.pageContent}>
          <h1>Welcome to the Dashboard</h1>
          {/* Add more dashboard content here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;
