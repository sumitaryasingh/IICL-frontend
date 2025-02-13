import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles/AddPhoto.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadPhoto } from "../../services/photoService";

const AddPhoto: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Handle file selection and create a preview URL
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Optional: validate file size/type here before setting state
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="photo">Select Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        {previewUrl && (
          <div className={styles.preview}>
            <img src={previewUrl} alt="Preview" className={styles.previewImage} />
          </div>
        )}
        <button type="submit" className={styles.submitBtn}>
          Upload
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddPhoto;
