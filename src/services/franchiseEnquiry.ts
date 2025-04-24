// services/franchiseEnquiryService.ts
import axios from "axios";
import axioInstance from "../api/axiosInstance";

export interface FranchiseEnquiry {
  _id: number;
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
    const response = await axioInstance.get<FranchiseEnquiry[]>("/api/franchise/get-franchise-enquiry");
    return response.data;
  } catch (error) {
    console.error("Error fetching franchise enquiries:", error);
    // Fallback sample data
    const sampleEnquiries: FranchiseEnquiry[] = [
      {
        _id: 1,
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

export const deleteFranchiseEnquiry = async (id: number): Promise<number> => {
  try {
    // Assuming your backend route is DELETE /api/franchise/delete-franchise-enquiry/:id
    await axioInstance.delete(`/api/franchise/delete-franchise-enquiry/${id}`);
    return id;
  } catch (error: any) {
    console.error(`Error deleting enquiry ${id}:`, error.response ?? error.message);
    throw new Error(error.response?.data?.message || "Failed to delete franchise enquiry.");
  }
};

