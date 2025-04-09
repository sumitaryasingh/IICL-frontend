import axios from "axios";
import { toast } from "react-toastify";
// ✅ Check user role before showing respective form fields
export const checkUserRole = async (email) => {
    try {
        const response = await axios.post("/api/auth/check-role", { email });
        return response.data;
    }
    catch (error) {
        console.error("❌ Role check error:", error);
        throw error;
    }
};
// ✅ Login function
export const loginUser = async (data) => {
    try {
        const apiUrl = "/api/auth/login";
        const response = await axios.post(apiUrl, data, {
            withCredentials: true,
        });
        const { user, franchiseId, adminId } = response.data;
        // Set role in localStorage
        if (user?.role) {
            localStorage.setItem("role", user.role);
        }
        // Set relevant ID based on role
        if (user.role === "admin" && adminId !== undefined) {
            localStorage.setItem("adminId", adminId.toString()); // ✅ fixed casing from 'AdminId'
        }
        if (user.role === "franchise" && franchiseId !== undefined) {
            localStorage.setItem("franchiseId", franchiseId.toString());
        }
        toast.success(response.data.message);
        return response.data;
    }
    catch (error) {
        const axiosError = error;
        console.error("❌ Axios Error:", axiosError);
        toast.error(axiosError?.response?.data?.message || "Login failed");
        throw error;
    }
};
// ✅ Logout function
export const logoutService = async () => {
    try {
        const apiUrl = "/api/auth/logout";
        const response = await axios.post(apiUrl, {}, { withCredentials: true });
        if (response.data.clearLocalStorage) {
            localStorage.removeItem("franchiseId");
            localStorage.removeItem("adminId"); // ✅ fixed casing
            localStorage.removeItem("AdminId"); // ✅ fixed casing
            localStorage.removeItem("role");
        }
        toast.success(response.data.message);
        return response.data;
    }
    catch (error) {
        console.error("❌ Logout Error:", error);
        toast.error("Logout failed");
        throw error;
    }
};
