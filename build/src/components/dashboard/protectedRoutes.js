import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const ProtectedRoute = () => {
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
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/franchise/login", replace: true });
};
export default ProtectedRoute;
