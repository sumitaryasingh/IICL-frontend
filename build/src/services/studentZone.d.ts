export declare const fetchStudentDetails: (enrollmentId: string) => Promise<{
    success: boolean;
    student: {
        studentName: string;
        email: string;
        enrollmentId: string;
        fatherName: string;
        motherName: string;
        dob: string;
        centerName: string;
        courseName: string;
        duration: string;
        registrationDate: string;
        session: string;
    };
}>;
