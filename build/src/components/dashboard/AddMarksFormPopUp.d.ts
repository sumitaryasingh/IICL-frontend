import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
export interface Mark {
    subject: string;
    theoryMaxMarks: number;
    theoryObtainedMarks: number;
    practicalMaxMarks: number;
    practicalObtainedMarks: number;
}
interface StudentProps {
    student: any;
    setIsMarksModalVisible: (visible: boolean) => void;
    StudentMarks: Mark[];
    onMarksUpdate: (updatedMarks: Mark[]) => void;
}
declare const AddMarksFormPopUp: React.FC<StudentProps>;
export default AddMarksFormPopUp;
