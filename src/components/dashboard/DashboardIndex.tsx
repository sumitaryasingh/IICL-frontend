// components/DashboardIndex.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./DashboardHome";
import AddFranchiseForm from "./AddFranchiseForm";
import ViewFranchise from "./ViewFranchise";
import AddBatchForm from "./AddBatchForm";
import ViewBatch from "./ViewBatch";
import AddStudentForm from "./AddStudentForm";
import ViewStudent from "./ViewStudent";
import AddPhoto from "./AddPhoto";
import AdminFranchiseProfile from "./Profile";
import Certificate from "./Certificate";
import Marksheet from "./Marksheet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardIndex: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/profile" element={<AdminFranchiseProfile />} />
        <Route path="/franchise/add" element={<AddFranchiseForm />} />
        <Route path="/franchise/view" element={<ViewFranchise />} />
        <Route path="/batches/add" element={<AddBatchForm />} />
        <Route path="/batches/view" element={<ViewBatch />} />
        <Route path="/students/add" element={<AddStudentForm />} />
        <Route path="/students/view" element={<ViewStudent />} />
        <Route
          path="/students/view/certificate/:studentId"
          element={<Certificate />}
        />
        <Route
          path="/students/view/marksheet/:studentId"
          element={<Marksheet />}
        />
        <Route path="/gallery-photo/add" element={<AddPhoto />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </DashboardLayout>
  );
};

export default DashboardIndex;
