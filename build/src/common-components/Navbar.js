import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { programData } from "../api/programmeData";
import "./Navbar.css";
const navItems = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Us", href: "/about-us" },
    {
        label: "Programs", href: "#", subItems: programData.map((category) => ({
            label: category.type,
            href: `/programs/${encodeURIComponent(category.type)}`, // Dynamically link to each course type
        }))
    },
    { label: "Franchise", href: "/franchise", subItems: [
            { label: "Franchise Form", href: "/franchise/form" },
            // { label: "Franchise Network", href: "/franchise/network" },
            { label: "Franchise Login", href: "/franchise/login" },
            { label: "Franchise Benefits", href: "/franchise/benefits" },
            { label: "Franchise Requirement", href: "/franchise/requirement" },
            { label: "Franchise Procedure", href: "/franchise/procedure" },
            { label: "Franchise Testimonials", href: "/franchise/testimonials" }
        ] },
    {
        label: "Student Zone", href: "/student-zone",
        subItems: [
            { label: "Enrollment", href: "/student/enrollment" },
            { label: "I-Card", href: "/student/icard" },
            { label: "Prospectus", href: "https://drive.google.com/file/d/1gkPSy3dM0I93YTn4dn2vvkZmzQ3b81yr/view?usp=sharing", external: true }
        ]
    },
    { label: "Contact Us", href: "/contact-us" },
];
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };
    const handleMouseEnter = (index) => setActiveDropdown(index);
    const handleMouseLeave = () => setActiveDropdown(null);
    return (_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "navbar-container", children: [_jsx("div", { className: "logo-box", children: _jsx("img", { src: "../images/iicl-iconT.png", alt: "", className: "logo" }) }), _jsxs("button", { className: `menu-toggle ${isMenuOpen ? "open" : ""}`, onClick: toggleMenu, "aria-label": "Toggle menu", children: [_jsx("span", { className: "bar" }), _jsx("span", { className: "bar" }), _jsx("span", { className: "bar" })] }), _jsx("ul", { className: `nav-links ${isMenuOpen ? "active" : ""}`, children: navItems.map((item, index) => (_jsxs("li", { className: "nav-item", children: [_jsx("div", { className: "nav-link", onClick: () => item.subItems ? handleDropdownToggle(index) : navigate(item.href), children: item.label }), item.subItems && (_jsx("ul", { className: `dropdown ${activeDropdown === index ? "show" : ""}`, children: item.subItems.map((subItem, subIndex) => (_jsx("li", { children: subItem.external ? (_jsx("a", { style: { color: "inherit" }, href: subItem.href, target: "_blank", rel: "noopener noreferrer", children: subItem.label })) : (_jsx("div", { onClick: () => navigate(subItem.href), children: subItem.label })) }, subIndex))) }))] }, index))) })] }) }));
};
export default Navbar;
