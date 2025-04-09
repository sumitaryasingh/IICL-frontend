import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { programData } from "../../api/programmeData";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";
import styles from "./styles/Programs.module.css";
export default function ProgrammeList() {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsxs("div", { className: styles["program-list-container"], children: [_jsx("h1", { children: "Our Program Categories" }), programData.map((courseType, index) => (_jsx(Link, { to: `/programs/${encodeURIComponent(courseType.type)}`, className: "program-link", children: courseType.type }, index)))] }), _jsx(Footer, {})] }));
}
