import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import AddFranchiseForm from "./AddFranchiseForm";
import { ToastContainer } from "react-toastify";
import ViewFranchise from "./ViewFranchise";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardIndex = () => {
  return (
    <div className="DashboardIndex">
      <Navbar/>
      <DashboardSidebar/>
      <Routes>
        <Route path="/" element={<DashboardHome/>}/>
        <Route path="/franchise">
          <Route path="add" element={<AddFranchiseForm />}/>
          <Route path="view" element={<ViewFranchise />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default DashboardIndex;
