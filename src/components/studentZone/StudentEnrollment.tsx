import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/studentEnrollment.css";
import { fetchStudentDetails } from "../../services/studentZone";

const StudentEnrollment: React.FC = () => {
    const [enrollmentNo, setEnrollmentNo] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await fetchStudentDetails(enrollmentNo);

            if (data.success) {
                const encodedEnrollment = btoa(enrollmentNo); // Encode Enrollment No.
                navigate(`/student/details/${encodedEnrollment}`);
            } else {
                toast.error("❌ Student not found! Please check the enrollment number.");
            }
        } catch {
            toast.error("⚠️ Error fetching student details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="enrollment-container">
            <h2>🔍 Student Enrollment Lookup</h2>
            <form onSubmit={handleSubmit} className="enrollment-form">
                <input
                    type="text"
                    placeholder="Enter Enrollment Number"
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                    required
                    className="enrollment-input"
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "🔄 Searching..." : "📄 Fetch Details"}
                </button>
            </form>
        </div>
    );
};

export default StudentEnrollment;
