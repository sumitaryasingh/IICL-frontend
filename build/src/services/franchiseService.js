import axioInstance from "../api/axiosInstance";
// Define your API base URL (set an environment variable if needed)
// const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
// Function to submit franchise data
export const submitFranchiseData = async (data) => {
    try {
        const response = await axioInstance.post(`/api/franchise/add-franchise`, data);
        return response.data;
    }
    catch (error) {
        // You can further process or log the error here before rethrowing
        console.log("error in creating franchise");
        throw error;
    }
};
// Function to fetch franchise data
export const fetchFranchiseById = async (franchiseId) => {
    try {
        const response = await axioInstance.get(`/api/franchise/get-franchise/${franchiseId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching franchise data:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};
