import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const submitFranchiseForm = async (formData) => {
    try {
        console.log("this is formData ", formData);
        const response = await axios.post(`/api/franchise/franchise-enquiry`, formData);
        return response.data; // Assuming the backend responds with an object that includes `success`
    }
    catch (error) {
        console.error('Axios error:', error);
        throw new Error('Failed to submit the form');
    }
};
