import React from "react";
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
    "National & International Certification of Courses under FACT Brand Name.",
    "Study Material availability at any time.",
    "Own study materials developed by our expert tutor.",
];

// Splitting the list into two columns
const midIndex = Math.ceil(benefitsList.length / 2);
const leftColumn = benefitsList.slice(0, midIndex);
const rightColumn = benefitsList.slice(midIndex);

const FranchiseBenefits: React.FC = () => {
    return (
        <div className="franchise-benefits-container">
            <h1 className="benefits-heading">Franchise Benefits</h1>
            <div className="benefits-grid">
                <ul className="benefits-column">
                    {leftColumn.map((benefit, index) => (
                        <li key={index} className="benefit-item">
                            <FaCheckCircle className="check-icon" />
                            {benefit}
                        </li>
                    ))}
                </ul>
                <ul className="benefits-column">
                    {rightColumn.map((benefit, index) => (
                        <li key={index} className="benefit-item">
                            <FaCheckCircle className="check-icon" />
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FranchiseBenefits;
