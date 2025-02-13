import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import AddFranchiseForm from "./AddFranchiseForm";
import { ToastContainer } from "react-toastify";
import ViewFranchise from "./ViewFranchise";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";
import AddBatchForm from "./AddBatchForm";
import ViewBatch from "./ViewBatch";
import AddStudentForm from "./AddStudentForm";
import ViewStudent from "./ViewStudent";
import AddPhoto from "./AddPhoto";

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

        <Route path="/batches">
        <Route path="add" element={<AddBatchForm/>}/>
        <Route path="view" element={<ViewBatch/>}/>
        </Route>

        <Route path="/students">
        <Route path="add" element={<AddStudentForm/>}/>
        <Route path="view" element={<ViewStudent/>}/>
        </Route>

        <Route path="/gallery-photo">
        <Route path="add" element={<AddPhoto/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default DashboardIndex;
