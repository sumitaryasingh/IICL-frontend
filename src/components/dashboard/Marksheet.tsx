import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./styles/Marksheet.module.css";
import { useLocation } from "react-router-dom";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { QRCodeCanvas } from "qrcode.react";

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
  issueDate:string;
}

interface LocationState {
  student: IStudent;
  instituteName: string;
  address: string;
  registrationId:string;
}



const Marksheet: React.FC = () => {
  const location = useLocation();
  const { student, instituteName, address} = location.state as LocationState;

  // console.log("this is franchise data", franchiseData);
  const marksheetRef = useRef<HTMLDivElement>(null);

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
    if (!marksheetRef.current) return;
    const canvas = await html2canvas(marksheetRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "in", [8.5, 11]);
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save(`${student.name}_Marksheet.pdf`);
  };



  return (
    <div className={styles.container}>
      <div ref={marksheetRef} className={styles.marksheet}>

        {/* Header */}
        <div className={styles.header}>
          <img src="/images/iicl-cert-icon.jpg" className={styles.institute_icon} alt="IICL Logo" />
          <p>Indian Institute of<br /> Computer Literacy</p>
        </div>

        <div className={styles.certifications}>
        <p className={styles.welfareLine}>A Unit of WMR Educational and Social Welfare Trust</p>
          Registered under MSME Govt. of India
          <br />
          Registered under NITI Ayog Govt. of India
          <br />
          ( An ISO 9001 : 2015 Certified )
          <div className={styles.qrCode}>
              <QRCodeCanvas value={qrCodeValue} size={70} />
          </div>
          <div className={styles.issuedDate}>
            <b>Issued on: </b> <span>{student.issueDate}</span>
          </div>
        </div>
        <p className={styles.title}>Marksheet</p>
        {/* Student Details */}
        <div className={styles.details}>
          <table className={styles.detailsTable}>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{student.name}</td>
              </tr>
              <tr>
                <td><strong>Enrollment No:</strong></td>
                <td>{student.enrollmentId}</td>
              </tr>
              <tr>
                <td><strong>Certificate No:</strong></td>
                <td>
                  {(() => {
                    const parts = student.enrollmentId.split("-");
                    return parts.length === 4
                      ? `${parts[0]}-${parts[2]}-${parts[3]}`
                      : student.enrollmentId;
                  })()}
                </td>
              </tr>
              <tr>
                <td><strong>Course:</strong></td>
                <td className={styles.courseName}>{student.course}</td>
              </tr>
              <tr>
                <td><strong>S/O, D/O, H/O, W/O:</strong></td>
                <td>{student.fatherName}</td>
              </tr>
              <tr>
                <td><strong>Mother's Name:</strong></td>
                <td>{student.motherName}</td>
              </tr>
              <tr>
                <td><strong>Institute:</strong></td>
                <td>{instituteName}, {address}</td>
              </tr>
              <tr>
                <td><strong>Registration No:</strong></td>
                <td>{student.registrationId}</td>
              </tr>
              <tr>
                <td><strong>Total Marks:</strong></td>
                <td>{computedMarks.totalObtained} out of {computedMarks.totalMax}</td>
              </tr>
              <tr>
                <td><strong>Percentage:</strong></td>
                <td>{computedMarks.percentage.toFixed(2)}%</td>
              </tr>
              <tr>
                <td><strong>Grade:</strong></td>
                <td>{computedMarks.grade}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Marks Table */}
        <div className={styles.tableContainer}>
          <table className={styles.marksTable}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Theory (Max)</th>
                <th>Lab (Max)</th>
                <th>Total (Max)</th>
                <th>Theory (Obtained)</th>
                <th>Lab (Obtained)</th>
                <th>Total (Obtained)</th>
              </tr>
            </thead>
            <tbody>
              {student.marks?.map((mark, index) => (
                <tr key={index}>
                  <td>{mark.subject}</td>
                  <td>{mark.theoryMaxMarks}</td>
                  <td>{mark.practicalMaxMarks}</td>
                  <td>{mark.theoryMaxMarks + mark.practicalMaxMarks}</td>
                  <td>{mark.theoryObtainedMarks}</td>
                  <td>{mark.practicalObtainedMarks}</td>
                  <td>{mark.theoryObtainedMarks + mark.practicalObtainedMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.performanceCriteria}>
          <table className={styles.criteriaTable}>
            <thead>
              <tr>
                <th>Grade</th>
                <th>A+</th>
                <th>A</th>
                <th>B+</th>
                <th>B</th>
                <th>C</th>
                <th>F</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Percentage Range</td>
                <td>90% - 100%</td>
                <td>80% - 89%</td>
                <td>70% - 79%</td>
                <td>60% - 69%</td>
                <td>50% - 59%</td>
                <td>Below 50%</td>
              </tr>
              <tr>
                <td>Performance</td>
                <td>Excellent</td>
                <td>Very Good</td>
                <td>Good</td>
                <td>Satisfactory</td>
                <td>Needs Improvement</td>
                <td>Fail</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.certifiedLogo}>
            <img src="/images/isoLogo.jpg" alt="ISO Logo" className={styles.isoLogo} />
            <img src="/images/iafLogo.svg" alt="IAF Logo" className={styles.iafLogo} />
            <img src="/images/msmeLogo.jpg" alt="MSME Logo" className={styles.msmeLogo} />
          </div>
          <div className={styles.authBox}>
          <span className={styles.authStamp}> <img src="/images/authStamp.png" alt="" /> </span>
          <span className={styles.authSignature}> <img src="/images/authSign.png" alt="" /> </span>
          </div>
          <div className={styles.authSignLine}>
          </div>
          <span className={styles.authSign}>Auth Sign.</span>
        </div>
      </div>
      {/* Download Button */}
      <button onClick={handleDownload} className={styles.downloadBtn}>
        Download PDF
      </button>
    </div>
  );
};

export default Marksheet;
