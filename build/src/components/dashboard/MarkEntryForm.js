import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useMemo } from "react";
import { Table, Modal, Button, Input } from "antd";
import styles from "./styles/MarkEntryForm.module.css";
import { getAllStudents, updateStudentStatus } from "../../services/studentService";
import AddMarksFormPopUp from "./AddMarksFormPopUp";
import { fetchFranchiseData } from "../../services/viewFranchise";
import { toast } from "react-toastify";
const MarkEntryForm = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchFranchise, setSearchFranchise] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isMarksModalVisible, setIsMarksModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [franchise, setFranchise] = useState([]);
    const [selectedFranchiseId, setSelectedFranchiseId] = useState("");
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                console.log("Fetching students for MarkEntryForm...");
                const data = await getAllStudents();
                console.log("Students fetched successfully:", data?.length || 0, "students");
                const validData = (data || []).map((student, index) => ({
                    ...student,
                    enrollmentId: student.enrollmentId || `temp-${index}`,
                    id: student.id || `fallback-id-${index}`,
                    franchiseId: student.franchiseId ? String(student.franchiseId) : "unknown",
                    marks: Array.isArray(student.marks) ? student.marks : [],
                    certificationStatus: student?.certificationStatus ?? '',
                }));
                setStudents(validData);
            }
            catch (error) {
                console.error("Error fetching students:", error);
                console.error("Error details:", error.response?.data || error.message);
                toast.error("Failed to fetch students. Please try again.");
            }
        };
        fetchStudents();
    }, []);
    useEffect(() => {
        const fetchFranchise = async () => {
            try {
                const data = await fetchFranchiseData();
                const mappedData = data.map((franchise) => ({
                    ...franchise,
                    city: franchise.city || "Unknown",
                    state: franchise.state || "Unknown",
                    password: franchise.password || "N/A",
                }));
                setFranchise(mappedData);
            }
            catch (error) {
                console.error("Error fetching franchise data:", error);
            }
        };
        fetchFranchise();
    }, []);
    const handleMarksUpdate = (updatedMarks, studentId) => {
        setStudents((prev) => prev.map((student) => student.enrollmentId === studentId ? { ...student, marks: updatedMarks } : student));
        setFilteredStudents((prev) => prev.map((student) => student.enrollmentId === studentId ? { ...student, marks: updatedMarks } : student));
    };
    const groupedStudents = useMemo(() => {
        if (!selectedFranchiseId)
            return {};
        return filteredStudents.reduce((acc, student) => {
            const key = String(student.franchiseId);
            if (!acc[key])
                acc[key] = [];
            acc[key].push(student);
            return acc;
        }, {});
    }, [filteredStudents, selectedFranchiseId]);
    const handleAddMarksClick = (student) => {
        setSelectedStudent(student);
        setIsMarksModalVisible(true);
    };
    const handleEnableCertificate = async (student, action) => {
        try {
            const updatedStatus = action;
            const response = await updateStudentStatus(student.enrollmentId, updatedStatus);
            if (response?.status) {
                setStudents((prev) => prev.map((s) => s.enrollmentId === student.enrollmentId ? { ...s, certificationStatus: updatedStatus } : s));
                setFilteredStudents((prev) => prev.map((s) => s.enrollmentId === student.enrollmentId ? { ...s, certificationStatus: updatedStatus } : s));
                toast.success(response.message);
            }
            else {
                console.error("Failed to update student status:", response.message);
            }
        }
        catch (error) {
            console.error("Error enabling/disabling certificate:", error);
        }
    };
    const handleSearch = () => {
        const keyword = searchFranchise.trim().toLowerCase();
        const filtered = students.filter((student) => {
            return (student.enrollmentId?.toString().toLowerCase().includes(keyword) ||
                student.name?.toLowerCase().includes(keyword));
        });
        setFilteredStudents(filtered);
        setCurrentPage(1);
    };
    const handleFranchiseSelect = (event) => {
        const selectedId = event.target.value;
        setSelectedFranchiseId(selectedId);
        const filtered = selectedId
            ? students.filter((student) => String(student.franchiseId) === selectedId)
            : [];
        setFilteredStudents(filtered);
        setCurrentPage(1);
    };
    // Get the current range of students being shown on the current page
    const currentStudentsCount = useMemo(() => {
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, filteredStudents.length);
        return `${start}-${end} of ${filteredStudents.length}`;
    }, [currentPage, pageSize, filteredStudents.length]);
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.selectContainer, children: [_jsxs("select", { className: styles.selectFranchise, name: "franchise", id: "franchise", value: selectedFranchiseId, onChange: handleFranchiseSelect, children: [_jsx("option", { value: "", children: "Select a Franchise" }), franchise.map((f) => (_jsx("option", { value: f.franchiseId, children: f.instituteName || `Franchise ${f.franchiseId}` }, f.franchiseId)))] }), _jsx(Input, { placeholder: "Search Student By Enrollment ID or Name", value: searchFranchise, onChange: (e) => setSearchFranchise(e.target.value), className: styles.input }), _jsxs("div", { className: styles.buttons, children: [_jsx(Button, { type: "primary", onClick: handleSearch, children: "Search" }), _jsx(Button, { onClick: () => {
                                    setFilteredStudents([]);
                                    setSearchFranchise("");
                                    setSelectedFranchiseId("");
                                }, children: "Reset" })] })] }), !selectedFranchiseId && (_jsx("div", { style: { padding: "10px", fontStyle: "italic", color: "gray" }, children: "Please select a franchise to view student data." })), Object.keys(groupedStudents).map((franchiseId) => (_jsxs(React.Fragment, { children: [_jsxs("div", { className: styles.headingBox, children: [_jsxs("div", { className: styles.currentStudentsCount, children: ["Showing ", currentStudentsCount, " students on this page."] }), _jsxs("h2", { className: styles.heading, children: ["Franchise Name: ", franchise.find((f) => String(f.franchiseId) === franchiseId)?.instituteName || "Unknown", " \u2014 Students: ", groupedStudents[franchiseId].length] })] }), _jsx("div", { className: styles.franchiseSection, children: _jsx(Table, { dataSource: groupedStudents[franchiseId], pagination: {
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
                                    render: (_, record) => (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [_jsx(Button, { type: "primary", onClick: () => handleAddMarksClick(record), children: "Add Marks" }), _jsxs(Button, { type: "primary", onClick: () => handleEnableCertificate(record, record.certificationStatus === 'disable' ? 'enable' : 'disable'), children: [record.certificationStatus === 'enable' ? 'Disable' : 'Enable', " Certificate & Marksheet"] })] })),
                                },
                            ] }) })] }, franchiseId))), _jsx(Modal, { title: `Add Marks for ${selectedStudent?.name || "Student"}`, open: isMarksModalVisible, onCancel: () => setIsMarksModalVisible(false), footer: null, width: 1000, className: styles.marksModal, children: selectedStudent && (_jsx(AddMarksFormPopUp, { student: selectedStudent, setIsMarksModalVisible: setIsMarksModalVisible, StudentMarks: selectedStudent.marks || [], onMarksUpdate: (updatedMarks) => handleMarksUpdate(updatedMarks, selectedStudent.enrollmentId) })) })] }));
};
export default MarkEntryForm;
