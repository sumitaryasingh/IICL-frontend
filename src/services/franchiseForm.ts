import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const submitFranchiseForm = async (formData: any) => {
    try {
        console.log("this is formData ", formData)
        const response = await axios.post(`${API_URL}/api/franchise`, formData);
        return response.data; // Assuming the backend responds with an object that includes `success`
    } catch (error) {
        console.error('Axios error:', error);
        throw new Error('Failed to submit the form');
    }
};
