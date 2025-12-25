import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewStudent.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { deleteStudentData, fetchStudents, getAllStudentsPaginated } from "../../services/studentService";
import { fetchFranchiseData } from "../../services/viewFranchise";
import { toast } from "react-toastify";
const ViewStudent = () => {
    // State variables
    const [students, setStudents] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [franchiseData, setFranchiseData] = useState([]);
    const [isMarksModalVisible, setIsMarksModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();
    const isFranchise = !localStorage.getItem("adminId"); // Determine user role
    // Convert buffer to base64 string if needed.
    const convertBufferToBase64 = (buffer) => {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    // Debounce search input to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Wait 500ms after user stops typing
        return () => clearTimeout(timer);
    }, [searchTerm]);
    // Fetch student data with pagination and search
    const fetchStudentsData = useCallback(async (page, limit, search = "") => {
        setLoading(true);
        setError(null);
        try {
            const adminId = localStorage.getItem("adminId");
            // Use paginated API for admin, regular API for franchise
            if (adminId) {
                const response = await getAllStudentsPaginated(page, limit, search);
                setStudents(response.students);
                setPagination(response.pagination);
            }
            else {
                // For franchise users, use the existing fetchStudents function
                const franchiseId = localStorage.getItem("franchiseId") || "";
                const data = await fetchStudents(franchiseId);
                setStudents(data);
                // Set pagination info for franchise (client-side pagination)
                setPagination({
                    total: data.length,
                    page: 1,
                    limit: data.length,
                    totalPages: 1,
                });
            }
        }
        catch (err) {
            console.error("Error fetching student data:", err);
            setError(err.response?.data?.error || "Failed to fetch students");
            toast.error("Failed to fetch students. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Reset to page 1 when search term or page size changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm, pageSize]);
    // Fetch data when search term, page size, or page changes
    useEffect(() => {
        fetchStudentsData(currentPage, pageSize, debouncedSearchTerm);
    }, [currentPage, pageSize, debouncedSearchTerm, fetchStudentsData]);
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
    // Filter and sort the students (client-side filtering for franchise users or additional filtering)
    const filteredData = useMemo(() => {
        let data = [...students];
        const adminId = localStorage.getItem("adminId");
        // For admin users with server-side search, only apply client-side sorting
        // For franchise users, apply both filtering and sorting
        if (!adminId && filterText) {
            data = data.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.email.toLowerCase().includes(filterText.toLowerCase()));
        }
        // Apply sorting if sort field is selected
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
    // Reset to page 1 when filter changes (only for franchise users)
    useEffect(() => {
        const adminId = localStorage.getItem("adminId");
        if (!adminId && filterText && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [filterText, currentPage]);
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
        if (page >= 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pagination.totalPages]);
    const handleItemsPerPageChange = useCallback((newLimit) => {
        setPageSize(newLimit);
        setCurrentPage(1); // Reset to first page when changing items per page
    }, []);
    // Generate page numbers for pagination
    const getPageNumbers = useCallback(() => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);
        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage, pagination.totalPages]);
    const handleEdit = useCallback((student) => {
        console.log("Editing student:", student);
        navigate(`/dashboard/student/add-student/${student.enrollmentId}`);
    }, [navigate]);
    const handleDelete = useCallback(async (student) => {
        console.log("Deleting student:", student);
        const confirmDelete = window.confirm(`Are you sure you want to delete student ${student.name}?`);
        if (confirmDelete) {
            try {
                await deleteStudentData(student._id);
                // Refresh the current page after deletion
                await fetchStudentsData(currentPage, pageSize);
                toast.success("Student deleted successfully!");
            }
            catch (error) {
                console.error("Error deleting student:", error);
                toast.error("Failed to delete student. Please try again.");
            }
        }
    }, [currentPage, pageSize, fetchStudentsData]);
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
    }, [navigate, franchiseData]);
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
    }, [navigate, franchiseData]);
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
    return (_jsxs("div", { className: styles.dashboardContainer, children: [_jsx("div", { className: styles.mainContent, children: _jsxs("div", { className: styles.pageContent, children: [_jsx("h2", { children: "View Students" }), _jsx("div", { className: styles.exportContainer, children: _jsx("button", { className: styles.exportBtn, onClick: exportToExcel, children: "Export to Excel" }) }), _jsxs("div", { className: styles.headerControls, children: [_jsxs("div", { className: styles.searchContainer, children: [_jsx("input", { type: "text", placeholder: "Search by name, email, enrollment ID, or phone...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: styles.searchInput, disabled: loading }), searchTerm && (_jsx("button", { onClick: () => setSearchTerm(""), className: styles.clearSearchBtn, title: "Clear search", disabled: loading, children: "\u00D7" }))] }), _jsxs("div", { className: styles.entriesSelector, children: [_jsx("label", { htmlFor: "entries", children: "Show " }), _jsxs("select", { id: "entries", value: pageSize, onChange: (e) => handleItemsPerPageChange(Number(e.target.value)), disabled: loading, children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 20, children: "20" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] }), _jsx("span", { children: " entries" })] })] }), !localStorage.getItem("adminId") && (_jsx("div", { className: styles.filterContainer, children: _jsx("input", { type: "text", placeholder: "Additional filter by name or email...", value: filterText, onChange: (e) => setFilterText(e.target.value) }) })), loading && students.length === 0 && (_jsx("div", { style: { textAlign: "center", padding: "20px" }, children: "Loading students..." })), error && (_jsxs("div", { style: { textAlign: "center", padding: "20px", color: "red" }, children: ["Error: ", error] })), _jsx("div", { className: styles.tableContainer, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "S.No." }), _jsx("th", { children: "Image" }), _jsx("th", { onClick: () => handleSort("name"), children: "Name" }), _jsx("th", { onClick: () => handleSort("email"), children: "Email" }), _jsx("th", { onClick: () => handleSort("phone"), children: "Phone" }), _jsx("th", { onClick: () => handleSort("course"), children: "Course" }), _jsx("th", { onClick: () => handleSort("enrollmentId"), children: "Enrollment No." }), _jsx("th", { onClick: () => handleSort("centerName"), children: "Center Name" }), _jsx("th", { onClick: () => handleSort("status"), children: "Status" }), _jsx("th", { children: "Marksheet" }), _jsx("th", { children: "Certificate" }), _jsx("th", { children: "Action" })] }) }), _jsxs("tbody", { children: [loading && students.length > 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 12, style: { textAlign: "center", padding: "20px" }, children: "Loading..." }) })), !loading && filteredData.length > 0 ? (filteredData.map((student, index) => (_jsxs("tr", { children: [_jsx("td", { children: (currentPage - 1) * pageSize + index + 1 }), _jsx("td", { children: renderStudentImage(student) }), _jsx("td", { children: student.name }), _jsx("td", { children: student.email }), _jsx("td", { children: student.phone }), _jsx("td", { children: student.course }), _jsx("td", { children: student.enrollmentId }), _jsx("td", { children: student.centerName || student.franchiseName || "N/A" }), _jsx("td", { children: _jsx("span", { className: student.status === "Active" ? styles.active : styles.completed, children: student.status }) }), _jsx("td", { children: student.certificationStatus === 'enable' && (_jsx("button", { className: styles.viewBtn, onClick: () => handleViewMarksheet(student), children: "View Marksheet" })) }), _jsx("td", { children: student.certificationStatus === 'enable' && (_jsx("button", { className: styles.viewBtn, onClick: () => handleViewCertificate(student), children: "View Certificate" })) }), _jsxs("td", { className: styles.btns, children: [_jsx("button", { className: styles.editBtn, onClick: () => handleEdit(student), disabled: isFranchise, children: "Edit" }), _jsx("button", { className: styles.deleteBtn, onClick: () => handleDelete(student), disabled: isFranchise, children: "Delete" })] })] }, student.id || student._id)))) : !loading ? (_jsx("tr", { children: _jsx("td", { colSpan: 12, style: { textAlign: "center", padding: "20px" }, children: "No records found" }) })) : null] })] }) }), pagination.totalPages > 1 && (_jsxs("div", { className: styles.pagination, children: [_jsx("button", { onClick: () => handlePageChange(currentPage - 1), disabled: currentPage === 1 || loading, children: "Previous" }), currentPage > 3 && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => handlePageChange(1), children: "1" }), currentPage > 4 && _jsx("span", { className: styles.paginationEllipsis, children: "..." })] })), getPageNumbers().map((pageNum) => (_jsx("button", { onClick: () => handlePageChange(pageNum), disabled: loading, className: currentPage === pageNum ? styles.activePage : "", children: pageNum }, pageNum))), currentPage < pagination.totalPages - 2 && (_jsxs(_Fragment, { children: [currentPage < pagination.totalPages - 3 && (_jsx("span", { className: styles.paginationEllipsis, children: "..." })), _jsx("button", { onClick: () => handlePageChange(pagination.totalPages), children: pagination.totalPages })] })), _jsx("button", { onClick: () => handlePageChange(currentPage + 1), disabled: currentPage === pagination.totalPages || loading, children: "Next" })] })), _jsx("div", { className: styles.paginationInfo, children: debouncedSearchTerm ? (_jsxs(_Fragment, { children: ["Showing ", students.length > 0 ? (currentPage - 1) * pageSize + 1 : 0, " to", " ", Math.min(currentPage * pageSize, pagination.total), " of ", pagination.total, " students", " ", "(filtered by \"", debouncedSearchTerm, "\")"] })) : (_jsxs(_Fragment, { children: ["Showing ", students.length > 0 ? (currentPage - 1) * pageSize + 1 : 0, " to", " ", Math.min(currentPage * pageSize, pagination.total), " of ", pagination.total, " students"] })) })] }) }), isMarksModalVisible && selectedStudent && (_jsx(Modal, { title: `Add Marks for ${selectedStudent.name}`, open: isMarksModalVisible, onCancel: () => setIsMarksModalVisible(false), footer: null, width: 1000, className: styles.marksModal }))] }));
};
export default ViewStudent;
