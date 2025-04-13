// services/franchiseEnquiryService.ts
import axios from "axios";
import axioInstance from "../api/axiosInstance";

export interface FranchiseEnquiry {
  id: number;
  applyingFor: string;
  centerStatus: string;
  branchName: string;
  directorName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  facilities: string[];
  existingFranchise: string;
  additionalInfo?: string;
}

export const fetchFranchiseEnquiries = async (): Promise<FranchiseEnquiry[]> => {
  try {
    // Replace with your actual API endpoint:
    const response = await axioInstance.get<FranchiseEnquiry[]>("/api/franchise-enquiries");
    return response.data;
  } catch (error) {
    console.error("Error fetching franchise enquiries:", error);
    // Fallback sample data
    const sampleEnquiries: FranchiseEnquiry[] = [
      {
        id: 1,
        applyingFor: "franchise",
        centerStatus: "planning",
        branchName: "ABC Institute",
        directorName: "John Doe",
        email: "john@example.com",
        phoneNumber: "9876543210",
        whatsappNumber: "9876543210",
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        facilities: ["directorCabin", "reception", "practicalLab"],
        existingFranchise: "no",
        additionalInfo: "Looking forward to collaboration.",
      }
    ];
    return sampleEnquiries;
  }
};
