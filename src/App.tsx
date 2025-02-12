import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs";
import Programme from "./components/programs/Programs";
import ProgrammeList from "./components/programs/ProgrammeList";

import Franchise from "./components/Franchise/Franchise";
import FranchiseForm from "./components/Franchise/FranchiseForm";
// import FranchiseNetwork from "./components/Franchise/FranchiseNetwork";
import FranchiseLogin from "./components/Franchise/FranchiseLogin";
import FranchiseBenefits from "./components/Franchise/FranchiseBenefits";
import FranchiseRequirement from "./components/Franchise/FranchiseRequirement";
import FranchiseProcedure from "./components/Franchise/FranchiseProcedure";
import FranchiseTestimonials from "./components/Franchise/FranchiseTestimonials";
import Student from "./components/studentZone/StudentZone";
// import StudentZone from "./components/StudentZone/StudentEnrollment";
import StudentEnrollment from "./components/studentZone/StudentEnrollment";
import StudentDetails from "./components/studentZone/StudentDetails";
// import ICard from "./components/StudentZone/ICard";

import ContactUs from "./components/ContactUs";
import DashboardIndex from "./components/dashboard/DashboardIndex";
import AddFranchiseForm from "./components/dashboard/AddFranchiseForm";
import ViewFranchise from "./components/dashboard/ViewFranchise";
import AddBatchForm from "./components/dashboard/AddBatchForm";
import ViewBatch from "./components/dashboard/ViewBatch";
import AddStudentForm from "./components/dashboard/AddStudentForm";
import ViewStudent from "./components/dashboard/ViewStudent";
const App: React.FC = () => {
  return (
    <div className="App">
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/programs" element={<ProgrammeList />} />
        <Route path="/programs/:type" element={<Programme />} />
        {/* Franchise Parent Route */}
        <Route path="/franchise" element={<Franchise />}>
          <Route path="form" element={<FranchiseForm />} />
          {/* <Route path="network" element={<FranchiseNetwork />} /> */}
          <Route path="login" element={<FranchiseLogin />} />
          <Route path="benefits" element={<FranchiseBenefits />} />
          <Route path="requirement" element={<FranchiseRequirement />} />
          <Route path="procedure" element={<FranchiseProcedure />} />
          <Route path="testimonials" element={<FranchiseTestimonials />} />
        </Route>
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<DashboardIndex />} >
          {/* <Route path="profile" element={}/> */}
            <Route path="franchise/add" element={<AddFranchiseForm />}/>
            <Route path="franchise/view" element={<ViewFranchise/>}/>
            <Route path="batches/add" element={<AddBatchForm/>}/>
            <Route path="batches/view" element={<ViewBatch/>}/>
            <Route path="students/add" element={<AddStudentForm/>} />
            <Route path="students/view" element={<ViewStudent/>} />
        </Route>

        {/* Student Zone Parent Route */}
        <Route path="/student" element={<Student />}>
          <Route path="enrollment" element={<StudentEnrollment />} />
          <Route path="/student/details/:encodedEnrollment" element={<StudentDetails />} />
          <Route path="icard" element={<FranchiseTestimonials />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
