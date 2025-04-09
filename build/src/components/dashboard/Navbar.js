import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import styles from "./styles/Navbar.module.css";
import { logoutService } from "../../services/authService";
import { toast } from "react-toastify";
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutService();
            toast.success("Logout successfully");
            // Optionally clear any stored data (like context or localStorage) if needed
            navigate("/franchise/login"); // Redirect user to login page after logout
        }
        catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed. Please try again.");
            // Optionally show an error notification to the user
        }
    };
    return (_jsxs("nav", { className: styles.navbar, children: [_jsx("div", { children: _jsx(Link, { to: "/dashboard", className: styles.logo, children: "Dashboard" }) }), _jsx("div", { className: styles.navItems, children: _jsxs("button", { className: styles.logout, onClick: handleLogout, children: [_jsx(FaSignOutAlt, { className: styles.icon }), "Logout"] }) })] }));
};
export default Navbar;
