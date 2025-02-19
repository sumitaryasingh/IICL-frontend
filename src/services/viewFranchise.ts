// services/viewFranchise.ts
import axios from "axios";

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
const sampleData: FranchiseData[] = [
  {
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    directorName: "Alice Smith",
    instituteName: "Institute A",
    address: "123 Main St, Cityville",
    mobile: "1234567890",
    email: "john.doe@example.com",
    aadharId: "123456789012",
  }
  // Add more sample items as needed...
];
export const fetchFranchiseData = async (): Promise<FranchiseData[]> => {
  try {
    const response = await axios.get<FranchiseData[]>("/api/view-franchise");
    return response.data;
  } catch (error) {
    console.error("Error fetching franchise data:", error);
    // sample data
    return sampleData;
  }
};
