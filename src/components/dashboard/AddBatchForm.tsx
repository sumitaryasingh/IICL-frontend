import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/AddBatchForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBatch, getBatchById, updateBatch } from "../../services/batchService";
import { getCourses } from "../../services/dashboardHome";

interface BatchFormData {
  course: string;
  time: string;
  franchiseId?: string;
}

const AddBatchForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [formData, setFormData] = useState<BatchFormData>({
    course: "",
    time: "",
    franchiseId: "",
  });
  const [courseOptions, setCourseOptions] = useState<string[]>([]);

  useEffect(() => {
    const storedFranchiseId = localStorage.getItem("franchiseId") || "";
    setFormData((prev) => ({ ...prev, franchiseId: storedFranchiseId }));

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

    const fetchBatchToEdit = async () => {
      if (!id) return;
      try {
        const batch = await getBatchById(id);
        setFormData({
          course: batch.course,
          time: batch.time,
          franchiseId: batch.franchiseId || storedFranchiseId,
        });
      } catch (error) {
        console.error("Error fetching batch", error);
        toast.error("Failed to load batch data");
      }
    };

    fetchCourseData();
    fetchBatchToEdit();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.course || !formData.time.trim()) {
      toast.error("Course and Time are required");
      return;
    }

    try {
      const payload: any = {
        ...formData,
        franchiseId: localStorage.getItem("franchiseId") || "",
      };

      if (id) {
        await updateBatch(id, payload);
        toast.success("Batch updated successfully!");
      } else {
        await addBatch(payload);
        toast.success("Batch added successfully!");
      }

      setFormData({ course: "", time: "", franchiseId: payload.franchiseId });
    } catch (error) {
      console.error("Error submitting batch:", error);
      toast.error("Failed to submit batch");
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2>{id ? "Edit Batch" : "Add Batch"}</h2>
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
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddBatchForm;
