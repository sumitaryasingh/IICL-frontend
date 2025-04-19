import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { fetchStudentDetails } from "../../services/studentZone";
import "./styles/StudentDetails.css";

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
  sessionFrom: string;
  sessionTo: string;
  imageBase64?: string;
  franchiseId: string;
}

const StudentDetails: React.FC = () => {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enrollmentId) {
      navigate("/student/enrollment");
      return;
    }

    const getStudentData = async () => {
      try {
        const res = await fetchStudentDetails(enrollmentId);
        if (res) setStudentData(res);
        else navigate("/student/enrollment");
      } catch {
        navigate("/student/enrollment");
      }
    };

    getStudentData();
  }, [enrollmentId, navigate]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, `Student_${enrollmentId}.png`);
    });
  };

  if (!studentData) return <p>Loading...</p>;

  return (
    <div className="student-details-page" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <div>
      <div className="student-card" ref={cardRef}>

        <div className="student-header">
          {studentData.imageBase64 && (
            <img
              src={`data:image/jpeg;base64,${studentData.imageBase64}`}
              alt="Student"
              className="student-photo"
            />
          )}

          <div className="student-basic-info">
            <h2>{studentData.studentName}</h2>
            <p><strong>🎓 Enrollment No:</strong> {studentData.enrollmentId}</p>
            <p><strong>📧 Email:</strong> {studentData.email}</p>
          </div>
        </div>

        <div className="student-info-section">
          <h3>📌 Profile Information</h3>
          <p><strong>👨‍👩‍👦 Father:</strong> {studentData.fatherName}</p>
          <p><strong>👩 Mother:</strong> {studentData.motherName}</p>
          <p><strong>🎂 DOB:</strong> {studentData.dob}</p>
          <p><strong>🏢 Center Id:</strong> {studentData.franchiseId}</p>
        </div>

        <div className="student-course-section">
          <h3>📚 Course Information</h3>
          <p><strong>📖 Course:</strong> {studentData.courseName}</p>
          <p><strong>🗓️ Registered On:</strong> {studentData.registrationDate}</p>
          <p><strong>📅 Session:</strong> {studentData.sessionFrom} - {studentData.sessionTo}</p>
        </div>
      </div>
        
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <button className="download-btn" onClick={handleDownload}>
        ⬇️ Download I Card
      </button>
      </div>
      </div>
    </div>
  );
};

export default StudentDetails;
