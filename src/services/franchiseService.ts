import axios from "axios";

// Define an interface for the franchise data based on your form fields
export interface FranchiseData {
  firstName: string;
  lastName: string;
  dob: string;
  directorName: string;
  instituteName: string;
  city:string;
  state:string;
  address: string;
  mobile: string;
  email: string;
  aadharId: string;
  franchiseId?:number;
}

// Define your API base URL (set an environment variable if needed)
// const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Function to submit franchise data
export const submitFranchiseData = async (data: FranchiseData): Promise<any> => {
  try {
    const response = await axios.post(`/api/franchise/add-franchise`, data);
    return response.data;
  } catch (error) {
    // You can further process or log the error here before rethrowing
    throw  error;
  }
};
