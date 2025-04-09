// services/studentService.ts
import axios from "axios";
// -------------------------------------------------
// Fallback Data
// -------------------------------------------------
const sampleStudents = [
    {
        _id: "233jsnc",
        __v: 12234,
        imageBase64: "hey",
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        course: "DCA (Diploma in Computer Application)",
        fatherName: "John Pandey",
        motherName: "Elizabeth Chaubey",
        batch: "unknown",
        dob: "unknown",
        gender: "unknown",
        idProof: "unknown",
        idProofNumber: "unknown",
        qualification: "unknown",
        address: "unknown",
        registrationDate: "unknown",
        sessionFrom: "unknown",
        sessionTo: "unknown",
        enrollmentId: "ENR001",
        registrationId: "123456",
        status: "Active",
        marksheet: "/marksheet/john",
        certificate: "/certificate/john",
        institute: "ABC Institute",
        location: "Cityville",
        percentage: 79,
        marks: 680,
        grade: "A",
        date: "2023-07-15",
        rollNumber: "R001",
        certificateNumber: "CERT001",
        organization: "IICL",
        image: ["/images/john1.jpg", "/images/john2.jpg"],
    },
];
// -------------------------------------------------
// Student Data API Calls
// -------------------------------------------------
// GET: Fetch students for a given franchise
export const fetchStudents = async (franchiseId) => {
    try {
        const endpoint = franchiseId
            ? `/api/student/get-studentsList/${franchiseId}`
            : "/api/student/get-all-students";
        const response = await axios.get(endpoint, {
            withCredentials: true, // ✅ Important to include this
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching students:", error);
        return sampleStudents;
    }
};
// POST: Submit new student data with file upload
export const submitStudentData = async (data) => {
    try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // The image field must be a File object.
        const response = await axios.post("/api/student/add-student", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error in submitStudentData:", error);
        throw error;
    }
};
// GET: Fetch student data by enrollmentId
export const getStudentDataByEnrollmentId = async (enrollmentId) => {
    try {
        const response = await axios.get(`/api/student/get-studentData/${enrollmentId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching student data by enrollmentId:", error);
        throw error;
    }
};
// PUT: Edit student data (with optional file upload)
export const editStudentData = async (enrollmentId, data) => {
    try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "image" && !value)
                return;
            formData.append(key, value);
        });
        const response = await axios.put(`/api/student/edit-studentData/${enrollmentId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error editing student data:", error);
        throw error;
    }
};
// GET: Fetch all students
export const getAllStudents = async () => {
    try {
        const response = await axios.get("/api/student/get-all-students");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching all students:", error);
        throw error;
    }
};
// -------------------------------------------------
// Student Marks API Calls
// -------------------------------------------------
// POST: Add or edit student marks by enrollmentId
export const addEditStudentMarksByEnrollmentId = async (enrollmentId, marksData) => {
    try {
        const response = await axios.post(`/api/student/addEditStudentMarks/${enrollmentId}`, marksData);
        return response.data;
    }
    catch (error) {
        console.error("Error saving student marks:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to save marks.");
    }
};
// GET: Fetch all marks for a student by enrollmentId
export const getStudentMarksByEnrollmentId = async (enrollmentId) => {
    try {
        const response = await axios.get(`/api/student/marks/${enrollmentId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching student marks:", error);
        throw error;
    }
};
// PUT: Update a student's mark for a given subject
export const updateStudentMarkByEnrollmentId = async (student, mark) => {
    try {
        const response = await axios.put(`/api/student/marks/${student.enrollmentId}`, mark);
        return response.data;
    }
    catch (error) {
        console.error("Error updating student mark:", error);
        throw error;
    }
};
// DELETE: Delete a student's mark for a given subject
export const deleteStudentMarkByEnrollmentId = async (student, subject) => {
    try {
        console.log("Deleting mark for enrollmentId:", student.enrollmentId, "and subject:", subject);
        const response = await axios.delete(`/api/student/marks/${student.enrollmentId}`, {
            data: { subject },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error deleting student mark:", error);
        throw error;
    }
};
