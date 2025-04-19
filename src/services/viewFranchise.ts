// services/viewFranchise.ts
import axioInstance from "../api/axiosInstance";

export interface FranchiseData {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  directorName: string;
  instituteName: string;
  address: string;
  mobile: string;
  email: string;
  aadharId: string;
  franchiseId: number;
  city?:string;
  state?:string;
  password?:string;
  
}

// Sample data for fallback
const sampleData: FranchiseData[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    directorName: "Alice Smith",
    instituteName: "Institute A",
    address: "123 Main St, Cityville",
    mobile: "1234567890",
    email: "john.doe@example.com",
    aadharId: "123456789012",
    franchiseId: 54321,
    
  }
];

// Fetch all franchise data
export const fetchFranchiseData = async (): Promise<FranchiseData[]> => {
  try {
    const response = await axioInstance.get<FranchiseData[]>("/api/franchise/get-franchises");
    return response.data;
  } catch (error) {
    console.error("Error fetching franchise data:", error);
    return sampleData; // Return sample data on failure
  }
};


// Edit franchise data
export const editFranchiseData = async (_id: string, data:FranchiseData): Promise<FranchiseData> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const response = await axioInstance.put(`/api/franchise/edit-franchise/${_id}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing franchise data:", error);
    throw error;
  }
};

// Delete franchise data
export const deleteFranchiseData = async (franchiseId: string): Promise<void> => {
  try {
    await axioInstance.delete(`/api/franchise/delete-franchise/${franchiseId}`);
  } catch (error) {
    console.error("Error deleting franchise data:", error);
    throw error;
  }
};