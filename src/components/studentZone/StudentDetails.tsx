import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/StudentDetails.css";
import { fetchStudentDetails } from "../../services/studentZone";

interface StudentData {
    studentName: string;
    email: string;
    enrollmentId: string;
    fatherName: string;
    motherName: string;
    dob: string;
    centerName: string;
    courseName: string;
    duration: string;
    registrationDate: string;
    session: string;
}

const StudentDetails: React.FC = () => {
    const { encodedEnrollment } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState<StudentData | null>(null);

    useEffect(() => {
        if (!encodedEnrollment) {
            navigate("/student/enrollment");
            return;
        }

        const enrollmentId = atob(encodedEnrollment); // Decode Enrollment No.

        const fetchData = async () => {
            try {
                const data = await fetchStudentDetails(enrollmentId);
                if (data.success) {
                    setStudentData(data.student);
                } else {
                    navigate("/student/enrollment");
                }
            } catch {
                navigate("/student/enrollment");
            }
        };

        fetchData();
    }, [encodedEnrollment, navigate]);

    const handlePrint = () => {
        window.print();
    };

    if (!studentData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="student-details-container">
            <h2>🎓 Student Profile</h2>

            <div className="student-info">
                <h3>📌 Profile Information</h3>
                <p><strong>👤 Name:</strong> {studentData.studentName}</p>
                <p><strong>📧 Email:</strong> {studentData.email}</p>
                <p><strong>🆔 Enrollment No:</strong> {studentData.enrollmentId}</p>
                <p><strong>👨‍👩‍👦 Father:</strong> {studentData.fatherName}</p>
                <p><strong>👩 Mother:</strong> {studentData.motherName}</p>
                <p><strong>🎂 DOB:</strong> {studentData.dob}</p>
                <p><strong>🏢 Center:</strong> {studentData.centerName}</p>
            </div>

            <div className="student-info">
                <h3>📚 Course Information</h3>
                <p><strong>📖 Course:</strong> {studentData.courseName}</p>
                <p><strong>⏳ Duration:</strong> {studentData.duration}</p>
                <p><strong>🗓️ Registration Date:</strong> {studentData.registrationDate}</p>
                <p><strong>📅 Session:</strong> {studentData.session}</p>
            </div>

            <button className="print-btn" onClick={handlePrint}>🖨️ Print Details</button>
        </div>
    );
};

export default StudentDetails;
