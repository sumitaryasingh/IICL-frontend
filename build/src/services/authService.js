import { toast } from "react-toastify";
import axioInstance from "../api/axiosInstance";
// ✅ Check user role before showing respective form fields
export const checkUserRole = async (email) => {
    try {
        const response = await axioInstance.post("/api/auth/check-role", { email });
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
        const response = await axioInstance.post(apiUrl, data, {});
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
        const response = await axioInstance.post(apiUrl, {}, { withCredentials: true });
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
export const changePassword = async (email, newPassword, currentPassword) => {
    try {
        const apiUrl = "/api/auth/change-password";
        const response = await axioInstance.post(apiUrl, {
            email,
            newPassword,
            currentPassword,
        });
        if (response.data.success) {
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message || "Password change failed");
        }
        return response.data;
    }
    catch (error) {
        const axiosError = error;
        console.error("❌ Change Password Error:", axiosError);
        toast.error(axiosError?.response?.data?.message || "Password change failed");
        throw error;
    }
};
