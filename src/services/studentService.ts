import axios from "axios";

// Define the interface for the student data matching your form fields.
export interface StudentData {
  name: string;
  email: string;
  fatherName: string;
  motherName: string;
  phone: string;
  registrationDate: string;
  sessionFrom: string;
  sessionTo: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  batch: string;
  qualification: string;
  idProof: string;
  idProofNumber: string;
  image?: File | null;
}

// Define your API base URL. (You can use an environment variable for production.)
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Function to submit student data to the backend
export const submitStudentData = async (data: StudentData): Promise<any> => {
  try {
    // Create a FormData instance to handle file upload (if image is provided)
    const formData = new FormData();

    // Append each field from the data. Using Object.entries to loop over key/value pairs.
    Object.entries(data).forEach(([key, value]) => {
      // If the key is "image" and value is null or undefined, skip appending.
      if (key === "image" && !value) return;
      formData.append(key, value as string | Blob);
    });

    // POST the form data using axios. The content-type will be set automatically.
    const response = await axios.post(`api/students`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in submitStudentData:", error);
    throw error;
  }
};
