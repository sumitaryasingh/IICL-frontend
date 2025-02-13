import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./styles/Certificate.module.css"; // Importing CSS Module

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
}

interface CertificateProps {
  student: StudentData;
}

const Certificate: React.FC<CertificateProps> = ({ student }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "in", [11, 8.5]);
    pdf.addImage(imgData, "PNG", 0, 0, 11, 8.5); // Adjust positioning and size
    pdf.save(`${student.name}_Certificate.pdf`);
  };

  return (
    <div className={styles.container}>
      <div ref={certificateRef} className={styles.certificate}>
        {/* Certificate Header */}
        <div className={styles.header}>
          <div className={styles.student_img_box}>
            <img src="../images/student1.png" className={styles.student_img} alt="" />
            <p className={styles.enrollment}>Enrollment No. : <strong>{student.rollNumber}</strong></p>
          </div>

          <div className={styles.institue_box}>
            <div>
             <img src="../images/iicl-iconT.png" className={styles.institute_icon} alt="" />
            </div>
            <div className={styles.certifications}>
              Incorporated Under Section 8,Ministry of Corporate Affairs & Ministry of Labour, Govt. of India
              Registered Under The Ordinance of Govt. fo India
              Registered Under NITI Aayog, Govt. of India
              <br />
              ISO 9001 : 2015 Certified.
            </div>
          </div>

          <div className={styles.qr_code_box}>
            <img src="../images/dca.png" alt="qr code" className={styles.certificate_qr} />
            <p className={styles.certificate_no}>Certificate No. : <strong>{student.certificateNumber}</strong></p>
          </div>

          <div className={styles.title_box}>
            <h1 className={styles.title}>Certificate</h1>
          </div>
        </div>
        <span className={styles.copyright}>
          IICL
        </span>
        <div className={styles.subtitle}>
          <p>This Certificate is Proudly Presented To</p>
        </div>
        
        <h2 className={styles.studentName}>{student.name}</h2>

        <p className={styles.institute}>
           Father's/ Husband's name <span> Javed Chaurasiya </span>
           Mother's name<span> Shaimun Nisha </span> 
           <br />
           Learning at <strong> {student.institute}, {student.location}</strong>
           <br />
           Achieved<span>{student.marks}%</span>marks and secured <span>{student.grade}</span> Grade
           <br />
           on <strong> {student.date} </strong>
        </p>
         <span className={styles.qrCode}>
          <img src="../images/dummy_qr.png" alt="" />
         </span>
        <p className={styles.certificationsLogos}>
          <img src="../images/iafLogo.svg" alt="" />
          <img src="../images/isoLogo1.jpg" alt="" />
          <img src="../images/msmeLogo.jpg" alt="" />
        </p>
        <span className={styles.authSignature}>
          Auth. Sign
        </span>
        <span className={styles.centreSignature}>
          Centre Director Sign
        </span>
      </div>
      {/* Download Button */}
      <button onClick={handleDownload} className={styles.downloadBtn}>
        Download PDF
      </button>
    </div>
  );
};

export default Certificate;
