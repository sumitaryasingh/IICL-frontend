import axios from "axios";
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
// const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const fetchStudentDetails = async (enrollmentId) => {
    try {
        const response = await axios.post(`/api/student-details`, { enrollmentId });
        return jsonData;
        // return response.data;
    }
    catch (error) {
        console.error("Error fetching student details:", error);
        throw error;
    }
};
