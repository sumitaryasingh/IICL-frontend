import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./styles/Marksheet.module.css";

// Optional: Extend the student interface with subject marks details.
interface Subject {
  subject: string;
  theory: number;
  obtainedTheory: number;
  lab: number;
  obtainedLab: number;
  totalMarks: number;
  obtainedTotal: number;
}


export interface StudentData {
  name: string;
  enrollmentNumber: string;
  certificateNumber: string;
  course: string;
  fatherName: string;
  motherName: string;
  institute: string;
  location: string;
  registrationNumber: string;
  marks: number;       // Total marks obtained
  percentage: number;
  grade: string;
  subjects: Subject[]; // Array of subject marks details
}

interface MarksheetProps {
  student: StudentData;
}

const Marksheet: React.FC<MarksheetProps> = ({ student }) => {
  const marksheetRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!marksheetRef.current) return;

    // Render the marksheet DOM to a canvas
    const canvas = await html2canvas(marksheetRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create a new PDF document in portrait mode with dimensions 8.5" x 11"
    const pdf = new jsPDF("p", "in", [8.5, 11]);
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save(`${student.name}_Marksheet.pdf`);
  };

  return (
    <div className={styles.container}>
      <div ref={marksheetRef} className={styles.marksheet}>

        {/* Header */}
        <div className={styles.header}>
          <img src="../images/iicl-iconT.png" alt="iicl icon" className={styles.iiclLogo} />
        </div>

        <div className={styles.certifications}>

          भारत सरकार के अधिनियम 2013 द्वारा पंजीकृत
          <p>
            Incorporated Under Section 8,Ministry of Corporate Affairs & Ministry of Labour, Govt. of India
            <br />
            Registered Under The Ordinance of Govt. fo India
            <br />
            Registered Under NITI Aayog, Govt. of India
          </p>
          ISO 9001 : 2015 Certified.

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
                <td>{student.enrollmentNumber}</td>
              </tr>
              <tr>
                <td><strong>Certificate No:</strong></td>
                <td>{student.certificateNumber}</td>
              </tr>
              <tr>
                <td><strong >Course:</strong></td>
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
                <td>{student.institute}, {student.location}</td>
              </tr>
              <tr>
                <td><strong>Registration No:</strong></td>
                <td>{student.registrationNumber}</td>
              </tr>
              <tr>
                <td><strong>Total Marks:</strong></td>
                <td>{student.marks} out of 800</td>
              </tr>
              <tr>
                <td><strong>Percentage:</strong></td>
                <td>{student.percentage} %</td>
              </tr>
              <tr>
                <td><strong>Grade:</strong></td>
                <td>{student.grade}</td>
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
              {student.subjects.map((sub, index) => (
                <tr key={index}>
                  <td className={styles.subjects}>{sub.subject}</td>
                  <td>{sub.theory}</td>
                  <td>{sub.lab}</td>
                  <td>{sub.totalMarks}</td>
                  <td>{sub.obtainedTheory}</td>
                  <td>{sub.obtainedLab}</td>
                  <td>{sub.obtainedTotal}</td>
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
            <img src="../images/dummy_qr.png" alt="" className={styles.isoLogo} />
            <img src="../images/isoLogo.jpg" alt="" className={styles.isoLogo} />
            <img src="../images/iafLogo.svg" alt="" className={styles.iafLogo} />
            <img src="../images/msmeLogo.jpg" alt="" className={styles.msmeLogo} />
            {/* <img src="../images/" alt="" /> */}
          </div>
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
