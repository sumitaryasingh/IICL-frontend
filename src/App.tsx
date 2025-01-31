import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Programme from "./components/Programme";
import Franchise from "./components/Franchise/Franchise";
import FranchiseForm from "./components/Franchise/FranchiseForm";
import FranchiseNetwork from "./components/Franchise/FranchiseNetwork";
import FranchiseLogin from "./components/Franchise/FranchiseLogin";
import FranchiseBenefits from "./components/Franchise/FranchiseBenefits";
import FranchiseRequirement from "./components/Franchise/FranchiseRequirement";
import FranchiseProcedure from "./components/Franchise/FranchiseProcedure";
import FranchiseTestimonials from "./components/Franchise/FranchiseTestimonials";
console.log("hi dataaa me")
const App: React.FC = () => {
  return (
    <div className="App">
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/programme" element={<Programme />} />

        {/* Franchise Parent Route */}
        <Route path="/franchise" element={<Franchise />}>
          <Route path="form" element={<FranchiseForm />} />
          <Route path="network" element={<FranchiseNetwork />} />
          <Route path="login" element={<FranchiseLogin />} />
          <Route path="benefits" element={<FranchiseBenefits />} />
          <Route path="requirement" element={<FranchiseRequirement />} />
          <Route path="procedure" element={<FranchiseProcedure />} />
          <Route path="testimonials" element={<FranchiseTestimonials />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
