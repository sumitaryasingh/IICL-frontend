import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/AddBatchForm.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBatch, getBatchById, updateBatch } from "../../services/batchService";
import { getCourses } from "../../services/dashboardHome";
const AddBatchForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        course: "",
        time: "",
        franchiseId: "",
    });
    const [courseOptions, setCourseOptions] = useState([]);
    useEffect(() => {
        const storedFranchiseId = localStorage.getItem("franchiseId") || "";
        setFormData((prev) => ({ ...prev, franchiseId: storedFranchiseId }));
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
        const fetchBatchToEdit = async () => {
            if (!id)
                return;
            try {
                const batch = await getBatchById(id);
                setFormData({
                    course: batch.course,
                    time: batch.time,
                    franchiseId: batch.franchiseId || storedFranchiseId,
                });
            }
            catch (error) {
                console.error("Error fetching batch", error);
                toast.error("Failed to load batch data");
            }
        };
        fetchCourseData();
        fetchBatchToEdit();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.course || !formData.time.trim()) {
            toast.error("Course and Time are required");
            return;
        }
        try {
            const payload = {
                ...formData,
                franchiseId: localStorage.getItem("franchiseId") || "",
            };
            if (id) {
                await updateBatch(id, payload);
                toast.success("Batch updated successfully!");
            }
            else {
                await addBatch(payload);
                toast.success("Batch added successfully!");
            }
            setFormData({ course: "", time: "", franchiseId: payload.franchiseId });
        }
        catch (error) {
            console.error("Error submitting batch:", error);
            toast.error("Failed to submit batch");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.formContainer, children: [_jsx("h2", { children: id ? "Edit Batch" : "Add Batch" }), _jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: styles.form, children: [_jsxs("div", { className: styles.formRow, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "course", children: "Course" }), _jsxs("select", { id: "course", name: "course", value: formData.course, onChange: handleChange, required: true, children: [_jsx("option", { value: "", children: "Select Course" }), courseOptions.map((option, index) => (_jsx("option", { value: option, children: option }, index)))] })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "time", children: "Time" }), _jsx("input", { type: "text", id: "time", name: "time", value: formData.time, onChange: handleChange, required: true })] })] }), _jsx("button", { type: "submit", className: styles.submitBtn, children: id ? "Update" : "Submit" })] })] }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000 })] }));
};
export default AddBatchForm;
