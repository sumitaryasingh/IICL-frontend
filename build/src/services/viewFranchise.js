// services/viewFranchise.ts
import axios from "axios";
// Sample data for fallback
const sampleData = [
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
export const fetchFranchiseData = async () => {
    try {
        const response = await axios.get("/api/franchise/get-franchises");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching franchise data:", error);
        return sampleData; // Return sample data on failure
    }
};
// Edit franchise data
export const editFranchiseData = async (_id, data) => {
    try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const response = await axios.put(`/api/franchise/edit-franchise/${_id}`, formData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error editing franchise data:", error);
        throw error;
    }
};
