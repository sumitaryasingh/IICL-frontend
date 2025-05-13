import axios from "axios";
import axioInstance from "../api/axiosInstance";

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
  password:string;
  franchiseId?:number;
  centerId?:string;
  role?:string;
}

// Define your API base URL (set an environment variable if needed)
// const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Function to submit franchise data
export const submitFranchiseData = async (data: FranchiseData): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    const response = await axioInstance.post(`/api/franchise/add-franchise`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    // You can further process or log the error here before rethrowing
    console.log("error in creating franchise")
    throw  error;
  }
};

// Function to fetch franchise data
export const fetchFranchiseById = async (franchiseId:string): Promise<FranchiseData[]> => {
  try {
    const response = await axioInstance.get<FranchiseData[]>(`/api/franchise/get-franchise/${franchiseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching franchise data:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};
