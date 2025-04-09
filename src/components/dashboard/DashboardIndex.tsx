// components/DashboardIndex.tsx
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardIndex: React.FC = () => {
  return (
    <DashboardLayout>
      <Outlet /> {/* Render nested child routes here */}
      <ToastContainer position="top-right" autoClose={3000} />
    </DashboardLayout>
  );
};

export default DashboardIndex;
