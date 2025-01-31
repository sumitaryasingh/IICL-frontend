import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const API_URL = '/api/'; // Replace with your actual API base URL

// Define response structure
interface ResponseData {
    message: string;
}

interface ErrorResponseData {
    message: string;
}

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        console.log("this is loginData ::", data);
        const response = await axios.post<ResponseData>(`${API_URL}login`, data);
        toast.success(response.data.message); // Display success message
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>; // Typecast the error to AxiosError
        toast.error(axiosError?.response?.data?.message || "Login failed"); // Display error message
    }
};

export const registerUser = async (data: { name?: string; email: string; password: string }) => {
    try {
        console.log("this is registerUser ::", data);
        const response = await axios.post<ResponseData>(`${API_URL}register`, data);
        toast.success(response.data.message); // Display success message
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>; // Typecast the error to AxiosError
        toast.error(axiosError?.response?.data?.message || "Registration failed"); // Display error message
    }
};
