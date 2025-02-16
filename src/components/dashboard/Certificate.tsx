import React, { useEffect, useRef, useState, useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./styles/Certificate.module.css";
import { useLocation } from "react-router-dom";

interface StudentData {
  name: string;
  course: string;
  institute: string;
  location: string;
  marks: number;
  grade: string;
  date: string;
  rollNumber: string;
  certificateNumber: string;
  organization: string;
  fatherName: string;
  motherName: string;
}

interface LocationState {
  student: StudentData;
}

const Certificate: React.FC = () => {
  const location = useLocation();
  const { student } = location.state as LocationState;
  const certificateRef = useRef<HTMLDivElement>(null);

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

  if (!student) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div ref={certificateRef} className={styles.certificate}>
        {/* Certificate Header */}
        <div className={styles.header}>
          <div className={styles.student_img_box}>
            <img
              src="/images/student1.png"
              className={styles.student_img}
              alt="Student"
            />
            <p className={styles.enrollment}>
              Enrollment No. : <strong>{student.rollNumber}</strong>
            </p>
          </div>

          <div className={styles.institue_box}>
            <div>
              <img
                src="/images/iicl-iconT.png"
                className={styles.institute_icon}
                alt="IICL Logo"
              />
            </div>
            <div className={styles.certifications}>
              Incorporated Under Section 8, Ministry of Corporate Affairs &amp; Ministry of Labour, Govt. of India  
              Registered Under The Ordinance of Govt. of India  
              Registered Under NITI Aayog, Govt. of India  
              <br />
              ISO 9001 : 2015 Certified.
            </div>
          </div>

          <div className={styles.qr_code_box}>
            <img
              src="/images/dca.png"
              alt="QR Code"
              className={styles.certificate_qr}
            />
            <p className={styles.certificate_no}>
              Certificate No. : <strong>{student.certificateNumber}</strong>
            </p>
          </div>

          <div className={styles.title_box}>
            <h1 className={styles.title}>Certificate</h1>
          </div>
        </div>
        <span className={styles.copyright}>
          <img
            src="/images/iicl-iconT.png"
            className={styles.institute_icon}
            alt="IICL Logo"
          />
        </span>
        <div className={styles.subtitle}>
          <p>This Certificate is Proudly Presented To</p>
        </div>
        
        <h2 className={styles.studentName}>{student.name}</h2>

        <p className={styles.institute}>
           Father's/ Husband's name<span>{student.fatherName}</span>
           Mother's name<span>{student.motherName}</span>
           <br />
           Learning at <strong>{student.institute}, {student.location}</strong>
           <br />
           Achieved <span>{student.marks}%</span> marks and secured <span>{student.grade}</span> Grade
           <br />
           on <strong>{student.date}</strong>
        </p>
        
        <span className={styles.qrCode}>
          <img src="/images/dummy_qr.png" alt="QR" />
        </span>
        <p className={styles.certificationsLogos}>
          <img src="/images/iafLogo.svg" alt="IAF Logo" />
          <img src="/images/isoLogo1.jpg" alt="ISO Logo" />
          <img src="/images/msmeLogo.jpg" alt="MSME Logo" />
        </p>
        <span className={styles.authSignature}>Auth. Sign</span>
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
