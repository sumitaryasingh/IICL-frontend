import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Table, Modal, Button } from "antd";
import styles from "./styles/MarkEntryForm.module.css";
import { getAllStudents } from "../../services/studentService";
import AddMarksFormPopUp from "./AddMarksFormPopUp";
const MarkEntryForm = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isMarksModalVisible, setIsMarksModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents();
                console.log("Fetched Students:", data);
                console.log("Fetched Students marks:", data[0].marks);
                const validData = (data || []).map((student, index) => ({
                    ...student,
                    enrollmentId: student.enrollmentId || `temp-${index}`,
                    id: student.id || `fallback-id-${index}`,
                    franchiseId: student.franchiseId ? String(student.franchiseId) : "unknown",
                    marks: Array.isArray(student.marks) ? student.marks : [], // Ensure marks array exists
                }));
                console.log("Processed Students:", validData);
                setStudents(validData);
            }
            catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);
    const handleMarksUpdate = (updatedMarks, studentId) => {
        setStudents((prevStudents) => prevStudents.map((student) => student.enrollmentId === studentId
            ? { ...student, marks: updatedMarks } // ✅ Update only the selected student’s marks
            : student));
    };
    // Group students by franchiseId
    const groupedStudents = useMemo(() => {
        return students.reduce((acc, student) => {
            const franchiseKey = String(student.franchiseId);
            if (!acc[franchiseKey]) {
                acc[franchiseKey] = [];
            }
            acc[franchiseKey].push(student);
            return acc;
        }, {});
    }, [students]);
    // Handle opening modal and setting selected student
    const handleAddMarksClick = (student) => {
        setSelectedStudent(student);
        setIsMarksModalVisible(true);
    };
    return (_jsxs("div", { className: styles.container, children: [Object.keys(groupedStudents).map((franchiseId) => (_jsxs("div", { className: styles.franchiseSection, children: [_jsxs("h2", { className: styles.heading, children: ["Franchise ", franchiseId] }), _jsx(Table, { dataSource: groupedStudents[franchiseId], pagination: {
                            current: currentPage,
                            pageSize: pageSize,
                            onChange: (page, size) => {
                                setCurrentPage(page);
                                setPageSize(size || 10);
                            },
                        }, rowKey: (record) => record.enrollmentId || `student-${record.id}`, className: styles.table, columns: [
                            { title: "Name", dataIndex: "name", key: "name" },
                            { title: "Enrollment ID", dataIndex: "enrollmentId", key: "enrollmentId" },
                            { title: "Franchise ID", dataIndex: "franchiseId", key: "franchiseId" },
                            { title: "Course", dataIndex: "course", key: "course" },
                            { title: "Batch", dataIndex: "batch", key: "batch" },
                            { title: "DOB", dataIndex: "dob", key: "dob" },
                            { title: "Email", dataIndex: "email", key: "email" },
                            { title: "Father's Name", dataIndex: "fatherName", key: "fatherName" },
                            { title: "Mother's Name", dataIndex: "motherName", key: "motherName" },
                            { title: "Gender", dataIndex: "gender", key: "gender" },
                            { title: "Phone", dataIndex: "phone", key: "phone" },
                            { title: "ID Proof", dataIndex: "idProof", key: "idProof" },
                            { title: "ID Proof Number", dataIndex: "idProofNumber", key: "idProofNumber" },
                            { title: "Qualification", dataIndex: "qualification", key: "qualification" },
                            { title: "Address", dataIndex: "address", key: "address" },
                            { title: "Registration Date", dataIndex: "registrationDate", key: "registrationDate" },
                            { title: "Session From", dataIndex: "sessionFrom", key: "sessionFrom" },
                            { title: "Session To", dataIndex: "sessionTo", key: "sessionTo" },
                            {
                                title: "Action",
                                key: "actions",
                                render: (_, record) => (_jsx(Button, { type: "primary", onClick: () => handleAddMarksClick(record), children: "Add Marks" })),
                            },
                        ] })] }, franchiseId))), _jsx(Modal, { title: `Add Marks for ${selectedStudent?.name || "Student"}`, open: isMarksModalVisible, onCancel: () => setIsMarksModalVisible(false), footer: null, width: 1000, className: styles.marksModal, children: selectedStudent && (_jsx(AddMarksFormPopUp, { student: selectedStudent, setIsMarksModalVisible: setIsMarksModalVisible, StudentMarks: selectedStudent.marks || [], onMarksUpdate: (updatedMarks) => handleMarksUpdate(updatedMarks, selectedStudent.enrollmentId) })) })] }));
};
export default MarkEntryForm;
