import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./styles/AddStudentForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitStudentData, StudentData, getStudentDataByEnrollmentId, editStudentData  } from "../../services/studentService";
import { fetchBatchOptions } from "../../services/batchService";
import { useParams } from "react-router-dom";

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
  franchiseId: string;
  enrollmentId: string;
}

// Simulated batch options (in a real app, these would come from your ViewBatch data or API)
interface BatchOption {
  id: string;
  course: string;
  time: string;
}



// Rest of the component code...

const IMAGE_SIZE_LIMIT = 50 * 1024; // 50 KB

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
    franchiseId: "",
    enrollmentId: "",
  });

  const [batchOptions, setBatchOptions] = useState<BatchOption[]>([]);
  console.log(batchOptions);
  const { enrollmentId: routeEnrollmentId } = useParams<{ enrollmentId?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBatchOptions();
        const batchOptions = data.map((batch: any) => ({
          id: batch._id,
          course: batch.course,
          time: batch.time,
        }));
        setBatchOptions(batchOptions);
      } catch (error) {
        console.error("Error fetching batch options:", error);
        toast.error("Failed to load batch options");
      }
    };

    fetchData();
  }, []);


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


useEffect(() => {
  // Retrieve franchiseId from localStorage
  const storedFranchiseId = localStorage.getItem("franchiseId") || "";
  
  if (routeEnrollmentId) {
    // Edit Mode: fetch student data by enrollmentId and prefill the form.
    getStudentDataByEnrollmentId(routeEnrollmentId)
      .then((studentData) => {
        // Assuming studentData matches your StudentFormData structure
        setFormData({
          name: studentData.name,
          email: studentData.email,
          fatherName: studentData.fatherName,
          motherName: studentData.motherName,
          phone: studentData.phone,
          sessionFrom: studentData.sessionFrom,
          sessionTo: studentData.sessionTo,
          registrationDate: studentData.registrationDate,
          address: studentData.address,
          dob: studentData.dob,
          gender: studentData.gender,
          course: studentData.course,
          batch: studentData.batch,
          image: null, // File input cannot be prefilled; user can upload a new image if needed.
          qualification: studentData.qualification,
          idProof: studentData.idProof,
          idProofNumber: studentData.idProofNumber,
          franchiseId: studentData.franchiseId, // This should match the stored franchiseId if applicable
          enrollmentId: studentData.enrollmentId,
        });
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        toast.error("Error fetching student data");
      });
  } else {
    // Add Mode: Generate a random eight-digit enrollmentId and set franchiseId.
    const generatedEnrollmentId = Math.floor(10000000 + Math.random() * 90000000).toString();
    setFormData((prev: any) => ({
      ...prev,
      franchiseId: storedFranchiseId,
      enrollmentId: generatedEnrollmentId,
    }));
  }
}, [routeEnrollmentId]);

  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   

    // Required fields validation
    const requiredFields: { [key: string]: string } = {
      name: "Name",
      email: "Email",
      fatherName: "Father's name",
      motherName: "Mother's name",
      phone: "Phone",
      sessionFrom: "Session from date",
      sessionTo: "Session to date",
      registrationDate: "Registration date",
      address: "Address",
      dob: "Date of birth",
      gender: "Gender",
      course: "Course",
      batch: "Batch",
      qualification: "Qualification",
      idProof: "ID proof",
      idProofNumber: "ID proof number",
      franchiseId: "franchise id Automatic Generation",
      enrollmentId: "Enrollment Number Automatic Generation"
    };

    for (const field in requiredFields) {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        toast.error(`${requiredFields[field]} is required`);
        return;
      }
    }


    // Append franchiseId to formData
    const studentData = { ...formData ,image: formData.image ?? new File([], "placeholder.jpg"), };
    // Submit data if all validations pass
    try {
      if (routeEnrollmentId) {
        // Edit mode: call editStudentData with enrollmentId from URL and formData.
        await editStudentData(routeEnrollmentId, studentData);
        toast.success("Student edited successfully!");
      } else {
        // Add mode: call submitStudentData to add a new student.
        await submitStudentData(studentData);
        toast.success("Student added successfully!");
      }

      // Reset form
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
        franchiseId: "",
        enrollmentId: "",
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
                  {batch.course} - {batch.time}
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
