export interface StudentData {
    _id: string;
    __v: number;
    imageBase64: string;
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
    registrationId: string;
    franchiseId?: number | string;
    status: "Active" | "Completed";
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
    registrationId: string;
}
export interface Mark {
    subject: string;
    theoryMaxMarks: number;
    theoryObtainedMarks: number;
    practicalMaxMarks: number;
    practicalObtainedMarks: number;
}
export declare const fetchStudents: (franchiseId: string) => Promise<StudentData[]>;
export declare const submitStudentData: (data: NewStudentData) => Promise<any>;
export declare const getStudentDataByEnrollmentId: (enrollmentId: string) => Promise<NewStudentData>;
export declare const editStudentData: (enrollmentId: string, data: NewStudentData) => Promise<any>;
export declare const getAllStudents: () => Promise<StudentData[]>;
export declare const addEditStudentMarksByEnrollmentId: (enrollmentId: string, marksData: any) => Promise<{
    status: boolean;
    message: string;
}>;
export declare const getStudentMarksByEnrollmentId: (enrollmentId: string) => Promise<Mark[]>;
export declare const updateStudentMarkByEnrollmentId: (student: any, mark: Mark) => Promise<Mark>;
export declare const deleteStudentMarkByEnrollmentId: (student: any, subject: string) => Promise<any>;
