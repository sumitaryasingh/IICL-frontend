import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./styles/AddBatchForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBatch } from "../../services/batchService";
import { getCourses } from "../../services/dashboardHome";

interface BatchFormData {
  course: string;
  time: string;
  franchiseId?: string;
}

const AddBatchForm: React.FC = () => {
  const [formData, setFormData] = useState<BatchFormData>({
    course: "",
    time: "",
    franchiseId: "",
  });
  
  // State for course options fetched from the database.
  const [courseOptions, setCourseOptions] = useState<string[]>([]);

  // Set franchiseId from localStorage on mount.
  useEffect(() => {
    const storedFranchiseId = localStorage.getItem("franchiseId") || "";
    setFormData((prev) => ({ ...prev, franchiseId: storedFranchiseId }));
  }, []);

  // Fetch courses from the database on component mount.
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getCourses();
        const options = data.map((course: any) => course.course);
        setCourseOptions(options);
      } catch (error) {
        console.error("Error fetching courses", error);
        toast.error("Error fetching courses");
      }
    };
    fetchCourseData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.course) {
      toast.error("Course is required");
      return;
    }
    if (!formData.time.trim()) {
      toast.error("Time is required");
      return;
    }
    try {
      // Always ensure the payload includes the franchiseId from localStorage.
      const storedFranchiseId = localStorage.getItem("franchiseId") || "";
      const payload = { ...formData, franchiseId: storedFranchiseId };
      await addBatch(payload);
      toast.success("Batch added successfully!");
      setFormData({ course: "", time: "", franchiseId: storedFranchiseId });
    } catch (error) {
      console.error("Error adding batch:", error);
      toast.error("Failed to add batch");
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2>Add Batch</h2>
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="course">Course</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                {courseOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="time">Time</label>
              <input
                type="text"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddBatchForm;
