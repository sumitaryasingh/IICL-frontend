import React, { useState } from "react";
import styles from "./styles/AddBatchForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BatchFormData {
  course: string;
  time: string;
}

const AddBatchForm: React.FC = () => {
  const [formData, setFormData] = useState<BatchFormData>({
    course: "",
    time: "",
  });

  // Define course options for the dropdown
  const courseOptions = [
    "B.Sc Computer Science",
    "BBA",
    "MBA",
    "MCA",
    "B.Tech",
    "Diploma in IT",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.course) {
      toast.error("Course is required");
      return;
    }
    if (!formData.time.trim()) {
      toast.error("Time is required");
      return;
    }

    // Simulate form submission
    toast.success("Batch added successfully!");

    // Optionally clear the form after submission
    setFormData({
      course: "",
      time: "",
    });
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
