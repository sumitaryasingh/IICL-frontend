import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./styles/AddStudentForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitStudentData, getStudentDataByEnrollmentId, editStudentData } from "../../services/studentService";
import { fetchBatchOptions } from "../../services/batchService";
import { useParams } from "react-router-dom";
import { getCourses } from "../../services/dashboardHome";

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
  registrationId: string;
}

interface BatchOption {
  id: string;
  course: string;
  time: string;
}

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
    registrationId: ""
  });
  const [batchOptions, setBatchOptions] = useState<BatchOption[]>([]);
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const { enrollmentId: routeEnrollmentId } = useParams<{ enrollmentId?: string }>();
  const franchiseIdData = localStorage.getItem("franchiseId") || "";

  useEffect(() => {
    const fetchOptions = async (franchiseId:string) => {
      try {
        const batchData = await fetchBatchOptions(franchiseId);
        setBatchOptions(batchData.map((b: any) => ({ id: b.id, course: b.course, time: b.time })));
      } catch (error) {
        console.error("Error fetching batch options:", error);
        toast.error("Failed to load batch options");
      }
      try {
        const courseData = await getCourses();
        setCourseOptions(courseData.map((c: any) => c.course));
      } catch (error) {
        console.error("Error fetching courses", error);
        toast.error("Error fetching courses");
      }
    };
    fetchOptions(franchiseIdData);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    const storedFranchiseId = localStorage.getItem("franchiseId") || "";
    console.log("this is the franchiseId: :", storedFranchiseId);
    if (routeEnrollmentId) {
      getStudentDataByEnrollmentId(routeEnrollmentId)
        .then((studentData) => {
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
            image: null, // file input cannot be prefilled
            qualification: studentData.qualification,
            idProof: studentData.idProof,
            idProofNumber: studentData.idProofNumber,
            franchiseId: studentData.franchiseId,
            enrollmentId: studentData.enrollmentId,
            registrationId: studentData.registrationId
          });
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
          toast.error("Error fetching student data");
        });
    } else {
      if (!formData.registrationDate) {
        toast.error("Registration date is required");
        return;
      }
      const regDate = new Date(formData.registrationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (regDate < today) {
        toast.error("Registration date cannot be in the past");
        return;
      }
      const cityName = formData.address ? formData.address.trim() : "";
      const threeLettersFromCity = cityName.substring(0, 3).toUpperCase();
      const registrationYear = formData.registrationDate.split("-")[0] || new Date().getFullYear().toString();
      const randomTwoDigit = Math.floor(10 + Math.random() * 90).toString();
      setFormData(prev => ({
        ...prev,
        franchiseId: storedFranchiseId,
        enrollmentId: `IICL-${threeLettersFromCity}-${registrationYear}-${randomTwoDigit}`,
        registrationId: `IICL-${registrationYear}-${randomTwoDigit}`
      }));
    }
  }, [routeEnrollmentId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!routeEnrollmentId && !formData.franchiseId) {
      const storedFranchiseId = localStorage.getItem("franchiseId") || "";
      if (!storedFranchiseId) {
        toast.error("Franchise ID is required for automatic generation");
        return;
      }
      if (!formData.registrationDate) {
        toast.error("Registration date is required");
        return;
      }
      const regDate = new Date(formData.registrationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (regDate < today) {
        toast.error("Registration date cannot be in the past");
        return;
      }
      if (!formData.address.trim()) {
        toast.error("Address is required for enrollment ID generation");
        return;
      }
      const cityName = formData.address.trim();
      const threeLettersFromCity = cityName.substring(0, 3).toUpperCase();
      const registrationYear = formData.registrationDate.split("-")[0];
      const randomFourDigit = Math.floor(10 + Math.random() * 9000).toString();
      const generatedEnrollmentId = `IICL-${threeLettersFromCity}-${registrationYear}-${randomFourDigit}`;
      const generatedRegistrationId = `IICL-${registrationYear}-${randomFourDigit}`;
      setFormData(prev => ({
        ...prev,
        franchiseId: storedFranchiseId,
        enrollmentId: generatedEnrollmentId,
        registrationId: generatedRegistrationId,
      }));
      formData.franchiseId = storedFranchiseId;
      formData.enrollmentId = generatedEnrollmentId;
      formData.registrationId = generatedRegistrationId;
    }

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
    };
    for (const field in requiredFields) {
      if (!formData[field as keyof StudentFormData]?.toString().trim()) {
        toast.error(`${requiredFields[field]} is required`);
        return;
      }
    }
    const studentData = { ...formData, image: formData.image ?? new File([], "placeholder.jpg") };
    try {
      if (routeEnrollmentId) {
        await editStudentData(routeEnrollmentId, studentData);
        toast.success("Student edited successfully!");
      } else {
        await submitStudentData(studentData);
        toast.success("Student added successfully!");
      }
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
        registrationId: ""
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
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="fatherName">Father's Name</label>
            <input type="text" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="motherName">Mother's Name</label>
            <input type="text" id="motherName" name="motherName" value={formData.motherName} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="registrationDate">Registration Date</label>
            <input type="date" id="registrationDate" name="registrationDate" value={formData.registrationDate} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="sessionFrom">Session From</label>
            <input type="date" id="sessionFrom" name="sessionFrom" value={formData.sessionFrom} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="sessionTo">Session To</label>
            <input type="date" id="sessionTo" name="sessionTo" value={formData.sessionTo} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup} style={{ flex: "1" }}>
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} required></textarea>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="course">Select Course</label>
            <select id="course" name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Select Course</option>
              {courseOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="batch">Select Batch</label>
            <select id="batch" name="batch" value={formData.batch} onChange={handleChange} required>
              <option value="">Select Batch</option>
              {batchOptions.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.course} - {batch.time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup} style={{ flex: "1" }}>
            <label htmlFor="qualification">Student Qualification</label>
            <input id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="idProof">Select ID Proof</label>
            <select id="idProof" name="idProof" value={formData.idProof} onChange={handleChange} required>
              <option value="">Select ID Proof</option>
              <option value="Aadhar">Aadhar</option>
              <option value="PAN">PAN</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="idProofNumber">ID Proof Number</label>
            <input type="text" id="idProofNumber" name="idProofNumber" value={formData.idProofNumber} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddStudentForm;
