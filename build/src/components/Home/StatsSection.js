import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import "./Home.css";
// Animated Counter Hook
const useCounter = (end, duration) => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        let start = 0;
        const increment = Math.ceil(end / (duration / 10));
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(start);
        }, 10);
        return () => clearInterval(timer);
    }, [end, duration]);
    return count;
};
// Stats Component
const StatsSection = () => {
    const trainingCenters = useCounter(700, 2000);
    const professionalCourses = useCounter(250, 2000);
    const enrolledStudents = useCounter(7350, 2000);
    return (_jsx("section", { className: "stats-section", children: _jsxs("div", { className: "stats-container", children: [_jsxs("div", { className: "stat-box", children: [_jsx("img", { src: "/images/training.png", alt: "Training Centers", className: "icon" }), _jsxs("h2", { className: "stat-number", children: [trainingCenters, "+"] }), _jsx("p", { children: "TRAINING CENTERS" })] }), _jsxs("div", { className: "stat-box", children: [_jsx("img", { src: "/images/courses.png", alt: "Professional Courses", className: "icon" }), _jsxs("h2", { className: "stat-number", children: [professionalCourses, "+"] }), _jsx("p", { children: "PROFESSIONAL COURSES" })] }), _jsxs("div", { className: "stat-box", children: [_jsx("img", { src: "/images/student.png", alt: "Enrolled Students", className: "icon" }), _jsxs("h2", { className: "stat-number", children: [enrolledStudents, "+"] }), _jsx("p", { children: "ENROLLED STUDENTS" })] })] }) }));
};
export default StatsSection;
