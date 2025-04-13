import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./styles/AddFranchiseForm.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitFranchiseData } from "../../services/franchiseService";
import { editFranchiseData } from "../../services/viewFranchise";
const AddFranchiseForm = ({ editData }) => {
    const [formData, setFormData] = useState({
        _id: "",
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
        role: "franchise"
    });
    // State to control whether the password field is editable
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);
    // On mount or when editData changes, initialize form data
    useEffect(() => {
        if (editData) {
            setFormData(editData);
            // When editing, assume the password is already set by the user
            setIsPasswordEditable(true);
        }
        else {
            // Generate a random 5-digit franchiseId for new entries
            const franchiseId = Math.floor(10000 + Math.random() * 90000);
            setFormData((prevData) => ({ ...prevData, franchiseId }));
        }
    }, [editData]);
    // When mobile number changes and password hasn't been manually edited, update password to mobile
    useEffect(() => {
        if (!isPasswordEditable) {
            setFormData((prevData) => ({
                ...prevData,
                password: prevData.mobile,
            }));
        }
    }, [formData.mobile, isPasswordEditable]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handlePasswordEdit = (e) => {
        e.preventDefault();
        setIsPasswordEditable(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Regex patterns for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const aadharRegex = /^[0-9]{12}$/;
        // Array of validations with conditions and messages
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
        // Run validations and display error if any fail
        for (let validation of validations) {
            if (validation.condition) {
                toast.error(validation.message);
                return;
            }
        }
        try {
            if (isEditMode) {
                await editFranchiseData(formData._id, formData);
                toast.success("Franchise updated successfully!");
              } else {
                await submitFranchiseData(formData);
                toast.success("Franchise added successfully!");
              }              
              
              
            // Reset the form after successful submission
            setFormData({
                _id: "",
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
                franchiseId: Math.floor(10000 + Math.random() * 90000),
                role: "franchise"
            });
            setIsPasswordEditable(false);
        }
        catch (error) {
            console.error("Error submitting franchise data:", error);
            toast.error("Submission failed. Please try again.");
        }
    };
    return (_jsxs("div", { className: styles.formContainer, children: [_jsx("h2", { children: editData ? "Edit Franchise" : "Add Franchise" }), _jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: styles.form, children: [_jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "firstName", children: "First Name *" }), _jsx("input", { type: "text", id: "firstName", name: "firstName", value: formData.firstName, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "lastName", children: "Last Name *" }), _jsx("input", { type: "text", id: "lastName", name: "lastName", value: formData.lastName, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "dob", children: "Date of Birth *" }), _jsx("input", { type: "date", id: "dob", name: "dob", value: formData.dob, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "directorName", children: "Director Name *" }), _jsx("input", { type: "text", id: "directorName", name: "directorName", value: formData.directorName, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "instituteName", children: "Institute Name *" }), _jsx("input", { type: "text", id: "instituteName", name: "instituteName", value: formData.instituteName, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "address", children: "Address *" }), _jsx("input", { type: "text", id: "address", name: "address", value: formData.address, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "city", children: "City *" }), _jsx("input", { type: "text", id: "city", name: "city", value: formData.city, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "state", children: "State *" }), _jsx("input", { type: "text", id: "state", name: "state", value: formData.state, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "mobile", children: "Mobile *" }), _jsx("input", { type: "text", id: "mobile", name: "mobile", value: formData.mobile, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "email", children: "Email *" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "aadharId", children: "Aadhar ID *" }), _jsx("input", { type: "text", id: "aadharId", name: "aadharId", value: formData.aadharId, onChange: handleChange, required: true })] })] }), _jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "password", children: "Password *" }), _jsx("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, required: true, disabled: !isPasswordEditable })] }), !isPasswordEditable && (_jsx("div", { className: styles.formGroup, children: _jsx("button", { onClick: handlePasswordEdit, children: "Edit Password" }) }))] }), _jsx("button", { type: "submit", className: styles.submitBtn, children: editData ? "Update" : "Submit" })] })] }));
};
export default AddFranchiseForm;
