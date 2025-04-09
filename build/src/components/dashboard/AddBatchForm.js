import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./styles/AddBatchForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBatch } from "../../services/batchService";
import { getCourses } from "../../services/dashboardHome";
const AddBatchForm = () => {
    const [formData, setFormData] = useState({
        course: "",
        time: "",
        franchiseId: "",
    });
    // State for course options fetched from the database.
    const [courseOptions, setCourseOptions] = useState([]);
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
                const options = data.map((course) => course.course);
                setCourseOptions(options);
            }
            catch (error) {
                console.error("Error fetching courses", error);
                toast.error("Error fetching courses");
            }
        };
        fetchCourseData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
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
        }
        catch (error) {
            console.error("Error adding batch:", error);
            toast.error("Failed to add batch");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.formContainer, children: [_jsx("h2", { children: "Add Batch" }), _jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: styles.form, children: [_jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "course", children: "Course" }), _jsxs("select", { id: "course", name: "course", value: formData.course, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select Course" }), courseOptions.map((option, index) => (_jsx("option", { value: option, children: option }, index)))] })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "time", children: "Time" }), _jsx("input", { type: "text", id: "time", name: "time", value: formData.time, onChange: handleChange, required: true })] })] }), _jsx("button", { type: "submit", className: styles.submitBtn, children: "Submit" })] })] }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000 })] }));
};
export default AddBatchForm;
