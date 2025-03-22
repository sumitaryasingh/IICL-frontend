import React, { useEffect, useState } from "react";
import styles from "./styles/AddFranchiseForm.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitFranchiseData } from "../../services/franchiseService";
import { editFranchiseData } from "../../services/viewFranchise";
import { useParams } from "react-router-dom";

interface FranchiseFormData {
  _id?:string;
  firstName: string;
  lastName: string;
  dob: string;
  directorName: string;
  instituteName: string;
  city: string;
  state: string;
  address: string;
  mobile: string;
  email: string;
  aadharId: string;
  password: string;
  franchiseId: number;
}

interface AddFranchiseFormProps {
  editData?: FranchiseFormData | null;  // New prop for edit functionality
}

const AddFranchiseForm: React.FC<AddFranchiseFormProps> = ({ editData }) => {
  const [formData, setFormData] = useState<FranchiseFormData>({
    firstName: "",
    lastName: "",
    dob: "",
    directorName: "",
    instituteName: "",
    city: "",
    state: "",
    address: "",
    mobile: "",
    email: "",
    aadharId: "",
    password: "",
    franchiseId: 0,
  });

  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const { _id: _id } = useParams<{ _id?: string }>();


  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      const franchiseId = Math.floor(100000 + Math.random() * 900000);
      setFormData((prevData) => ({ ...prevData, franchiseId }));
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPasswordEditable(true);
    if (!formData.password) {
      setFormData((prevData) => ({
        ...prevData,
        password: prevData.mobile,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const aadharRegex = /^[0-9]{12}$/;

    const validations = [
      { condition: !formData.firstName.trim(), message: "First name is required" },
      { condition: !formData.lastName.trim(), message: "Last name is required" },
      { condition: !formData.dob.trim(), message: "Date of birth is required" },
      { condition: !formData.directorName.trim(), message: "Director name is required" },
      { condition: !formData.instituteName.trim(), message: "Institute name is required" },
      { condition: !formData.address.trim(), message: "Address is required" },
      { condition: !formData.city.trim(), message: "City is required" },
      { condition: !formData.state.trim(), message: "State is required" },
      { condition: !formData.mobile.trim(), message: "Mobile number is required" },
      { condition: !mobileRegex.test(formData.mobile), message: "Invalid mobile number. It should be 10 digits." },
      { condition: !formData.email.trim(), message: "Email is required" },
      { condition: !emailRegex.test(formData.email), message: "Invalid email address." },
      { condition: !formData.aadharId.trim(), message: "Aadhar ID is required" },
      { condition: !aadharRegex.test(formData.aadharId), message: "Invalid Aadhar ID. It should be 12 digits." },
    ];

    for (let validation of validations) {
      if (validation.condition) {
        toast.error(validation.message);
        return;
      }
    }

    try {
      if (editData) {
        if (_id) {
          await editFranchiseData(_id, { ...formData, _id }); // Call update API if editing
        } else {
          toast.error("Franchise ID is missing.");
        }
        toast.success("Franchise updated successfully!");
      } else {
        await submitFranchiseData(formData); // Call add API if new
        toast.success("Franchise added successfully!");
      }

      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        directorName: "",
        instituteName: "",
        city: "",
        state: "",
        address: "",
        mobile: "",
        email: "",
        aadharId: "",
        password: "",
        franchiseId: 0,
      });
      setIsPasswordEditable(false);
    } catch (error) {
      console.error("Error submitting franchise data:", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>{editData ? "Edit Franchise" : "Add Franchise"}</h2>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {/* First Row: First Name & Last Name */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Second Row: Date of Birth & Director Name */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dob">Date of Birth *</label>
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
            <label htmlFor="directorName">Director Name *</label>
            <input
              type="text"
              id="directorName"
              name="directorName"
              value={formData.directorName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email & Aadhar */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="aadharId">Aadhar ID *</label>
            <input
              type="text"
              id="aadharId"
              name="aadharId"
              value={formData.aadharId}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          {editData ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddFranchiseForm;
