import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./styles/AddStudentForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitStudentData, getStudentDataByEnrollmentId, editStudentData } from "../../services/studentService";
import { fetchBatchOptions } from "../../services/batchService";
import { useParams } from "react-router-dom";
import { getCourses } from "../../services/dashboardHome";
const IMAGE_SIZE_LIMIT = 50 * 1024; // 50 KB
const AddStudentForm = () => {
    const [formData, setFormData] = useState({
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
    const [batchOptions, setBatchOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const { enrollmentId: routeEnrollmentId } = useParams();
    const franchiseIdData = localStorage.getItem("franchiseId") || "";
    useEffect(() => {
        const fetchOptions = async (franchiseId) => {
            try {
                const batchData = await fetchBatchOptions(franchiseId);
                setBatchOptions(batchData.map((b) => ({ id: b.id, course: b.course, time: b.time })));
            }
            catch (error) {
                console.error("Error fetching batch options:", error);
                toast.error("Failed to load batch options");
            }
            try {
                const courseData = await getCourses();
                setCourseOptions(courseData.map((c) => c.course));
            }
            catch (error) {
                console.error("Error fetching courses", error);
                toast.error("Error fetching courses");
            }
        };
        fetchOptions(franchiseIdData);
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > IMAGE_SIZE_LIMIT) {
                toast.error("Image size should be less than 1MB");
                e.target.value = "";
                setFormData(prev => ({ ...prev, image: null }));
            }
            else {
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
        }
        else {
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
    const handleSubmit = async (e) => {
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
            const randomTwoDigit = Math.floor(10 + Math.random() * 90).toString();
            const generatedEnrollmentId = `IICL-${threeLettersFromCity}-${registrationYear}-${randomTwoDigit}`;
            const generatedRegistrationId = `IICL-${registrationYear}-${randomTwoDigit}`;
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
        const requiredFields = {
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
            if (!formData[field]?.toString().trim()) {
                toast.error(`${requiredFields[field]} is required`);
                return;
            }
        }
        const studentData = { ...formData, image: formData.image ?? new File([], "placeholder.jpg") };
        try {
            if (routeEnrollmentId) {
                await editStudentData(routeEnrollmentId, studentData);
                toast.success("Student edited successfully!");
            }
            else {
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
        }
        catch (error) {
            console.error("Error submitting student data:", error);
            toast.error("Submission failed. Please try again.");
        }
    };
    return (_jsxs("div", { className: styles.formContainer, children: [_jsx("h2", { children: "Add Student" }), _jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: styles.form, children: [_jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "name", children: "Name" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "fatherName", children: "Father's Name" }), _jsx("input", { type: "text", id: "fatherName", name: "fatherName", value: formData.fatherName, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "motherName", children: "Mother's Name" }), _jsx("input", { type: "text", id: "motherName", name: "motherName", value: formData.motherName, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "phone", children: "Phone" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "registrationDate", children: "Registration Date" }), _jsx("input", { type: "date", id: "registrationDate", name: "registrationDate", value: formData.registrationDate, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "sessionFrom", children: "Session From" }), _jsx("input", { type: "date", id: "sessionFrom", name: "sessionFrom", value: formData.sessionFrom, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "sessionTo", children: "Session To" }), _jsx("input", { type: "date", id: "sessionTo", name: "sessionTo", value: formData.sessionTo, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "dob", children: "Date of Birth" }), _jsx("input", { type: "date", id: "dob", name: "dob", value: formData.dob, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "gender", children: "Gender" }), _jsxs("select", { id: "gender", name: "gender", value: formData.gender, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select Gender" }), _jsx("option", { value: "Male", children: "Male" }), _jsx("option", { value: "Female", children: "Female" }), _jsx("option", { value: "Other", children: "Other" })] })] })] }), _jsx("div", { className: styles.formRow, children: _jsxs("div", { className: styles.formGroup, style: { flex: "1" }, children: [_jsx("label", { htmlFor: "address", children: "Address" }), _jsx("textarea", { id: "address", name: "address", value: formData.address, onChange: handleChange, required: true })] }) }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "course", children: "Select Course" }), _jsxs("select", { id: "course", name: "course", value: formData.course, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select Course" }), courseOptions.map((option, index) => (_jsx("option", { value: option, children: option }, index)))] })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "batch", children: "Select Batch" }), _jsxs("select", { id: "batch", name: "batch", value: formData.batch, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select Batch" }), batchOptions.map((batch) => (_jsxs("option", { value: batch.id, children: [batch.course, " - ", batch.time] }, batch.id)))] })] })] }), _jsx("div", { className: styles.formRow, children: _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "image", children: "Upload Image" }), _jsx("input", { type: "file", id: "image", name: "image", accept: "image/*", onChange: handleFileChange })] }) }), _jsx("div", { className: styles.formRow, children: _jsxs("div", { className: styles.formGroup, style: { flex: "1" }, children: [_jsx("label", { htmlFor: "qualification", children: "Student Qualification" }), _jsx("input", { id: "qualification", name: "qualification", value: formData.qualification, onChange: handleChange, required: true })] }) }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "idProof", children: "Select ID Proof" }), _jsxs("select", { id: "idProof", name: "idProof", value: formData.idProof, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select ID Proof" }), _jsx("option", { value: "Aadhar", children: "Aadhar" }), _jsx("option", { value: "PAN", children: "PAN" }), _jsx("option", { value: "Voter ID", children: "Voter ID" })] })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "idProofNumber", children: "ID Proof Number" }), _jsx("input", { type: "text", id: "idProofNumber", name: "idProofNumber", value: formData.idProofNumber, onChange: handleChange, required: true })] })] }), _jsx("button", { type: "submit", className: styles.submitBtn, children: "Submit" })] }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000 })] }));
};
export default AddStudentForm;
