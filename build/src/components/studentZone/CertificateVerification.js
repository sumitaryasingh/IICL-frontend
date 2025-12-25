import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchStudentDetails } from "../../services/studentZone";
import "./styles/CertificateVerification.css";
const CertificateVerification = () => {
    const [enrollmentId, setEnrollmentId] = useState("");
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const handleVerify = async (e) => {
        e.preventDefault();
        if (!enrollmentId.trim()) {
            toast.error("Please enter an enrollment ID");
            return;
        }
        setLoading(true);
        setVerified(false);
        setStudentData(null);
        try {
            const response = await fetchStudentDetails(enrollmentId.trim());
            // Handle different response formats
            let studentDetails = null;
            if (response && typeof response === 'object') {
                // Check if response has success and student properties
                if ('success' in response && 'student' in response) {
                    const apiResponse = response;
                    if (apiResponse.success && apiResponse.student) {
                        studentDetails = apiResponse.student;
                    }
                }
                // Check if response is directly the student object
                else if ('name' in response || 'studentName' in response || 'enrollmentId' in response) {
                    studentDetails = response;
                }
                // Check if response has a student property directly
                else if ('student' in response) {
                    studentDetails = response.student;
                }
            }
            if (studentDetails) {
                setStudentData(studentDetails);
                setVerified(true);
                toast.success("Certificate verified successfully!");
            }
            else {
                toast.error("Certificate not found. Please check the enrollment ID.");
                setVerified(false);
            }
        }
        catch (error) {
            console.error("Error verifying certificate:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to verify certificate. Please try again.";
            toast.error(errorMessage);
            setVerified(false);
            setStudentData(null);
        }
        finally {
            setLoading(false);
        }
    };
    const handleReset = () => {
        setEnrollmentId("");
        setVerified(false);
        setStudentData(null);
    };
    return (_jsx("div", { className: "certificate-verification-container", children: _jsxs("div", { className: "verification-card", children: [_jsx("h2", { className: "verification-title", children: "Verify Certificate" }), _jsx("p", { className: "verification-instruction", children: "Enter the enrollment ID to verify a student certificate" }), _jsxs("form", { onSubmit: handleVerify, className: "verification-form", children: [_jsx("input", { type: "text", placeholder: "Enter Enrollment ID (e.g., IICL-HAS-2025-4002)", value: enrollmentId, onChange: (e) => setEnrollmentId(e.target.value), className: "enrollment-input", required: true, disabled: loading }), _jsx("button", { type: "submit", className: "verify-button", disabled: loading, children: loading ? "Verifying..." : "Verify Certificate" })] }), verified && studentData && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "success-box", children: [_jsx("div", { className: "success-icon", children: "\u2713" }), _jsx("p", { className: "success-message", children: "This certificate is authentic and has been verified." })] }), _jsxs("div", { className: "student-details-box", children: [_jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Student Name:" }), _jsx("span", { className: "detail-value", children: studentData.name || studentData.studentName || "N/A" })] }), _jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Course:" }), _jsx("span", { className: "detail-value", children: studentData.course || studentData.courseName || "N/A" })] }), _jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Date of Birth:" }), _jsx("span", { className: "detail-value", children: studentData.dob || "N/A" })] }), _jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Father's Name:" }), _jsx("span", { className: "detail-value", children: studentData.fatherName || "N/A" })] }), _jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Center Name:" }), _jsx("span", { className: "detail-value", children: studentData.centerName || studentData.franchiseName || "N/A" })] }), _jsxs("div", { className: "detail-item", children: [_jsx("span", { className: "detail-label", children: "Session:" }), _jsx("span", { className: "detail-value", children: studentData.session
                                                ? studentData.session
                                                : (studentData.sessionFrom && studentData.sessionTo
                                                    ? `${studentData.sessionFrom} to ${studentData.sessionTo}`
                                                    : "N/A") })] })] }), _jsx("button", { onClick: handleReset, className: "reset-button", children: "Verify Another Certificate" })] })), _jsx("p", { className: "contact-note", children: "For any issues, please contact the academic office." })] }) }));
};
export default CertificateVerification;
