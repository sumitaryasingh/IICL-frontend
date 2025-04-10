import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/StudentEnrollment.css";
import { fetchStudentDetails } from "../../services/studentZone";
const StudentEnrollment = () => {
    const [enrollmentId, setEnrollmentId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await fetchStudentDetails(enrollmentId);
            if (data.success) {
                const encodedEnrollment = btoa(enrollmentId); // Encode Enrollment No.
                navigate(`/student/details/${encodedEnrollment}`);
            }
            else {
                toast.error("❌ Student not found! Please check the enrollment number.");
            }
        }
        catch {
            toast.error("⚠️ Error fetching student details. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "enrollment-container", children: [_jsx("h2", { children: "\uD83D\uDD0D Student Enrollment Lookup" }), _jsxs("form", { onSubmit: handleSubmit, className: "enrollment-form", children: [_jsx("input", { type: "text", placeholder: "Enter Enrollment Number", value: enrollmentId, onChange: (e) => setEnrollmentId(e.target.value), required: true, className: "enrollment-input" }), _jsx("button", { type: "submit", className: "submit-btn", disabled: loading, children: loading ? "🔄 Searching..." : "📄 Fetch Details" })] })] }));
};
export default StudentEnrollment;
