import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute: React.FC = () => {
  const franchiseId = localStorage.getItem("franchiseId");
  const adminId = localStorage.getItem("adminId");
  const location = useLocation();

  const isAuthenticated = franchiseId || adminId;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Please login to access the dashboard", {
        toastId: "auth-warning",
      });
    }
  }, [isAuthenticated, location.pathname]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/franchise/login" replace />;
};

export default ProtectedRoute;
