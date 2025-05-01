import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkStudentExistsOrNot } from "../../services/studentZone";
import "./styles/StudentEnrollment.css";

const StudentEnrollment = () => {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId.trim()) return;

    setLoading(true);
    try {
      const exists = await checkStudentExistsOrNot(enrollmentId.trim());

      if (exists) {
        // const encoded = btoa(enrollmentId.trim());
        navigate(`/student/details/${enrollmentId}`);
      } else {
        toast.error("❌ Student not found. Please check the enrollment number.");
      }
    } catch {
      toast.error("⚠️ Unable to verify student. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enrollment-container">
      <h2>🔍Verify Student Enrollment</h2>
      <form onSubmit={handleSubmit} className="enrollment-form">
        <input
          type="text"
          placeholder="Enter Enrollment Number"
          value={enrollmentId}
          onChange={(e) => setEnrollmentId(e.target.value)}
          className="enrollment-input"
          required
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "🔄 Checking..." : "📄 Fetch Details"}
        </button>
      </form>
    </div>
  );
};

export default StudentEnrollment;
