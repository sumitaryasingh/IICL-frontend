import axios from "axios";
import axioInstance from "../api/axiosInstance";
const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const submitFranchiseForm = async (formData: any) => {
    try {
        const response = await axioInstance.post(`/api/franchise/franchise-enquiry`, formData);
        return response.data; // Assuming the backend responds with an object that includes `success`
    } catch (error) {
        console.error('Axios error:', error);
        throw new Error('Failed to submit the form');
    }
};


