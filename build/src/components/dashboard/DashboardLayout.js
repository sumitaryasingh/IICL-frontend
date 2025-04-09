import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/DashboardLayout.tsx
import { useState, useCallback } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "./Navbar";
import styles from "./styles/Dashboard.module.css";
const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);
    return (_jsxs("div", { className: `${styles.dashboardContainer} ${!isSidebarOpen ? styles["sidebar-closed"] : ""}`, children: [_jsx(DashboardSidebar, { isOpen: isSidebarOpen, toggleSidebar: toggleSidebar }), _jsxs("div", { className: styles.mainContent, children: [_jsx(Navbar, {}), _jsx("div", { className: styles.pageContent, children: children })] })] }));
};
export default DashboardLayout;
