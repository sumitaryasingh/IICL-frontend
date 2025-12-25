import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./styles/Marksheet.module.css";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
const Marksheet = () => {
    const location = useLocation();
    const { student, instituteName, address } = location.state;
    // console.log("this is franchise data", franchiseData);
    const marksheetRef = useRef(null);
    const calculateMarks = (marks) => {
        const totalObtained = marks.reduce((acc, mark) => acc + mark.theoryObtainedMarks + mark.practicalObtainedMarks, 0);
        const totalMax = marks.reduce((acc, mark) => acc + mark.theoryMaxMarks + mark.practicalMaxMarks, 0);
        const percentage = (totalObtained / totalMax) * 100;
        let grade = "";
        if (percentage >= 90)
            grade = "A+";
        else if (percentage >= 80)
            grade = "A";
        else if (percentage >= 70)
            grade = "B+";
        else if (percentage >= 60)
            grade = "B";
        else if (percentage >= 50)
            grade = "C";
        else
            grade = "F";
        return { totalObtained, totalMax, percentage, grade };
    };
    const computedMarks = calculateMarks(student.marks);
    // const todayDate = new Date().getDate();
    // const currentMonth = new Date().getMonth() + 1; // Month is now 1-based.
    // const currentYear = new Date().getFullYear();
    // const certificateIssueDate = `${todayDate}/${currentMonth}/${currentYear}`;
    const qrCodeValue = JSON.stringify({
        // certificateNumber,
        name: student.name,
        enrollmentId: student.enrollmentId,
        course: student.course,
    });
    const handleDownload = async () => {
        if (!marksheetRef.current)
            return;
        const canvas = await html2canvas(marksheetRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "in", [8.5, 11]);
        pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
        pdf.save(`${student.name}_Marksheet.pdf`);
    };
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { ref: marksheetRef, className: styles.marksheet, children: [_jsxs("div", { className: styles.header, children: [_jsx("img", { src: "/images/iicl-cert-icon.jpg", className: styles.institute_icon, alt: "IICL Logo" }), _jsxs("p", { children: ["Indian Institute of", _jsx("br", {}), " Computer Literacy"] })] }), _jsxs("div", { className: styles.certifications, children: [_jsx("p", { className: styles.welfareLine, children: "A Unit of WMR Educational and Social Welfare Trust" }), "Registered under MSME Govt. of India", _jsx("br", {}), "Registered under NITI Ayog Govt. of India", _jsx("br", {}), "( An ISO 9001 : 2015 Certified )", _jsx("div", { className: styles.qrCode, children: _jsx(QRCodeCanvas, { value: qrCodeValue, size: 70 }) }), _jsxs("div", { className: styles.issuedDate, children: [_jsx("b", { children: "Issued on: " }), " ", _jsx("span", { children: student.issueDate })] })] }), _jsx("p", { className: styles.title, children: "Marksheet" }), _jsx("div", { className: styles.details, children: _jsx("table", { className: styles.detailsTable, children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Name:" }) }), _jsx("td", { children: student.name })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Enrollment No:" }) }), _jsx("td", { children: student.enrollmentId })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Certificate No:" }) }), _jsx("td", { children: (() => {
                                                    const parts = student.enrollmentId.split("-");
                                                    return parts.length === 4
                                                        ? `${parts[0]}-${parts[2]}-${parts[3]}`
                                                        : student.enrollmentId;
                                                })() })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Course:" }) }), _jsx("td", { className: styles.courseName, children: student.course })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "S/O, D/O, H/O, W/O:" }) }), _jsx("td", { children: student.fatherName })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Mother's Name:" }) }), _jsx("td", { children: student.motherName })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Institute:" }) }), _jsxs("td", { children: [instituteName, ", ", address] })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Registration No:" }) }), _jsx("td", { children: student.registrationId })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Total Marks:" }) }), _jsxs("td", { children: [computedMarks.totalObtained, " out of ", computedMarks.totalMax] })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Percentage:" }) }), _jsxs("td", { children: [computedMarks.percentage.toFixed(2), "%"] })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: "Grade:" }) }), _jsx("td", { children: computedMarks.grade })] })] }) }) }), _jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.marksTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Subject" }), _jsx("th", { children: "Theory (Max)" }), _jsx("th", { children: "Lab (Max)" }), _jsx("th", { children: "Total (Max)" }), _jsx("th", { children: "Theory (Obtained)" }), _jsx("th", { children: "Lab (Obtained)" }), _jsx("th", { children: "Total (Obtained)" })] }) }), _jsx("tbody", { children: student.marks?.map((mark, index) => (_jsxs("tr", { children: [_jsx("td", { children: mark.subject }), _jsx("td", { children: mark.theoryMaxMarks }), _jsx("td", { children: mark.practicalMaxMarks }), _jsx("td", { children: mark.theoryMaxMarks + mark.practicalMaxMarks }), _jsx("td", { children: mark.theoryObtainedMarks }), _jsx("td", { children: mark.practicalObtainedMarks }), _jsx("td", { children: mark.theoryObtainedMarks + mark.practicalObtainedMarks })] }, index))) })] }) }), _jsxs("div", { className: styles.performanceCriteria, children: [_jsxs("table", { className: styles.criteriaTable, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Grade" }), _jsx("th", { children: "A+" }), _jsx("th", { children: "A" }), _jsx("th", { children: "B+" }), _jsx("th", { children: "B" }), _jsx("th", { children: "C" }), _jsx("th", { children: "F" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: "Percentage Range" }), _jsx("td", { children: "90% - 100%" }), _jsx("td", { children: "80% - 89%" }), _jsx("td", { children: "70% - 79%" }), _jsx("td", { children: "60% - 69%" }), _jsx("td", { children: "50% - 59%" }), _jsx("td", { children: "Below 50%" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Performance" }), _jsx("td", { children: "Excellent" }), _jsx("td", { children: "Very Good" }), _jsx("td", { children: "Good" }), _jsx("td", { children: "Satisfactory" }), _jsx("td", { children: "Needs Improvement" }), _jsx("td", { children: "Fail" })] })] })] }), _jsxs("div", { className: styles.certifiedLogo, children: [_jsx("img", { src: "/images/isoLogo.jpg", alt: "ISO Logo", className: styles.isoLogo }), _jsx("img", { src: "/images/iafLogo.svg", alt: "IAF Logo", className: styles.iafLogo }), _jsx("img", { src: "/images/msmeLogo.jpg", alt: "MSME Logo", className: styles.msmeLogo })] }), _jsxs("div", { className: styles.authBox, children: [_jsxs("span", { className: styles.authStamp, children: [" ", _jsx("img", { src: "/images/authStamp.png", alt: "" }), " "] }), _jsxs("span", { className: styles.authSignature, children: [" ", _jsx("img", { src: "/images/authSign.png", alt: "" }), " "] })] }), _jsx("div", { className: styles.authSignLine }), _jsx("span", { className: styles.authSign, children: "Auth Sign." })] })] }), _jsx("button", { onClick: handleDownload, className: styles.downloadBtn, children: "Download PDF" })] }));
};
export default Marksheet;
