import axios from "axios";
import axioInstance from "../api/axiosInstance";
// 
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface ContactFormResponse {
    success: boolean;
    message: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResponse> => {
    try {

        // Make sure to replace with the actual backend endpoint.
        const response = await axioInstance.post(`/api/contact/contactUs`, formData);

        return response.data; // Assuming the backend responds with a data object that includes `success`
    } catch (error: any) {
        console.error('Axios error:', error);

        // Check if the error has a response property, indicating a failed HTTP request
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to submit the form');
        } else if (error.request) {
            // No response received from the server
            console.error('Error request:', error.request);
            throw new Error('No response from the server. Please try again later.');
        } else {
            // Something went wrong in setting up the request
            console.error('Error message:', error.message);
            throw new Error('Failed to submit the form. Please try again later.');
        }
    }
};


export interface ContactEnquiry {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  }
  
  export const fetchContactEnquiries = async (): Promise<ContactEnquiry[]> => {
    try {
      // Replace with your actual API endpoint for contact enquiries
      const response = await axioInstance.get<ContactEnquiry[]>("/api/contact/get-contact");
      return response.data;
    } catch (error) {
      console.error("Error fetching contact enquiries:", error);
      // Fallback sample data if API call fails
      const sampleData: ContactEnquiry[] = [
        {
          _id: "1",
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "9876543210",
          message: "I would like to know more about your services.",
        }
      ];
      return sampleData;
    }
  };


  export const deleteContactEnquiry = async (id: string): Promise<void> => {
    try {
      // Adjust the endpoint to match your backend (replace as needed)
      const response = await axioInstance.delete(`/api/contact/delete-contact/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete student");
      }
    } catch (error: any) {
      console.error("Error deleting contact enquiry:", error);
      throw new Error("Failed to delete contact enquiry");
    }
  };