// batchService.ts
import axios from "axios";

// Define the interface for the batch data (this should match what your form collects)
export interface BatchData {
  course: string;
  time: string;
}

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


// Function to get all batches
export const fetchBatchOptions = async (): Promise<any> => {
  try {
    // Send a GET request to your backend API endpoint for getting all batches
    const response = await axios.get(`/api/batch/get-batches`);
    return response.data;
  } catch (error) {
    // You can do additional error handling/logging here
    throw error;
  }
};
