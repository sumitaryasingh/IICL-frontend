import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DashboardLayout from "./DashboardLayout";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DashboardIndex = () => {
    return (_jsxs(DashboardLayout, { children: [_jsx(Outlet, {}), " ", _jsx(ToastContainer, { position: "top-right", autoClose: 3000 })] }));
};
export default DashboardIndex;
