// services/franchiseEnquiryService.ts
import axios from "axios";
export const fetchFranchiseEnquiries = async () => {
    try {
        // Replace with your actual API endpoint:
        const response = await axios.get("/api/franchise-enquiries");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching franchise enquiries:", error);
        // Fallback sample data
        const sampleEnquiries = [
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
