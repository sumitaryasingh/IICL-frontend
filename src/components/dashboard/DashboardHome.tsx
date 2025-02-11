import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import styles from "./styles/Dashboard.module.css";
import Navbar from "./Navbar";

const DashboardHome = () => {
  return (
    <div className={styles.dashboardContainer}>
      <DashboardSidebar />
      <div className={styles.mainContent}>
        <Navbar/>
        <div className={styles.pageContent}>
          <h1>Welcome to the Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
