import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import axioInstance from "../api/axiosInstance";

// Error response interface
interface ErrorResponseData {
  message: string;
}

// Interfaces
interface LoginData {
  email: string;
  password: string;
  franchiseId?: number;
  adminId?: number;
}

interface ResponseData {
  message: string;
  user: {
    role: "admin" | "franchise";
    email: string;
  };
  franchiseId?: number;
  adminId?: number;
  data?: {
    franchises?: any[];
    students?: any[];
  };
}

interface RoleCheckResponse {
  role: "admin" | "franchise";
}

// ✅ Check user role before showing respective form fields
export const checkUserRole = async (email: string): Promise<RoleCheckResponse> => {
  try {
    const response = await axioInstance.post<RoleCheckResponse>("/api/auth/check-role", { email });
    return response.data;
  } catch (error) {
    console.error("❌ Role check error:", error);
    throw error;
  }
};

// ✅ Login function
export const loginUser = async (data: LoginData): Promise<ResponseData> => {
  try {
    const apiUrl = "/api/auth/login";

    const response = await axioInstance.post<ResponseData>(apiUrl, data, {
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
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponseData>;
    console.error("❌ Axios Error:", axiosError);
    toast.error(axiosError?.response?.data?.message || "Login failed");
    throw error;
  }
};

// ✅ Logout function
export const logoutService = async (): Promise<{ message: string }> => {
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
  } catch (error) {
    console.error("❌ Logout Error:", error);
    toast.error("Logout failed");
    throw error;
  }
};
