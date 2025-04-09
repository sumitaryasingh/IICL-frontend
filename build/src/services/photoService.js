// photoService.ts
import axios from "axios";
// Service function to upload a photo
export const uploadPhoto = async (file) => {
    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("photo", file);
    // Set your API base URL via environment variable or hard-code it
    const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
    try {
        // POST the formData to the endpoint (adjust '/photos' to your endpoint)
        const response = await axios.post(`/api/gallery/add-photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error in uploadPhoto:", error);
        throw error;
    }
};
