import React, { useEffect, useRef, useState, useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./styles/Certificate.module.css";
import { useLocation } from "react-router-dom";
import { StudentData } from "../../services/studentService";
import {QRCodeCanvas}  from "qrcode.react";

interface IMark {
  subject: string;
  theoryMaxMarks: number;
  theoryObtainedMarks: number;
  practicalMaxMarks: number;
  practicalObtainedMarks: number;
}

export interface IStudent {
  name: string;
  enrollmentId: string;
  certificateNumber: string;
  course: string;
  fatherName: string;
  motherName: string;
  institute: string;
  location: string;
  registrationId: string;
  marks: IMark[];
  // Optional image property, if available:
  image?: {
    data: any;
    contentType: string;
  };
}

interface LocationState {
  student: IStudent;
  instituteName: string;
  address: string;
  registrationId: string;
}

const Certificate: React.FC = () => {
  const location = useLocation();
  const { student, instituteName, address } = location.state as LocationState;
  if (!student) return <p>Loading...</p>;

  const calculateMarks = (marks: IMark[]) => {
    const totalObtained = marks.reduce(
      (acc, mark) => acc + mark.theoryObtainedMarks + mark.practicalObtainedMarks,
      0
    );
    const totalMax = marks.reduce(
      (acc, mark) => acc + mark.theoryMaxMarks + mark.practicalMaxMarks,
      0
    );
    const percentage = (totalObtained / totalMax) * 100;
    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B+";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else grade = "F";
    return { totalObtained, totalMax, percentage, grade };
  };

  const certificateRef = useRef<HTMLDivElement>(null);

  // Mapping for course to QR image URLs
  const courseImages: { [key: string]: string } = {
    dca: "/images/dca.png",
    adca: "/images/adca.png",
    adfa: "/images/adfa.png",
    tally:"/images/tally.png",
    dfa:"/images/dfa.png",
    dtp:"/images/dtp.png"
  };

  const courseAbbr = student.course.split("(")[0].trim().toLowerCase();
  const CourseImageSrc =
    student.course && courseAbbr ? courseImages[courseAbbr] : "/images/adca.png";

  const convertBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const renderStudentImage = (student: IStudent) => {
    const stu = student as any; // cast to any so that image property is accessible
    if (stu.image && stu.image.data) {
      const base64Image =
        typeof stu.image.data === "string"
          ? stu.image.data
          : convertBufferToBase64(stu.image.data);
      return (
        <img
          src={`data:${stu.image.contentType};base64,${base64Image}`}
          alt={student.name}
          className={styles.student_img}
        />
      );
    }
    return "No Image";
  };

  const handleDownload = useCallback(async () => {
    if (!certificateRef.current) return;
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "in", [11, 8.5]);
      pdf.addImage(imgData, "PNG", 0, 0, 11, 8.5);
      pdf.save(`${student.name}_Certificate.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }, [student]);

  const todayDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1; // Month is now 1-based.
  const currentYear = new Date().getFullYear();
  const certificateIssueDate = `${todayDate}/${currentMonth}/${currentYear}`;

  const computedMarks = calculateMarks(student.marks);
  const qrCodeValue = JSON.stringify({
    // certificateNumber,
    name: student.name,
    enrollmentId: student.enrollmentId,
    course: student.course,
  });

  return (
    <div className={styles.container}>
      <div ref={certificateRef} className={styles.certificate}>
        {/* Certificate Header */}
        <div className={styles.header}>
          <div className={styles.student_img_box}>
            <div>{renderStudentImage(student)}</div>
            <p className={styles.enrollment}>
              Enrollment No. : <strong>{student.enrollmentId}</strong>
            </p>
          </div>
          <div className={styles.institue_box}>
            <div className={styles.iconBox}>
              <img src="/images/iicl-cert-icon.jpg" className={styles.institute_icon} alt="IICL Logo" />
              <p>Indian Institute of<br /> Computer Literacy</p>
            </div>
            <div className={styles.certifications}>
              <p>A Unit of WMR Educational and Social Welfare Trust</p>
              Registered under MSME Govt. of India
              <br /> 
              Registered under NITI Ayog Govt. of India 
              <br />
               ( An ISO 9001 : 2015 Certified )
            </div>
          </div>
          <div className={styles.qr_code_box}>
            <img src={CourseImageSrc} alt="Course Logo" className={styles.certificate_qr} />
            <p className={styles.certificate_no}>
              Certificate No. :{" "}
              <strong>
                {(() => {
                  const parts = student.enrollmentId.split("-");
                  return parts.length === 4
                    ? `${parts[0]}-${parts[2]}-${parts[3]}`
                    : student.enrollmentId;
                })()}
              </strong>
            </p>
          </div>
          <div className={styles.title_box}>
            <h1 className={styles.title}>Certificate</h1>
          </div>
        </div>
        <span className={styles.copyright}>
          <img src="/images/iicl-iconT.png" className={styles.institute_icon} alt="IICL Logo" />
        </span>
        <div className={styles.subtitle}>
          <p>This Certificate is Proudly Presented To</p>
        </div>
        <h2 className={styles.studentName}>{student.name}</h2>
        <div className={styles.courseName}>
          <p>for successfully completing</p>
          <p>{student.course}</p>
        </div>
        <p className={styles.institute}>
          Father's/ Husband's name<span>{student.fatherName}</span>
          Mother's name<span>{student.motherName}</span>
          <br />
          Learning at <strong>{instituteName}, {address}</strong>
          <br />
          Achieved <span>{computedMarks.percentage.toFixed(2)}%</span> marks and secured <span>{computedMarks.grade}</span> Grade
          <br />
          on <strong>{certificateIssueDate}</strong>
        </p>
        <span className={styles.qrCode}>
          <QRCodeCanvas value={qrCodeValue} size={80} />
        </span>
        <p className={styles.certificationsLogos}>
          <img src="/images/iafLogo.svg" alt="IAF Logo" />
          <img src="/images/isoLogo1.jpg" alt="ISO Logo" />
          <img src="/images/msmeLogo.jpg" alt="MSME Logo" />
        </p>
        <span className={styles.authSignature}>Auth. Sign</span>
        <span className={styles.authStamp}> <img src="/images/authStamp.png" alt="" /> </span>
        <span className={styles.authSign}> <img src="/images/authSign.png" alt="" /> </span>
        <span className={styles.centreSignature}>Centre Director Sign</span>
      </div>
      {/* Download Button */}
      <button onClick={handleDownload} className={styles.downloadBtn}>
        Download PDF
      </button>
    </div>
  );
};

export default Certificate;
