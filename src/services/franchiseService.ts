import axios from "axios";

// Define an interface for the franchise data based on your form fields
export interface FranchiseData {
  firstName: string;
  lastName: string;
  dob: string;
  directorName: string;
  instituteName: string;
  address: string;
  mobile: string;
  email: string;
  aadharId: string;
}

// Define your API base URL (set an environment variable if needed)
// const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

// Function to submit franchise data
export const submitFranchiseData = async (data: FranchiseData): Promise<any> => {
  try {
    const response = await axios.post(`api/franchises`, data);
    return response.data;
  } catch (error) {
    // You can further process or log the error here before rethrowing
    throw error;
  }
};
