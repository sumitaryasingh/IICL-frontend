// batchService.ts
import axios from "axios";

// Define the interface for the batch data (this should match what your form collects)
export interface BatchData {
  course: string;
  time: string;
}

// Base URL for your API (this can be stored in an environment variable)
// const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
// console.log(API_URL)

// Function to add a new batch
export const addBatch = async (data: BatchData): Promise<any> => {
  try {
    // Send a POST request to your backend API endpoint for adding batches
    const response = await axios.post(`/api/batch/add-batch`, data);
    return response.data;
  } catch (error) {
    // You can do additional error handling/logging here
    throw error;
  }
};
