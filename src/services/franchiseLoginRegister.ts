import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// const API_URL = import.meta.env.VITE_APP_API_BASE_URL; // Replace with your actual API base URL

// Define response structure
interface ResponseData {
    message: string;
    franchiseId: number; // This property should be returned by your API
}

interface ErrorResponseData {
    message: string;
}


// export const loginUser = async (data: { email: string; password: string, franchiseId:number }) => {
//     try {
//         const apiUrl = `/api/auth/login`; // FIXED: Ensured correct URL
//         console.log("API Request URL:", apiUrl); // Debugging
//         console.log("Login Data:", data);

//         const response = await axios.post<ResponseData>(apiUrl, data);
//         const franchiseId = response.data
//         console.log("this is the response data",franchiseId);
//         toast.success(response.data.message);

//         return response.data;
//     } catch (error) {
//         const axiosError = error as AxiosError<ErrorResponseData>;
//         console.error("Axios error:", axiosError); // Log full error
//         toast.error(axiosError?.response?.data?.message || "Login failed");
//         throw error;
//     }
// };


export const registerUser = async (data: { name?: string; email: string; password: string }) => {
    try {
        console.log("this is registerUser ::", data);
        const response = await axios.post<ResponseData>(`api/register`, data);
        toast.success(response.data.message); // Display success message
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>; // Typecast the error to AxiosError
        toast.error(axiosError?.response?.data?.message || "Registration failed"); // Display error message
    }
};
