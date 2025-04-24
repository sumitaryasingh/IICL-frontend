// services/studentService.ts
import axioInstance from "../api/axiosInstance";


export interface StudentData {
  _id:string;
  __v:number;
  imageBase64:string;
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  fatherName: string;
  motherName: string;
  batch: string;
  dob: string;
  gender: string;
  idProof: string;
  idProofNumber: string;
  qualification: string;
  address: string;
  registrationDate: string;
  sessionFrom: string;
  sessionTo: string;
  enrollmentId: string;
  registrationId:string;
  franchiseId?: number | string;
  status: any;
  marksheet: string;
  certificate: string;
  institute: string;
  location: string;
  percentage: number;
  marks: number;
  grade: string;
  date: string;
  rollNumber: string;
  certificateNumber: string;
  organization: string;
  image: any;
  certificationStatus?: string;
}

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
  registrationId:string;
}

export interface Mark {
  subject: string;
  theoryMaxMarks: number;
  theoryObtainedMarks: number;
  practicalMaxMarks: number;
  practicalObtainedMarks: number;
}

// -------------------------------------------------
// Fallback Data
// -------------------------------------------------

const sampleStudents: StudentData[] = [
  {
    _id:"233jsnc",
    __v:12234,
    imageBase64:"hey",
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
    registrationId:"123456",
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

export const fetchStudents = async (franchiseId: string): Promise<StudentData[]> => {
  try {
    const endpoint = franchiseId
      ? `/api/student/get-studentsList/${franchiseId}`
      : "/api/student/get-all-students";

    const response = await axioInstance.get<StudentData[]>(endpoint, {
      withCredentials: true, // ✅ Important to include this
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return sampleStudents;
  }
};



// POST: Submit new student data with file upload
export const submitStudentData = async (data: NewStudentData): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    // The image field must be a File object.
    const response = await axioInstance.post("/api/student/add-student", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error in submitStudentData:", error);
    throw error;
  }
};

// GET: Fetch student data by enrollmentId
export const getStudentDataByEnrollmentId = async (enrollmentId: string): Promise<NewStudentData> => {
  try {
    const response = await axioInstance.get<NewStudentData>(`/api/student/get-studentData/${enrollmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student data by enrollmentId:", error);
    throw error;
  }
};

// PUT: Edit student data (with optional file upload)
export const editStudentData = async (enrollmentId: string, data: NewStudentData): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && !value) return;
      formData.append(key, value as string | Blob);
    });
    const response = await axioInstance.put(`/api/student/edit-studentData/${enrollmentId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing student data:", error);
    throw error;
  }
};

// GET: Fetch all students
export const getAllStudents = async (): Promise<StudentData[]> => {
  try {
    const response = await axioInstance.get<StudentData[]>("/api/student/get-all-students");
    return response.data;
  } catch (error) {
    console.error("Error fetching all students:", error);
    throw error;
  }
};

// -------------------------------------------------
// Student Marks API Calls
// -------------------------------------------------

// POST: Add or edit student marks by enrollmentId
export const addEditStudentMarksByEnrollmentId = async (
  enrollmentId: string,
  marksData: any
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await axioInstance.post<{ status: boolean; message: string }>(
      `/api/student/addEditStudentMarks/${enrollmentId}`,
      marksData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error saving student marks:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to save marks.");
  }
};

// GET: Fetch all marks for a student by enrollmentId
export const getStudentMarksByEnrollmentId = async (enrollmentId: string): Promise<Mark[]> => {
  try {
    const response = await axioInstance.get<Mark[]>(`/api/student/marks/${enrollmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student marks:", error);
    throw error;
  }
};

// PUT: Update a student's mark for a given subject
export const updateStudentMarkByEnrollmentId = async (student: any, mark: Mark): Promise<Mark> => {
  try {
    const response = await axioInstance.put<Mark>(`/api/student/marks/${student.enrollmentId}`, mark);
    return response.data;
  } catch (error) {
    console.error("Error updating student mark:", error);
    throw error;
  }
};

// DELETE: Delete a student's mark for a given subject
export const deleteStudentMarkByEnrollmentId = async (student:any, subject: string): Promise<any> => {
  try {
    console.log("Deleting mark for enrollmentId:", student.enrollmentId, "and subject:", subject);
    const response = await axioInstance.delete(`/api/student/marks/${student.enrollmentId}`, {
      data: { subject },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting student mark:", error);
    throw error;
  }
};


export const deleteStudentData = async (studentId: string): Promise<void> => {
  try {
    const response = await axioInstance.delete(`api/student/delete-student/${studentId}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete student");
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

// POST: Set issue date for a student
export const setStudentIssueDate = async (
  enrollmentId: string,
  issueDate: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await axioInstance.post<{ status: boolean; message: string }>(
      `/api/student/set-issue-date/${enrollmentId}`,
      { issueDate }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error setting issue date:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to set issue date.");
  }
};

//updateStudentStatus
export const updateStudentStatus = async (
  enrollmentId: string,
  status: "enable" | "disable"
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await axioInstance.post<{ status: boolean; message: string }>(
      `/api/student/updateCertificationStatus/${enrollmentId}`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating student status:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update student status.");
  }
};


