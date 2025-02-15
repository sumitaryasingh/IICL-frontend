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
  enrollmentNumber: string;
  status: "Active" | "Completed";
  marksheet: string;       // URL or identifier for the marksheet
  certificate: string;     // URL or identifier for the certificate
  institute: string;       // Institute name
  location: string;        // Location
  marks: number;           // Overall marks obtained (e.g., out of 800)
  grade: string;           // Grade achieved
  date: string;            // Date (e.g., exam or certificate date)
  rollNumber: string;      // Roll number
  certificateNumber: string; // Certificate number
  organization: string;    // Organization (e.g., IICL)
  subjects: Subject[];     // Subjects and their marks details
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
    course: "B.Sc Computer Science",
    enrollmentNumber: "ENR001",
    status: "Active",
    marksheet: "/marksheet/john",
    certificate: "/certificate/john",
    institute: "ABC Institute",
    location: "Cityville",
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
  }
  // Add more sample students as needed...
];

/**
 * GET API call to fetch student data.
 * If the call fails, the function returns fallback sample data.
 */
export const fetchStudents = async (): Promise<StudentData[]> => {
  try {
    // Replace with your actual API endpoint.
    const response = await axios.get<StudentData[]>("/api/students/get-students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
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
  image?: File | null;
}

/**
 * POST API call to submit new student data.
 * The function creates a FormData object to handle file uploads (if an image is provided).
 */
export const submitStudentData = async (data: NewStudentData): Promise<any> => {
  try {
    const formData = new FormData();

    // Append each key/value pair to the FormData.
    for (const key in data) {
      // Skip the "image" key if no file is provided.
      if (key === "image" && !data.image) continue;
      const value = data[key as keyof NewStudentData];
      formData.append(key, value instanceof File ? value : String(value));
    }

    // POST the form data using axios.
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
