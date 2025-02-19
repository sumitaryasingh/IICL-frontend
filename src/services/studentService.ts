// services/studentService.ts
import axios from "axios";

/**
 * Interface for subject marks details (used in student data).
 */
export interface Subject {
  subject: string;
  theory: number;
  lab: number;
  totalMarks: number;
  obtainedTheory: number;
  obtainedLab: number;
  obtainedTotal: number;
}




/**
 * Interface for student data as returned from the GET API.
 */
export interface StudentData {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  fatherName:string;
  motherName:string;
  enrollmentId: string;
  status: "Active" | "Completed";
  marksheet: string;       // URL or identifier for the marksheet
  certificate: string;     // URL or identifier for the certificate
  institute: string;       // Institute name
  location: string;        // Location
  percentage:number;
  marks: number;           // Overall marks obtained (e.g., out of 800)
  grade: string;           // Grade achieved
  date: string;            // Date (e.g., exam or certificate date)
  rollNumber: string;      // Roll number
  certificateNumber: string; // Certificate number
  organization: string;    // Organization (e.g., IICL)
  subjects: Subject[];     // Subjects and their marks details
  image: any; // Array of image URLs or identifiers
}

/**
 * Fallback sample student data in case the GET API call fails.
 */
const sampleStudents: StudentData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    course: "DCA (Diploma in Computer Application)",
    fatherName:"John Pandey",
    motherName:"Elizabeth Chaubey",
    enrollmentId: "ENR001",
    status: "Active",
    marksheet: "/marksheet/john",
    certificate: "/certificate/john",
    institute: "ABC Institute",
    location: "Cityville",
    percentage:79,
    marks: 680,
    grade: "A",
    date: "2023-07-15",
    rollNumber: "R001",
    certificateNumber: "CERT001",
    organization: "IICL",
    subjects: [
      {
        subject: "Mathematics",
        theory: 70,
        lab: 30,
        totalMarks: 100,
        obtainedTheory: 65,
        obtainedLab: 28,
        obtainedTotal: 93,
      },
      {
        subject: "Physics",
        theory: 70,
        lab: 30,
        totalMarks: 100,
        obtainedTheory: 60,
        obtainedLab: 27,
        obtainedTotal: 87,
      },
    ],
    image: ["/images/john1.jpg", "/images/john2.jpg"]
  }
  // Add more sample students as needed...
];

/**
 * GET API call to fetch student data.
 * If the call fails, the function returns fallback sample data.
 */
export const fetchStudents = async (franchiseId: string): Promise<StudentData[]> => {
  try {
    // Replace with your actual API endpoint.
    const response = await axios.get<StudentData[]>(`/api/student/get-studentsList/${franchiseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    // Ensure sampleStudents is defined and matches StudentData[]
    return sampleStudents;
  }
};

/**
 * Interface for new student data that is submitted via the POST API.
 * (This interface reflects the form fields required when adding a new student.)
 */
export interface NewStudentData {
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
  image: File;
  franchiseId: string;
  enrollmentId: string;
}

/**
 * POST API call to submit new student data.
 * The function creates a FormData object to handle file uploads (if an image is provided).
 */

export const submitStudentData = async (data: NewStudentData): Promise<any> => {
  try {
    const formData = new FormData();
    // Append all the fields to the FormData
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("fatherName", data.fatherName);
    formData.append("motherName", data.motherName);
    formData.append("phone", data.phone);
    formData.append("registrationDate", data.registrationDate);
    formData.append("sessionFrom", data.sessionFrom);
    formData.append("sessionTo", data.sessionTo);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("course", data.course);
    formData.append("batch", data.batch);
    formData.append("qualification", data.qualification);
    formData.append("idProof", data.idProof);
    formData.append("idProofNumber", data.idProofNumber);
    formData.append("franchiseId", data.franchiseId);
    formData.append("enrollmentId", data.enrollmentId);
    
    // Append the file. The 'image' field must be a File object.
    formData.append("image", data.image);

    // Use axios to POST the FormData. Axios will automatically set the correct headers for multipart/form-data.
    const response = await axios.post("/api/student/add-student", formData, {
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

export const getStudentDataByEnrollmentId = async (
  enrollmentId: string
): Promise<NewStudentData> => {
  try {
    const response = await axios.get<NewStudentData>(`/api/student/get-studentData/${enrollmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student data by enrollmentId:", error);
    throw error;
  }
};


export const editStudentData = async (
  enrollmentId: string,
  data: NewStudentData
): Promise<any> => {
  try {
    const formData = new FormData();
    // Append all the fields to the FormData
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("fatherName", data.fatherName);
    formData.append("motherName", data.motherName);
    formData.append("phone", data.phone);
    formData.append("registrationDate", data.registrationDate);
    formData.append("sessionFrom", data.sessionFrom);
    formData.append("sessionTo", data.sessionTo);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("course", data.course);
    formData.append("batch", data.batch);
    formData.append("qualification", data.qualification);
    formData.append("idProof", data.idProof);
    formData.append("idProofNumber", data.idProofNumber);
    formData.append("franchiseId", data.franchiseId);
    formData.append("enrollmentId", data.enrollmentId);
    
    // Append the image file if it exists.
    if (data.image) {
      formData.append("image", data.image);
    }
    
    // Use axios.put to update student data at the correct endpoint.
    const response = await axios.put(
      `/api/student/edit-studentData/${enrollmentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing student data:", error);
    throw error;
  }
};
