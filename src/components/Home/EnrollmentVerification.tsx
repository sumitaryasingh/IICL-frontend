import type React from "react";
import { useState } from "react";
import styles from "./EnrollmentVerifications.module.css";
import { getStudentDataByEnrollmentId } from "../../services/studentService";
import { fetchStudentDetails } from "../../services/studentZone";

// Define the type for student certificate
interface CertificateData {
  isValid: boolean;
  studentName?: string;
  course?: string;
  issueDate?: string;
  grade?: string;
}

export function EnrollmentVerifications() {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCertificate(null);
    setIsLoading(true);
  
    try {
      const studentData = await fetchStudentDetails(enrollmentId);
  
      const sessionToDate = new Date(studentData.sessionTo);
      const now = new Date();
  
      const isSessionCompleted = now >= sessionToDate;
  
      setCertificate({
        isValid: isSessionCompleted,
        studentName: studentData.name,
        course: studentData.course,
        grade: studentData.grade,
      });
  
      if (!isSessionCompleted) {
        setError("This certificate is not yet valid. Session is still in progress.");
      }
  
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("No certificate found for this enrollment ID.");
      } else {
        setError("Could not verify certificate. Please try again later.");
      }
      setCertificate({ isValid: false });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Verify Certificate</h2>
        <p className={styles.cardDescription}>Enter the enrollment ID to verify a student certificate</p>
      </div>

      <div className={styles.cardContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              id="enrollmentId"
              className={styles.input}
              placeholder="Enter enrollment ID (e.g., IICL-ABC-20XX-XX)"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
              disabled={isLoading}
            />
            {error && <p className={styles.errorText}>{error}</p>}
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? (
              <span className={styles.loadingText}>
                <span className={styles.loadingSpinner}></span>
                Verifying...
              </span>
            ) : (
              "Verify Certificate"
            )}
          </button>
        </form>

        {certificate && (
          <div className={styles.resultSection}>
            <div className={certificate.isValid ? styles.alertSuccess : styles.alertError}>
              <div className={styles.alertContent}>
                <span className={certificate.isValid ? styles.iconSuccess : styles.iconError}>
                  {certificate.isValid ? "✓" : "✗"}
                </span>
                <div>
                  <h3 className={styles.alertTitle}>
                    {certificate.isValid ? "Valid Certificate" : "Invalid Certificate"}
                  </h3>
                  <p className={styles.alertDescription}>
                    {certificate.isValid
                      ? "This certificate is authentic and has been verified."
                      : "We couldn't verify this certificate. Please check the enrollment ID and try again."}
                  </p>
                </div>
              </div>
            </div>

            {certificate.isValid && (
              <div className={styles.certificateDetails}>
                <div className={styles.detailRow}>
                  <p className={styles.detailLabel}>Student Name:</p>
                  <p className={styles.detailValue}>{certificate.studentName}</p>
                </div>
                <div className={styles.detailRow}>
                  <p className={styles.detailLabel}>Course:</p>
                  <p className={styles.detailValue}>{certificate.course}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>For any issues, please contact the academic office</div>
    </div>
  );
}
