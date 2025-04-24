import React, { useState } from "react";
import "./styles/franchiseProcedure.css";

const FranchiseProcedure: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleAccordionToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle the index or close it if already active
    };

    return (
        <div className="procedure-container">
            <div className="contents">
                <h1 className="procedure-heading">Franchise Procedure</h1>
                <p className="step-description">
                    Learn about the step-by-step process of acquiring a franchise. Click each step to view more details.
                </p>

                {/* Step 1 Accordion */}
                <div className="accordion">
                    <button
                        className="accordion-header"
                        onClick={() => handleAccordionToggle(1)}
                    >
                        <span><strong style={{ color: '#ff7c01' }}>Step 1:</strong> Apply for Franchise</span>
                        <span
                            className="arrow"
                            style={{
                                transform: activeIndex === 1 ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                        >
                            &#9660;
                        </span>
                    </button>
                    {activeIndex === 1 && (
                        <div className="accordion-content active">
                            <p><strong style={{ color: "#ff7c01" }}>Any Person/Institute/Society/Trust/Organization</strong> can open a Study Center without any franchise charges.</p>
                            <p>Apply Franchisee Application Form online or offline with complete details of Applicant, premises, available hardware, plans for business development or Email Your BIO-DATA and Infrastructure of the proposed Learning center to <strong>iicleducationindia@gmail.com</strong>.</p>
                        </div>
                    )}
                </div>

                {/* Step 2 Accordion */}
                <div className="accordion">
                    <button
                        className="accordion-header active"
                        onClick={() => handleAccordionToggle(2)}
                    >
                        <span><strong style={{ color: '#ff7c01' }}>Step 2:</strong> Send Required Documents</span>
                        <span
                            className="arrow"
                            style={{
                                transform: activeIndex === 2 ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                        >
                            &#9660;
                        </span>
                    </button>
                    {activeIndex === 2 && (
                        <div className="accordion-content active">
                            <p><strong style={{ color: "#ff7c01" }}>After receiving confirmation from the IICL H.O.,</strong> send the franchisee form along with all required documents filled and DD payable at Ranchi, issued in favor of Forum for Advanced Computer Technology.</p>
                            <p>Fax/email the confirmation form and copy of DD to H.O. to get the Centre Authorization Certificate Sample and Other Materials Sample for your proposed center.</p>
                        </div>
                    )}
                </div>

                {/* Step 3 Accordion */}
                <div className="accordion">
                    <button
                        className="accordion-header"
                        onClick={() => handleAccordionToggle(3)}
                    >
                        <span><strong style={{ color: '#ff7c01' }}>Step 3:</strong> Complete Documentation and Agreement</span>
                        <span
                            className="arrow"
                            style={{
                                transform: activeIndex === 3 ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                        >
                            &#9660;
                        </span>
                    </button>
                    {activeIndex === 3 && (
                        <div className="accordion-content active">
                            <p><strong style={{ color: "#ff7c01" }}>After receiving the following documents along with the duly filled agreement kit:</strong></p>
                            <ul>
                                <li>Photocopy of Institute name registration (if any).</li>
                                <li>Rent agreement (If Place is on rent).</li>
                                <li>Personal Identification proof.</li>
                                <li>Passport size photographs (6 Nos).</li>
                                <li>Residential Proof.</li>
                                <li>Qualification certificate photocopy.</li>
                                <li>BIO-DATA</li>
                                <li>Partnership deed photocopy, if any.</li>
                                <li>Rs. 50 Stamp Paper (2 Pcs.) for agreement.</li>
                            </ul>
                            <p>Authorization will be given after receiving the complete documents.</p>
                            <p>Photograph of centre inner & outward area & mapping to reach the institute from Railway / Bus Stand (After starting the Center).</p>
                            <p>After signing the agreement and completion of documentation process, the entire Technical and Marketing support required for establishing the training center will be provided by IICL Education which will include set of the following as per rules but cost of local advertisement and marketing is borne by franchisee.</p>
                            <div className="marketing-section">
                                <h4>IICL will provide the following advertising materials Design:</h4>
                                <ul>
                                    <li>Flex</li>
                                    <li>Brochure</li>
                                    <li>Pamphlet</li>
                                    <li>Admission Form as per requirement</li>
                                </ul>
                                <h4>Below given material with applicable Charges:</h4>
                                <ul>
                                    <li>Course Material</li>
                                    <li>Student Bag</li>
                                    <li>Sales Promotional Material Formats for Newspapers, Matter for Cable advertisements.</li>
                                    <li>Set of student exercises for most of the courses.</li>
                                    <li>Job opportunities to Diploma holders in different parts of India with the help of Internet & corporate sector & Placement agency.</li>
                                    <li>Global Advertising and Marketing on IICL website.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="footer-note">
                    <p>Note: The franchisee will be responsible for local advertisements and marketing expenses.</p>
                </div>
            </div>
        </div>
    );
};

export default FranchiseProcedure;
