import React, { useState } from "react";
import { toast } from "react-toastify";
import { fetchStudentDetails } from "../../services/studentZone";
import "./styles/CertificateVerification.css";

interface StudentDetails {
  name?: string;
  studentName?: string;
  course?: string;
  courseName?: string;
  dob?: string;
  fatherName?: string;
  centerName?: string;
  franchiseName?: string;
  sessionFrom?: string;
  sessionTo?: string;
  session?: string;
  [key: string]: any; // Allow for additional properties
}

const CertificateVerification: React.FC = () => {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [studentData, setStudentData] = useState<StudentDetails | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId.trim()) {
      toast.error("Please enter an enrollment ID");
      return;
    }

    setLoading(true);
    setVerified(false);
    setStudentData(null);

    try {
      const response = await fetchStudentDetails(enrollmentId.trim());
      
      // Handle different response formats
      let studentDetails: StudentDetails | null = null;
      
      if (response && typeof response === 'object') {
        // Check if response has success and student properties
        if ('success' in response && 'student' in response) {
          const apiResponse = response as { success: boolean; student: any };
          if (apiResponse.success && apiResponse.student) {
            studentDetails = apiResponse.student;
          }
        } 
        // Check if response is directly the student object
        else if ('name' in response || 'studentName' in response || 'enrollmentId' in response) {
          studentDetails = response as StudentDetails;
        }
        // Check if response has a student property directly
        else if ('student' in response) {
          studentDetails = (response as any).student;
        }
      }

      if (studentDetails) {
        setStudentData(studentDetails);
        setVerified(true);
        toast.success("Certificate verified successfully!");
      } else {
        toast.error("Certificate not found. Please check the enrollment ID.");
        setVerified(false);
      }
    } catch (error: any) {
      console.error("Error verifying certificate:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to verify certificate. Please try again.";
      toast.error(errorMessage);
      setVerified(false);
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEnrollmentId("");
    setVerified(false);
    setStudentData(null);
  };

  return (
    <div className="certificate-verification-container">
      <div className="verification-card">
        <h2 className="verification-title">Verify Certificate</h2>
        <p className="verification-instruction">
          Enter the enrollment ID to verify a student certificate
        </p>

        <form onSubmit={handleVerify} className="verification-form">
          <input
            type="text"
            placeholder="Enter Enrollment ID (e.g., IICL-HAS-2025-4002)"
            value={enrollmentId}
            onChange={(e) => setEnrollmentId(e.target.value)}
            className="enrollment-input"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="verify-button"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
        </form>

        {verified && studentData && (
          <>
            <div className="success-box">
              <div className="success-icon">✓</div>
              <p className="success-message">
                This certificate is authentic and has been verified.
              </p>
            </div>

            <div className="student-details-box">
              <div className="detail-item">
                <span className="detail-label">Student Name:</span>
                <span className="detail-value">{studentData.name || studentData.studentName || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Course:</span>
                <span className="detail-value">{studentData.course || studentData.courseName || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date of Birth:</span>
                <span className="detail-value">{studentData.dob || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Father's Name:</span>
                <span className="detail-value">{studentData.fatherName || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Center Name:</span>
                <span className="detail-value">{studentData.centerName || studentData.franchiseName || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Session:</span>
                <span className="detail-value">
                  {studentData.session 
                    ? studentData.session 
                    : (studentData.sessionFrom && studentData.sessionTo 
                        ? `${studentData.sessionFrom} to ${studentData.sessionTo}`
                        : "N/A")}
                </span>
              </div>
            </div>

            <button onClick={handleReset} className="reset-button">
              Verify Another Certificate
            </button>
          </>
        )}

        <p className="contact-note">
          For any issues, please contact the academic office.
        </p>
      </div>
    </div>
  );
};

export default CertificateVerification;

