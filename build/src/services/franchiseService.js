import axios from "axios";
// Define your API base URL (set an environment variable if needed)
// const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
// Function to submit franchise data
export const submitFranchiseData = async (data) => {
    try {
        const response = await axios.post(`/api/franchise/add-franchise`, data);
        return response.data;
    }
    catch (error) {
        // You can further process or log the error here before rethrowing
        console.log("error in creating franchise");
        throw error;
    }
};
