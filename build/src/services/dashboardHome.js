import axioInstance from "../api/axiosInstance";
// Add a new course
export const addCourse = async (course) => {
    try {
        const response = await axioInstance.post("/api/course/add-course", course);
        return response.data;
    }
    catch (error) {
        console.error("Error adding course:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to add course.");
    }
};
// Get list of courses
export const getCourses = async () => {
    try {
        const response = await axioInstance.get("/api/course/get-course");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching courses:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch courses.");
    }
};
// Update an existing course
export const updateCourse = async (courseId, course) => {
    try {
        const response = await axioInstance.put(`/api/course/${courseId}`, course);
        return response.data;
    }
    catch (error) {
        console.error("Error updating course:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update course.");
    }
};
// Delete a course
export const deleteCourse = async (courseId) => {
    try {
        const response = await axioInstance.delete(`/api/course/delete-course/${courseId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting course:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to delete course.");
    }
};
