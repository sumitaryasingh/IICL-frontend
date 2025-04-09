import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import styles from "./styles/Programs.module.css";
import { programData } from "../../api/programmeData";
export default function Programme() {
    const { type } = useParams(); // Get selected course type from URL
    const selectedType = decodeURIComponent(type || ""); // Decode special characters
    // Get the selected category data
    const [courseCategory, setCourseCategory] = useState(() => programData.find((category) => category.type === selectedType));
    const [showProgram, setShowProgram] = useState(null);
    // Update the category when route changes
    useEffect(() => {
        setCourseCategory(programData.find((category) => category.type === selectedType));
        setShowProgram(null);
    }, [selectedType]);
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx("div", { className: styles["course-links"], children: programData.map((category) => (_jsx(Link, { to: `/programs/${encodeURIComponent(category.type)}`, className: styles["course-link"], children: category.type }, category.type))) }), _jsxs("div", { className: styles["program-container"], children: [_jsx("h1", { children: selectedType ? `${selectedType} List` : "Select a Course Type" }), courseCategory ? (courseCategory.courses.map((curElem) => (_jsx(ProgramItems, { curElem: curElem, showProgram: showProgram, setShowProgram: setShowProgram }, curElem.id)))) : (_jsx("p", { children: "Please select a course type from above." }))] }), _jsx(Footer, {})] }));
}
// Component to display each course item
const ProgramItems = ({ curElem, showProgram, setShowProgram }) => {
    const handleToggle = () => {
        setShowProgram((prev) => (prev === curElem.id ? null : curElem.id)); // Toggle accordion
    };
    return (_jsxs("div", { className: styles.programItems, children: [_jsxs("div", { className: styles.programHeader, onClick: handleToggle, style: { cursor: "pointer" }, children: [_jsx("h3", { children: curElem.title }), _jsx(IoMdArrowDropdownCircle, { className: styles["down-arrow"] })] }), showProgram === curElem.id && (_jsxs("div", { className: styles.programDetails, children: [_jsxs("p", { children: [_jsx("strong", { children: "Duration:" }), " ", curElem.duration] }), _jsxs("p", { children: [_jsx("strong", { children: "Subjects:" }), " ", curElem.subjects.join(", ")] })] }))] }));
};
