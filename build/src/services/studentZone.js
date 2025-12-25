import axioInstance from "../api/axiosInstance";
const jsonData = {
    "success": true,
    "student": {
        "studentName": "AKDAS ALI",
        "email": "AKDASALI46@GMAIL.COM",
        "enrollmentId": "STP414520653976",
        "fatherName": "MOHAMMAD ASLAM",
        "motherName": "NIKHAT PARWEEN",
        "dob": "08-04-2003",
        "centerName": "ICOMPUTER EDUCATION, SIWAN, BIHAR",
        "courseName": "ADVANCE DIPLOMA IN COMPUTER APPLICATION (ADCA)",
        "duration": "12 MONTHS",
        "registrationDate": "12-05-2023",
        "session": "12-05-2022 TO 12-05-2023"
    }
};
export const fetchStudentDetails = async (enrollmentId) => {
    try {
        const response = await axioInstance.get(`/api/studentDetails/student-details/${enrollmentId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching student details:", error);
        throw error;
    }
};
export const checkStudentExistsOrNot = async (enrollmentId) => {
    try {
        const response = await axioInstance.post(`/api/studentDetails/check-student-exists`, { enrollmentId });
        return response.data.exists;
    }
    catch (error) {
        console.error("Error checking student existence:", error);
        throw error;
    }
};
