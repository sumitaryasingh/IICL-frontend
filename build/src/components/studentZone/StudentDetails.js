import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { fetchStudentDetails } from "../../services/studentZone";
import "./styles/StudentDetails.css";
const StudentDetails = () => {
    const { enrollmentId } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const cardRef = useRef(null);
    useEffect(() => {
        if (!enrollmentId) {
            navigate("/student/enrollment");
            return;
        }
        const getStudentData = async () => {
            try {
                const res = await fetchStudentDetails(enrollmentId);
                if (res)
                    setStudentData(res);
                else
                    navigate("/student/enrollment");
            }
            catch {
                navigate("/student/enrollment");
            }
        };
        getStudentData();
    }, [enrollmentId, navigate]);
    const handleDownload = async () => {
        if (!cardRef.current)
            return;
        const canvas = await html2canvas(cardRef.current);
        canvas.toBlob((blob) => {
            if (blob)
                saveAs(blob, `Student_${enrollmentId}.png`);
        });
    };
    if (!studentData)
        return _jsx("p", { children: "Loading..." });
    return (_jsx("div", { className: "student-details-page", style: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", margin: "5.5rem" }, children: _jsxs("div", { children: [_jsxs("div", { className: "student-card", ref: cardRef, children: [_jsxs("div", { className: "icon-box", children: [_jsx("img", { src: "/images/iicl-cert-icon.jpg", alt: "iicl icon", className: "iicl-icon" }), _jsxs("p", { children: ["Indian Institute of", _jsx("br", {}), " Computer Literacy"] })] }), _jsxs("div", { className: "student-header", children: [studentData.imageBase64 && (_jsx("img", { src: `data:image/jpeg;base64,${studentData.imageBase64}`, alt: "Student", className: "student-photo" })), _jsxs("div", { className: "student-basic-info", children: [_jsx("h2", { children: studentData.name }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCE7 Email:" }), " ", studentData.email] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83C\uDF93 Enrollment No:" }), " ", studentData.enrollmentId] })] })] }), _jsxs("div", { className: "student-info student-info-section", children: [_jsx("h3", { children: "\uD83D\uDCCC Profile Information" }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66 Father:" }), " ", studentData.fatherName] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDC69 Mother:" }), " ", studentData.motherName] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83C\uDF82 DOB:" }), " ", studentData.dob] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83C\uDFE2 Center ID: " }), studentData.franchiseId] })] }), _jsxs("div", { className: "student-info student-course-section", children: [_jsx("h3", { children: "\uD83D\uDCDA Course Information" }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCD6 Course:" }), " ", studentData.course] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDDD3\uFE0F Registered On:" }), " ", studentData.registrationDate] }), _jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCC5 Session:" }), " ", studentData.sessionFrom, " - ", studentData.sessionTo] })] })] }), _jsx("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" }, children: _jsx("button", { className: "download-btn", onClick: handleDownload, children: "\u2B07\uFE0F Download I Card" }) })] }) }));
};
export default StudentDetails;
