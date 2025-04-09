import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./styles/franchiseBenefits.css";
import { FaCheckCircle } from "react-icons/fa";
const benefitsList = [
    "An ISO Certified Organization.",
    "A National Famous Organization.",
    "National Education Achievers Award in 2015.",
    "National Education Excellence Award in 2016.",
    "International Product and Service Award.",
    "Asia Education Summit Award in 2019.",
    "Use of National & Internationally Certified Brand Name.",
    "Running Successfully 500+ Centres in 27 States.",
    "Proven Business Formula.",
    "Low Investment without any risk.",
    "Guidance for Implementation, Promotion & Running of the Centre.",
    "Online Center and Student Information.",
    "Government Approved 100+ Courses.",
    "Centres are free to decide & prescribe their own fee structure for courses.",
    "No Sharing in Course Fee and Tuition fee of students.",
    "Centres are free to take admissions and conduct examinations as per their will.",
    "Right to suggest new Job-oriented courses.",
    "Campus Interview & Job Placement Assistance.",
    "Proper guidance for office management works.",
    "Regular Quality Check-up.",
    "Nominal One-time Centre Authorization Fee & Renewal Fee.",
    "Centre Start-up Kit.",
    "Advertisement through Internet, National & Local Newspaper.",
    "Easy & Fast Delivery of ID Card, Diploma & Certificates.",
    "National & International Certification of Courses under IICL Brand Name.",
    "Study Material availability at any time.",
    "Own study materials developed by our expert tutor.",
];
// Splitting the list into two columns
const midIndex = Math.ceil(benefitsList.length / 2);
const leftColumn = benefitsList.slice(0, midIndex);
const rightColumn = benefitsList.slice(midIndex);
const FranchiseBenefits = () => {
    return (_jsxs("div", { className: "franchise-benefits-container", children: [_jsx("h1", { className: "benefits-heading", children: "Franchise Benefits" }), _jsxs("div", { className: "benefits-grid", children: [_jsx("ul", { className: "benefits-column", children: leftColumn.map((benefit, index) => (_jsxs("li", { className: "benefit-item", children: [_jsx(FaCheckCircle, { className: "check-icon" }), benefit] }, index))) }), _jsx("ul", { className: "benefits-column", children: rightColumn.map((benefit, index) => (_jsxs("li", { className: "benefit-item", children: [_jsx(FaCheckCircle, { className: "check-icon" }), benefit] }, index))) })] })] }));
};
export default FranchiseBenefits;
