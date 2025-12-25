import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkStudentExistsOrNot } from "../../services/studentZone";
import "./styles/StudentEnrollment.css";
const StudentEnrollment = () => {
    const [enrollmentId, setEnrollmentId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!enrollmentId.trim())
            return;
        setLoading(true);
        try {
            const exists = await checkStudentExistsOrNot(enrollmentId.trim());
            if (exists) {
                // const encoded = btoa(enrollmentId.trim());
                navigate(`/student/details/${enrollmentId}`);
            }
            else {
                toast.error("❌ Student not found. Please check the enrollment number.");
            }
        }
        catch {
            toast.error("⚠️ Unable to verify student. Try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "enrollment-container", children: [_jsx("h2", { children: "\uD83D\uDD0D Student Enrollment Lookup" }), _jsxs("form", { onSubmit: handleSubmit, className: "enrollment-form", children: [_jsx("input", { type: "text", placeholder: "Enter Enrollment Number", value: enrollmentId, onChange: (e) => setEnrollmentId(e.target.value), className: "enrollment-input", required: true }), _jsx("button", { type: "submit", className: "submit-btn", disabled: loading, children: loading ? "🔄 Checking..." : "📄 Fetch Details" })] })] }));
};
export default StudentEnrollment;
