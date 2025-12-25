// services/studentService.ts
import axioInstance from "../api/axiosInstance";
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
        const response = await axioInstance.get(endpoint, {
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
        const response = await axioInstance.post("/api/student/add-student", formData, {
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
        const response = await axioInstance.get(`/api/student/get-studentData/${enrollmentId}`);
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
        const response = await axioInstance.put(`/api/student/edit-studentData/${enrollmentId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error editing student data:", error);
        throw error;
    }
};
// GET: Fetch all students (handles both paginated and non-paginated responses)
export const getAllStudents = async () => {
    try {
        // First, try to get all students with max limit (100) using pagination
        let response;
        try {
            response = await axioInstance.get("/api/student/get-all-students", {
                params: {
                    page: 1,
                    limit: 100, // Use max limit to get as many as possible
                },
                withCredentials: true,
            });
        }
        catch (paginationError) {
            // If pagination fails, try without pagination parameters (legacy API)
            console.warn("Pagination parameters not supported, trying legacy format");
            response = await axioInstance.get("/api/student/get-all-students", {
                withCredentials: true,
            });
            return response.data;
        }
        // Check if response is paginated format
        if (response.data && typeof response.data === 'object' && 'students' in response.data) {
            const paginatedResponse = response.data;
            const allStudents = [...paginatedResponse.students];
            // If there are more pages, fetch them
            if (paginatedResponse.pagination.totalPages > 1) {
                const totalPages = paginatedResponse.pagination.totalPages;
                const limit = paginatedResponse.pagination.limit;
                // Fetch remaining pages in parallel for better performance
                const pagePromises = [];
                for (let page = 2; page <= totalPages; page++) {
                    pagePromises.push(axioInstance.get("/api/student/get-all-students", {
                        params: {
                            page,
                            limit,
                        },
                        withCredentials: true,
                    }).then(res => res.data));
                }
                const pageResponses = await Promise.all(pagePromises);
                pageResponses.forEach(pageResponse => {
                    allStudents.push(...pageResponse.students);
                });
            }
            return allStudents;
        }
        // Non-paginated response (legacy format)
        return response.data;
    }
    catch (error) {
        console.error("Error fetching all students:", error);
        console.error("Error details:", error.response?.data || error.message);
        throw error;
    }
};
// GET: Fetch all students with pagination and optional search
export const getAllStudentsPaginated = async (page = 1, limit = 10, search = "") => {
    try {
        const params = {
            page,
            limit: Math.min(limit, 100), // Enforce max limit of 100
        };
        // Only include search parameter if it's not empty
        if (search && search.trim()) {
            params.search = search.trim();
        }
        const response = await axioInstance.get("/api/student/get-all-students", {
            params,
            withCredentials: true,
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching paginated students:", error);
        throw error;
    }
};
// -------------------------------------------------
// Student Marks API Calls
// -------------------------------------------------
// POST: Add or edit student marks by enrollmentId
export const addEditStudentMarksByEnrollmentId = async (enrollmentId, marksData) => {
    try {
        const response = await axioInstance.post(`/api/student/addEditStudentMarks/${enrollmentId}`, marksData);
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
        const response = await axioInstance.get(`/api/student/marks/${enrollmentId}`);
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
        const response = await axioInstance.put(`/api/student/marks/${student.enrollmentId}`, mark);
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
        const response = await axioInstance.delete(`/api/student/marks/${student.enrollmentId}`, {
            data: { subject },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error deleting student mark:", error);
        throw error;
    }
};
export const deleteStudentData = async (studentId) => {
    try {
        const response = await axioInstance.delete(`api/student/delete-student/${studentId}`);
        if (response.status !== 200) {
            throw new Error("Failed to delete student");
        }
    }
    catch (error) {
        console.error("Error deleting student:", error);
        throw error;
    }
};
// POST: Set issue date for a student
export const setStudentIssueDate = async (enrollmentId, issueDate) => {
    try {
        const response = await axioInstance.post(`/api/student/set-issue-date/${enrollmentId}`, { issueDate });
        return response.data;
    }
    catch (error) {
        console.error("Error setting issue date:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to set issue date.");
    }
};
//updateStudentStatus
export const updateStudentStatus = async (enrollmentId, status) => {
    try {
        const response = await axioInstance.post(`/api/student/updateCertificationStatus/${enrollmentId}`, { status });
        return response.data;
    }
    catch (error) {
        console.error("Error updating student status:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update student status.");
    }
};
