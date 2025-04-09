import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./styles/AddPhoto.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadPhoto } from "../../services/photoService";
const AddPhoto = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    // Handle file selection and create a preview URL
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Optional: validate file size/type here before setting state
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.error("Please select a photo to upload.");
            return;
        }
        try {
            await uploadPhoto(selectedFile);
            toast.success("Photo uploaded successfully!");
            setSelectedFile(null);
            setPreviewUrl("");
        }
        catch (error) {
            console.error("Error uploading photo:", error);
            toast.error("Failed to upload photo. Please try again.");
        }
    };
    return (_jsxs("div", { className: styles.container, children: [_jsx("h2", { children: "Upload Photo" }), _jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { htmlFor: "photo", children: "Select Photo" }), _jsx("input", { type: "file", id: "photo", name: "photo", accept: "image/*", onChange: handleFileChange, required: true })] }), previewUrl && (_jsx("div", { className: styles.preview, children: _jsx("img", { src: previewUrl, alt: "Preview", className: styles.previewImage }) })), _jsx("button", { type: "submit", className: styles.submitBtn, children: "Upload" })] }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000 })] }));
};
export default AddPhoto;
