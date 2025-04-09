// batchService.ts
import axioInstance from "../api/axiosInstance";
// Function to add a new batch
export const addBatch = async (data) => {
    try {
        // Send a POST request using axioInstance
        const response = await axioInstance.post(`/api/batch/add-batch`, data);
        return response.data;
    }
    catch (error) {
        // Additional error handling/logging
        throw error;
    }
};
// Function to get all batches
export const fetchBatchOptions = async (franchiseId) => {
    try {
        // Send a GET request using axioInstance
        const response = await axioInstance.get(`/api/batch/get-batches/${franchiseId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching batch options:", error);
        // Fallback sample data
        const sampleData = [
            { course: "B.Sc Computer Science", time: "9:00 AM - 11:00 AM" },
            { course: "BBA", time: "11:00 AM - 1:00 PM" },
            { course: "MBA", time: "2:00 PM - 4:00 PM" },
            { course: "MCA", time: "10:00 AM - 12:00 PM" },
            { course: "B.Tech", time: "1:00 PM - 3:00 PM" },
            { course: "Diploma in IT", time: "3:30 PM - 5:30 PM" },
            // Add more sample items as needed...
        ];
        return sampleData;
    }
};
