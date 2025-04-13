// batchService.ts
import axioInstance from "../api/axiosInstance";

// Define the interface for the batch data (this should match what your form collects)
export interface BatchData {
  _id: string;
  course: string;
  time: string;
  franchiseId?:string;
}

// Function to add a new batch
export const addBatch = async (data: BatchData): Promise<any> => {
  try {
    // Send a POST request using axioInstance
    const response = await axioInstance.post(`/api/batch/add-batch`, data);
    return response.data;
  } catch (error) {
    // Additional error handling/logging
    throw error;
  }
};

//deleteBatchData
export const deleteBatchData = async (batchId: string): Promise<any> => {
  try {
    const response = await axioInstance.delete(`/api/batch/delete-batch/${batchId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting batch data:", error);
    throw error; 
  }
};



// Function to get all batches
export const fetchBatchOptions = async (franchiseId:string): Promise<BatchData[]> => {
  try {
    // Send a GET request using axioInstance
    const response = await axioInstance.get<BatchData[]>(`/api/batch/get-batches/${franchiseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batch options:", error);
    // Fallback sample data
    const sampleData: BatchData[] = [
      {_id:'1', course: "B.Sc Computer Science", time: "9:00 AM - 11:00 AM" },
      { _id:'2',  course: "BBA", time: "11:00 AM - 1:00 PM" },
      { _id:'3',  course: "MBA", time: "2:00 PM - 4:00 PM" },
      { _id:'4',  course: "MCA", time: "10:00 AM - 12:00 PM" },
      { _id:'5',  course: "B.Tech", time: "1:00 PM - 3:00 PM" },
      { _id:'6',  course: "Diploma in IT", time: "3:30 PM - 5:30 PM" },
      // Add more sample items as needed...
    ];
    return sampleData;
  }
};

// Function to get a batch by ID
export const getBatchById = async (id: string): Promise<BatchData> => {
  try {
    const response = await axioInstance.get<BatchData>(`/api/batch/get-batch/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batch by ID:", error);
    throw error;
  }
};

// Function to update a batch
export const updateBatch = async (id: string, data: BatchData): Promise<any> => {
  try {
    const response = await axioInstance.put(`/api/batch/update-batch/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating batch:", error);
    throw error;
  }
};
