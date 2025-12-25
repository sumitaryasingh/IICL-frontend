import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState, useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./styles/Certificate.module.css";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
const Certificate = () => {
    const location = useLocation();
    const { student, instituteName, address } = location.state;
    if (!student)
        return _jsx("p", { children: "Loading..." });
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
    const certificateRef = useRef(null);
    const [imageError, setImageError] = useState(false);
    // Mapping for course to QR image URLs
    const courseImages = {
        dca: "/images/dca.png",
        adca: "/images/adca.png",
        adfa: "/images/adfa.png",
        tally: "/images/tally.png",
        dfa: "/images/dfa.png",
        dtp: "/images/dtp.png"
    };
    const courseAbbr = student.course.split("(")[0].trim().toLowerCase();
    const hasCourseLogo = courseAbbr && courseImages[courseAbbr];
    const CourseImageSrc = hasCourseLogo ? courseImages[courseAbbr] : "/images/adca.png";
    const convertBufferToBase64 = (buffer) => {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    const renderStudentImage = (student) => {
        const stu = student; // cast to any so that image property is accessible
        if (stu.image && stu.image.data) {
            const base64Image = typeof stu.image.data === "string"
                ? stu.image.data
                : convertBufferToBase64(stu.image.data);
            return (_jsx("img", { src: `data:${stu.image.contentType};base64,${base64Image}`, alt: student.name, className: styles.student_img }));
        }
        return "No Image";
    };
    const handleDownload = useCallback(async () => {
        if (!certificateRef.current)
            return;
        try {
            const canvas = await html2canvas(certificateRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("landscape", "in", [11, 8.5]);
            pdf.addImage(imgData, "PNG", 0, 0, 11, 8.5);
            pdf.save(`${student.name}_Certificate.pdf`);
        }
        catch (error) {
            console.error("Error generating PDF:", error);
        }
    }, [student]);
    // const todayDate = new Date().getDate();
    // const currentMonth = new Date().getMonth() + 1; // Month is now 1-based.
    // const currentYear = new Date().getFullYear();
    // const certificateIssueDate = `${todayDate}/${currentMonth}/${currentYear}`;
    const computedMarks = calculateMarks(student.marks);
    const qrCodeValue = JSON.stringify({
        // certificateNumber,
        name: student.name,
        enrollmentId: student.enrollmentId,
        course: student.course,
    });
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { ref: certificateRef, className: styles.certificate, children: [_jsxs("div", { className: styles.header, children: [_jsxs("div", { className: styles.student_img_box, children: [_jsx("div", { children: renderStudentImage(student) }), _jsxs("p", { className: styles.enrollment, children: ["Enrollment No. : ", _jsx("strong", { children: student.enrollmentId })] })] }), _jsxs("div", { className: styles.institue_box, children: [_jsxs("div", { className: styles.iconBox, children: [_jsx("img", { src: "/images/iicl-cert-icon.jpg", className: styles.institute_icon, alt: "IICL Logo" }), _jsxs("p", { children: ["Indian Institute of", _jsx("br", {}), " Computer Literacy"] })] }), _jsxs("div", { className: styles.certifications, children: [_jsx("p", { children: "A Unit of WMR Educational and Social Welfare Trust" }), "Registered under MSME Govt. of India", _jsx("br", {}), "Registered under NITI Ayog Govt. of India", _jsx("br", {}), "( An ISO 9001 : 2015 Certified )"] })] }), _jsxs("div", { className: styles.qr_code_box, children: [hasCourseLogo && !imageError ? (_jsx("img", { src: CourseImageSrc, alt: "Course Logo", className: styles.certificate_qr, onError: () => setImageError(true) })) : (_jsx("div", { className: styles.courseNameFallback, children: _jsx("p", { className: styles.courseNameText, children: courseAbbr.toUpperCase() }) })), _jsxs("p", { className: styles.certificate_no, children: ["Certificate No. :", " ", _jsx("strong", { children: (() => {
                                                    const parts = student.enrollmentId.split("-");
                                                    return parts.length === 4
                                                        ? `${parts[0]}-${parts[2]}-${parts[3]}`
                                                        : student.enrollmentId;
                                                })() })] })] }), _jsx("div", { className: styles.title_box, children: _jsx("h1", { className: styles.title, children: "Certificate" }) })] }), _jsx("span", { className: styles.copyright, children: _jsx("img", { src: "/images/iicl-iconT.png", className: styles.institute_icon, alt: "IICL Logo" }) }), _jsx("div", { className: styles.subtitle, children: _jsx("p", { children: "This Certificate is Proudly Presented To" }) }), _jsx("h2", { className: styles.studentName, children: student.name }), _jsxs("div", { className: styles.courseName, children: [_jsx("p", { children: "for successfully completing" }), _jsx("p", { children: student.course })] }), _jsxs("p", { className: styles.institute, children: ["Father's/ Husband's name", _jsx("span", { children: student.fatherName }), student.dob && _jsxs(_Fragment, { children: ["Date of Birth", _jsx("span", { children: student.dob })] }), _jsx("br", {}), "Learning at ", _jsxs("strong", { children: [instituteName, ", ", address] }), _jsx("br", {}), "Achieved ", _jsxs("span", { children: [computedMarks.percentage.toFixed(2), "%"] }), " marks and secured ", _jsx("span", { children: computedMarks.grade }), " Grade", _jsx("br", {}), "on ", _jsx("strong", { children: student.issueDate })] }), _jsx("span", { className: styles.qrCode, children: _jsx(QRCodeCanvas, { value: qrCodeValue, size: 80 }) }), _jsxs("p", { className: styles.certificationsLogos, children: [_jsx("img", { src: "/images/iafLogo.svg", alt: "IAF Logo" }), _jsx("img", { src: "/images/isoLogo1.jpg", alt: "ISO Logo" }), _jsx("img", { src: "/images/msmeLogo.jpg", alt: "MSME Logo" })] }), _jsx("span", { className: styles.authSignature, children: "Auth. Sign" }), _jsxs("span", { className: styles.authStamp, children: [" ", _jsx("img", { src: "/images/authStamp.png", alt: "" }), " "] }), _jsxs("span", { className: styles.authSign, children: [" ", _jsx("img", { src: "/images/authSign.png", alt: "" }), " "] }), _jsx("span", { className: styles.centreSignature, children: "Centre Director Sign" })] }), _jsx("button", { onClick: handleDownload, className: styles.downloadBtn, children: "Download PDF" })] }));
};
export default Certificate;
