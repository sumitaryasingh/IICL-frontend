import React, { useState, ChangeEvent } from "react";
import styles from "./styles/AddStudentForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitStudentData,StudentData  } from "../../services/studentService";

// Define an interface for the form data
interface StudentFormData {
  name: string;
  email: string;
  fatherName: string;
  motherName: string;
  phone: string;
  sessionFrom: string;
  sessionTo: string;
  registrationDate: string;
  address: string;
  dob: string;
  gender: string;
  course: string;
  batch: string;
  image: File | null;
  qualification: string;
  idProof: string;
  idProofNumber: string;
}

// Simulated batch options (in a real app, these would come from your ViewBatch data or API)
interface BatchOption {
  id: string;
  name: string;
}

const simulatedBatchOptions: BatchOption[] = [
  { id: "batch1", name: "Batch 1" },
  { id: "batch2", name: "Batch 2" },
  { id: "batch3", name: "Batch 3" },
];

const IMAGE_SIZE_LIMIT = 1 * 1024 * 1024; // 1 MB

const AddStudentForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    fatherName: "",
    motherName: "",
    phone: "",
    sessionFrom: "",
    sessionTo: "",
    registrationDate: "",
    address: "",
    dob: "",
    gender: "",
    course: "",
    batch: "",
    image: null,
    qualification: "",
    idProof: "",
    idProofNumber: "",
  });

  const [batchOptions, setBatchOptions] = useState<BatchOption[]>(simulatedBatchOptions);

  // Handle change for text, email, date, select, and textarea inputs.
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input for the image.
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > IMAGE_SIZE_LIMIT) {
        toast.error("Image size should be less than 1MB");
        e.target.value = "";
        setFormData(prev => ({ ...prev, image: null }));
      } else {
        setFormData(prev => ({ ...prev, image: file }));
      }
    }
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.fatherName.trim()) {
      toast.error("Father's name is required");
      return;
    }
    if (!formData.motherName.trim()) {
      toast.error("Mother's name is required");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone is required");
      return;
    }
    if (!formData.sessionFrom.trim() || !formData.sessionTo.trim()) {
      toast.error("Both session dates are required");
      return;
    }
    if (!formData.registrationDate.trim()) {
      toast.error("Registration date is required");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (!formData.dob.trim()) {
      toast.error("Date of birth is required");
      return;
    }
    if (!formData.gender) {
      toast.error("Gender is required");
      return;
    }
    if (!formData.course) {
      toast.error("Course is required");
      return;
    }
    if (!formData.batch) {
      toast.error("Batch is required");
      return;
    }
    if (!formData.qualification.trim()) {
      toast.error("Qualification is required");
      return;
    }
    if (!formData.idProof) {
      toast.error("Select an ID proof");
      return;
    }
    if (!formData.idProofNumber.trim()) {
      toast.error("ID proof number is required");
      return;
    }
    // Additional validations such as email format, phone format can be added as needed.

    // If validation passes, simulate a POST request (you would call your API here)
    try {
      await submitStudentData(formData);
      toast.success("Student added successfully!");
      // Clear form after submission if desired
      setFormData({
        name: "",
        email: "",
        fatherName: "",
        motherName: "",
        phone: "",
        registrationDate: "",
        sessionFrom: "",
        sessionTo: "",
        dob: "",
        gender: "",
        address: "",
        course: "",
        batch: "",
        qualification: "",
        idProof: "",
        idProofNumber: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting student data:", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {/* Row 1: Name, Email */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 2: Father's Name, Mother's Name */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="fatherName">Father's Name</label>
            <input 
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="motherName">Mother's Name</label>
            <input 
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 3: Phone, Registration Date */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="registrationDate">Registration Date</label>
            <input 
              type="date"
              id="registrationDate"
              name="registrationDate"
              value={formData.registrationDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 4: Session From, Session To */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="sessionFrom">Session From</label>
            <input 
              type="date"
              id="sessionFrom"
              name="sessionFrom"
              value={formData.sessionFrom}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="sessionTo">Session To</label>
            <input 
              type="date"
              id="sessionTo"
              name="sessionTo"
              value={formData.sessionTo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 5: DOB, Gender */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input 
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gender">Gender</label>
            <select 
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Row 6: Address */}
        <div className={styles.formRow}>
          <div className={styles.formGroup} style={{ flex: "1" }}>
            <label htmlFor="address">Address</label>
            <textarea 
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        {/* Row 7: Course, Batch */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="course">Select Course</label>
            <select 
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="B.Sc Computer Science">B.Sc Computer Science</option>
              <option value="BBA">BBA</option>
              <option value="MBA">MBA</option>
              <option value="MCA">MCA</option>
              <option value="B.Tech">B.Tech</option>
              <option value="Diploma in IT">Diploma in IT</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="batch">Select Batch</label>
            <select 
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            >
              <option value="">Select Batch</option>
              {batchOptions.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 8: Image Upload */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="image">Upload Image</label>
            <input 
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Row 9: Student Qualification */}
        <div className={styles.formRow}>
          <div className={styles.formGroup} style={{ flex: "1" }}>
            <label htmlFor="qualification">Student Qualification</label>
            <input 
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 10: ID Proof and ID Proof Number */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="idProof">Select ID Proof</label>
            <select 
              id="idProof"
              name="idProof"
              value={formData.idProof}
              onChange={handleChange}
              required
            >
              <option value="">Select ID Proof</option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN">PAN</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="idProofNumber">ID Proof Number</label>
            <input 
              type="text"
              id="idProofNumber"
              name="idProofNumber"
              value={formData.idProofNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddStudentForm;
