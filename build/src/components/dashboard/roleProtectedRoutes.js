import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const RoleProtectedRoute = ({ allowedRoles }) => {
    const role = localStorage.getItem("role");
    const franchiseId = localStorage.getItem("franchiseId");
    const adminId = localStorage.getItem("adminId");
    const location = useLocation();
    const toastShown = useRef(false);
    const isAuthorized = (role === "franchise" && franchiseId && allowedRoles.includes("franchise")) ||
        (role === "admin" && adminId && allowedRoles.includes("admin"));
    useEffect(() => {
        if (!isAuthorized && !toastShown.current) {
            toast.error("You are not authorized to access this page", {
                toastId: "role-restriction",
            });
            toastShown.current = true;
        }
    }, [isAuthorized, location.pathname]);
    if (!isAuthorized) {
        return _jsx(Navigate, { to: "/dashboard/profile", replace: true });
    }
    return _jsx(Outlet, {});
};
export default RoleProtectedRoute;
