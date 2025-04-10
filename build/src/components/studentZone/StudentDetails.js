import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/StudentDetails.css";
import { fetchStudentDetails } from "../../services/studentZone";
const StudentDetails = () => {
    const { encodedEnrollment } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
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
                }
                else {
                    navigate("/student/enrollment");
                }
            }
            catch {
                navigate("/student/enrollment");
            }
        };
        fetchData();
    }, [encodedEnrollment, navigate]);
    const handlePrint = () => {
        window.print();
    };
    if (!studentData) {
        return _jsx("p", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "student-details-container", children: [_jsx("h2", { children: "\uD83C\uDF93 Student Profile" }), _jsxs("div", { className: "student-info", children: [_jsx("h3", { children: "\uD83D\uDCCC Profile Information" }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDC64 Name:" }), " ", studentData.studentName] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCE7 Email:" }), " ", studentData.email] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83C\uDD94 Enrollment No:" }), " ", studentData.enrollmentId] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66 Father:" }), " ", studentData.fatherName] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDC69 Mother:" }), " ", studentData.motherName] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83C\uDF82 DOB:" }), " ", studentData.dob] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83C\uDFE2 Center:" }), " ", studentData.centerName] })] }), _jsxs("div", { className: "student-info", children: [_jsx("h3", { children: "\uD83D\uDCDA Course Information" }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCD6 Course:" }), " ", studentData.courseName] }), _jsxs("p", { children: [_jsx("strong", { children: "\u23F3 Duration:" }), " ", studentData.duration] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDDD3\uFE0F Registration Date:" }), " ", studentData.registrationDate] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCC5 Session:" }), " ", studentData.session] })] }), _jsx("button", { className: "print-btn", onClick: handlePrint, children: "\uD83D\uDDA8\uFE0F Print Details" })] }));
};
export default StudentDetails;
