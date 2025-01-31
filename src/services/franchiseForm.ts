import axios from "axios";

export const submitFranchiseForm = async (formData: any) => {
    try {
        console.log("this is formData ", formData)
        const response = await axios.post('/your-backend-endpoint', formData);
        return response.data; // Assuming the backend responds with an object that includes `success`
    } catch (error) {
        console.error('Axios error:', error);
        throw new Error('Failed to submit the form');
    }
};
