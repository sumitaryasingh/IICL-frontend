import axios from "axios";

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
        console.log("This is formData:", formData);

        // Make sure to replace with the actual backend endpoint.
        const response = await axios.post(`/api/contact/contactUs`, formData);

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
