import React from "react";
interface IMark {
    subject: string;
    theoryMaxMarks: number;
    theoryObtainedMarks: number;
    practicalMaxMarks: number;
    practicalObtainedMarks: number;
}
export interface IStudent {
    name: string;
    enrollmentId: string;
    certificateNumber: string;
    course: string;
    fatherName: string;
    motherName: string;
    institute: string;
    location: string;
    registrationId: string;
    marks: IMark[];
    image?: {
        data: any;
        contentType: string;
    };
}
declare const Certificate: React.FC;
export default Certificate;
