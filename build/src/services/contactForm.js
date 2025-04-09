import axios from "axios";
export const submitContactForm = async (formData) => {
    try {
        console.log("This is formData:", formData);
        // Make sure to replace with the actual backend endpoint.
        const response = await axios.post(`/api/contact/contactUs`, formData);
        return response.data; // Assuming the backend responds with a data object that includes `success`
    }
    catch (error) {
        console.error('Axios error:', error);
        // Check if the error has a response property, indicating a failed HTTP request
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to submit the form');
        }
        else if (error.request) {
            // No response received from the server
            console.error('Error request:', error.request);
            throw new Error('No response from the server. Please try again later.');
        }
        else {
            // Something went wrong in setting up the request
            console.error('Error message:', error.message);
            throw new Error('Failed to submit the form. Please try again later.');
        }
    }
};
export const fetchContactEnquiries = async () => {
    try {
        // Replace with your actual API endpoint for contact enquiries
        const response = await axios.get("/api/contact");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching contact enquiries:", error);
        // Fallback sample data if API call fails
        const sampleData = [
            {
                id: 1,
                name: "Alice Johnson",
                email: "alice@example.com",
                phone: "9876543210",
                message: "I would like to know more about your services.",
            }
        ];
        return sampleData;
    }
};
