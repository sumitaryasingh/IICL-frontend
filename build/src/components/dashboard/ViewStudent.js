import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewStudent.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { fetchStudents } from "../../services/studentService";
import { fetchFranchiseData } from "../../services/viewFranchise";
const ViewStudent = () => {
    // State variables
    const [students, setStudents] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [franchiseData, setFranchiseData] = useState([]);
    const [isMarksModalVisible, setIsMarksModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();
    // Convert buffer to base64 string if needed.
    const convertBufferToBase64 = (buffer) => {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    // Fetch student data on component mount.
    useEffect(() => {
        const getStudents = async () => {
            try {
                const adminId = localStorage.getItem("adminId");
                const franchiseId = localStorage.getItem("franchiseId") || "";
                const data = await fetchStudents(adminId ? "" : franchiseId); // Pass empty string if admin
                setStudents(data);
            }
            catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
        getStudents();
    }, []);
    // Fetch franchise data once.
    useEffect(() => {
        const getFranchiseData = async () => {
            try {
                const data = await fetchFranchiseData();
                if (data && data.length > 0) {
                    setFranchiseData(data);
                }
                else {
                    console.warn("No franchise data found, retrying...");
                    setTimeout(getFranchiseData, 5000);
                }
            }
            catch (error) {
                console.error("Error fetching franchise data:", error);
            }
        };
        getFranchiseData();
    }, []);
    // Filter and sort the students.
    const filteredData = useMemo(() => {
        let data = [...students];
        if (filterText) {
            data = data.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.email.toLowerCase().includes(filterText.toLowerCase()));
        }
        if (sortField) {
            data.sort((a, b) => {
                const aField = a[sortField];
                const bField = b[sortField];
                if (aField < bField)
                    return sortOrder === "asc" ? -1 : 1;
                if (aField > bField)
                    return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [students, filterText, sortField, sortOrder]);
    useEffect(() => {
        setCurrentPage(1);
    }, [filterText, sortField, sortOrder]);
    // Pagination calculation.
    const indexOfLast = currentPage * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentItems = useMemo(() => filteredData.slice(indexOfFirst, indexOfLast), [filteredData, indexOfFirst, indexOfLast]);
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const handleSort = useCallback((field) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        }
        else {
            setSortField(field);
            setSortOrder("asc");
        }
    }, [sortField]);
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);
    const handleEdit = useCallback((student) => {
        console.log("Editing student:", student);
        navigate(`/dashboard/student/add-student/${student.enrollmentId}`);
    }, [navigate]);
    const handleDelete = useCallback((student) => {
        console.log("Deleting student:", student);
        // Implement delete functionality here
    }, []);
    const handleViewMarksheet = useCallback((student) => {
        if (!franchiseData || franchiseData.length === 0) {
            alert("Franchise data is not available. Please try again later.");
            return;
        }
        const matchingFranchise = franchiseData.find((franchise) => Number(franchise.franchiseId) === Number(student.franchiseId));
        if (!matchingFranchise) {
            alert("No matching franchise data found.");
            return;
        }
        const { instituteName, address } = matchingFranchise;
        navigate(`/dashboard/students/view/marksheet/${student.enrollmentId}`, {
            state: { student, instituteName, address },
        });
    }, [navigate, franchiseData
    ]);
    const handleViewCertificate = useCallback((student) => {
        if (!franchiseData || franchiseData.length === 0) {
            alert("Franchise data is not available. Please try again later.");
            return;
        }
        const matchingFranchise = franchiseData.find((franchise) => Number(franchise.franchiseId) === Number(student.franchiseId));
        if (!matchingFranchise) {
            alert("No matching franchise data found.");
            return;
        }
        const { instituteName, address } = matchingFranchise;
        navigate(`/dashboard/students/view/certificate/${student.enrollmentId}`, {
            state: { student, instituteName, address },
        });
    }, [navigate, franchiseData
    ]);
    const exportToExcel = useCallback(() => {
        const dataToExport = filteredData.map(({ _id, __v, imageBase64, marks, certificate, marksheet, image, ...rest }) => rest);
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(dataBlob, "iicl_students.xlsx");
    }, [filteredData]);
    // Render student image inline.
    const renderStudentImage = (student) => {
        if (student.image && student.image.data) {
            const base64Image = typeof student.image.data === "string"
                ? student.image.data
                : convertBufferToBase64(student.image.data);
            return (_jsx("img", { src: `data:${student.image.contentType};base64,${base64Image}`, alt: student.name, className: styles.student_ImgTable }));
        }
        return "No Image";
    };
    // Open Add Marks Modal.
    const handleAddMarks = useCallback((student) => {
        setSelectedStudent(student);
        setIsMarksModalVisible(true);
    }, []);
    return (_jsxs("div", { className: styles.dashboardContainer, children: [_jsx("div", { className: styles.mainContent, children: _jsxs("div", { className: styles.pageContent, children: [_jsx("h2", { children: "View Students" }), _jsx("div", { className: styles.exportContainer, children: _jsx("button", { className: styles.exportBtn, onClick: exportToExcel, children: "Export to Excel" }) }), _jsxs("div", { className: styles.entriesSelector, children: [_jsx("label", { htmlFor: "entries", children: "Show " }), _jsxs("select", { id: "entries", value: pageSize, onChange: (e) => setPageSize(Number(e.target.value)), children: [_jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 20, children: "20" })] }), _jsx("span", { children: " entries" })] }), _jsx("div", { className: styles.filterContainer, children: _jsx("input", { type: "text", placeholder: "Filter by name or email...", value: filterText, onChange: (e) => setFilterText(e.target.value) }) }), _jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "S.No." }), _jsx("th", { children: "Image" }), _jsx("th", { onClick: () => handleSort("name"), children: "Name" }), _jsx("th", { onClick: () => handleSort("email"), children: "Email" }), _jsx("th", { onClick: () => handleSort("phone"), children: "Phone" }), _jsx("th", { onClick: () => handleSort("course"), children: "Course" }), _jsx("th", { onClick: () => handleSort("enrollmentId"), children: "Enrollment No." }), _jsx("th", { onClick: () => handleSort("status"), children: "Status" }), _jsx("th", { children: "Marksheet" }), _jsx("th", { children: "Certificate" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: currentItems.length > 0 ? (currentItems.map((student, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 + indexOfFirst }), _jsx("td", { children: renderStudentImage(student) }), _jsx("td", { children: student.name }), _jsx("td", { children: student.email }), _jsx("td", { children: student.phone }), _jsx("td", { children: student.course }), _jsx("td", { children: student.enrollmentId }), _jsx("td", { children: _jsx("span", { className: student.status === "Active" ? styles.active : styles.completed, children: student.status }) }), _jsx("td", { children: _jsx("button", { className: styles.viewBtn, onClick: () => handleViewMarksheet(student), children: "View Marksheet" }) }), _jsx("td", { children: _jsx("button", { className: styles.viewBtn, onClick: () => handleViewCertificate(student), children: "View Certificate" }) }), _jsxs("td", { className: styles.btns, children: [_jsx("button", { className: styles.editBtn, onClick: () => handleEdit(student), children: "Edit" }), _jsx("button", { className: styles.deleteBtn, onClick: () => handleDelete(student), children: "Delete" }), _jsx("button", { className: styles.marksBtn, onClick: () => handleAddMarks(student), children: "Add Marks" })] })] }, student.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 11, children: "No records found" }) })) })] }) }), _jsxs("div", { className: styles.pagination, children: [_jsx("button", { disabled: currentPage === 1, onClick: () => handlePageChange(currentPage - 1), children: "Prev" }), _jsxs("span", { children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { disabled: currentPage === totalPages || totalPages === 0, onClick: () => handlePageChange(currentPage + 1), children: "Next" })] })] }) }), isMarksModalVisible && selectedStudent && (_jsx(Modal, { title: `Add Marks for ${selectedStudent.name}`, open: isMarksModalVisible, onCancel: () => setIsMarksModalVisible(false), footer: null, width: 1000, className: styles.marksModal }))] }));
};
export default ViewStudent;
