import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewStudent.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import { IoIosCloseCircle } from "react-icons/io";
import { deleteStudentData, fetchStudents, StudentData, getAllStudentsPaginated, PaginationInfo } from "../../services/studentService";
import { fetchFranchiseData, FranchiseData } from "../../services/viewFranchise";
import AddMarksFormPopUp from "./AddMarksFormPopUp";
import Franchise from "../Franchise/Franchise";
import { toast } from "react-toastify";

const ViewStudent: React.FC = () => {
  // State variables
  const [students, setStudents] = useState<StudentData[]>([]);
  const [filterText, setFilterText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof StudentData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [franchiseData, setFranchiseData] = useState<FranchiseData[]>([]);
  const [isMarksModalVisible, setIsMarksModalVisible] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const navigate = useNavigate();
  const isFranchise = !localStorage.getItem("adminId"); // Determine user role

  // Convert buffer to base64 string if needed.
  const convertBufferToBase64 = (buffer: ArrayBuffer): string => {
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
  const fetchStudentsData = useCallback(async (page: number, limit: number, search: string = "") => {
    setLoading(true);
    setError(null);
    
    try {
      const adminId = localStorage.getItem("adminId");
      
      // Use paginated API for admin, regular API for franchise
      if (adminId) {
        const response = await getAllStudentsPaginated(page, limit, search);
        setStudents(response.students);
        setPagination(response.pagination);
      } else {
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
    } catch (err: any) {
      console.error("Error fetching student data:", err);
      setError(err.response?.data?.error || "Failed to fetch students");
      toast.error("Failed to fetch students. Please try again.");
    } finally {
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
        } else {
          console.warn("No franchise data found, retrying...");
          setTimeout(getFranchiseData, 5000);
        }
      } catch (error) {
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
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.email.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    // Apply sorting if sort field is selected
    if (sortField) {
      data.sort((a, b) => {
        const aField = a[sortField];
        const bField = b[sortField];
        if (aField < bField) return sortOrder === "asc" ? -1 : 1;
        if (aField > bField) return sortOrder === "asc" ? 1 : -1;
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

  const handleSort = useCallback((field: keyof StudentData) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }, [sortField]);

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pagination.totalPages]);

  const handleItemsPerPageChange = useCallback((newLimit: number) => {
    setPageSize(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  }, []);

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
    const pages: number[] = [];
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

  const handleEdit = useCallback((student: StudentData) => {
    console.log("Editing student:", student);
    navigate(`/dashboard/student/add-student/${student.enrollmentId}`);
  }, [navigate]);

  const handleDelete = useCallback(async (student: StudentData) => {
    console.log("Deleting student:", student);
    const confirmDelete = window.confirm(`Are you sure you want to delete student ${student.name}?`);
    if (confirmDelete) {
      try {
        await deleteStudentData(student._id);
        // Refresh the current page after deletion
        await fetchStudentsData(currentPage, pageSize);
        toast.success("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student. Please try again.");
      }
    }
  }, [currentPage, pageSize, fetchStudentsData]);
  

  const handleViewMarksheet = useCallback((student: StudentData) => {
    if (!franchiseData || franchiseData.length === 0) {
      alert("Franchise data is not available. Please try again later.");
      return;
    }
    const matchingFranchise = franchiseData.find(
      (franchise) => Number(franchise.franchiseId) === Number(student.franchiseId)
    );
    if (!matchingFranchise) {
      alert("No matching franchise data found.");
      return;
    }
    const { instituteName, address } = matchingFranchise;
    navigate(`/dashboard/students/view/marksheet/${student.enrollmentId}`, {
      state: { student, instituteName, address },
    });
  }, [navigate, franchiseData]);

  const handleViewCertificate = useCallback((student: StudentData) => {
    if (!franchiseData || franchiseData.length === 0) {
      alert("Franchise data is not available. Please try again later.");
      return;
    }
    const matchingFranchise = franchiseData.find(
      (franchise) => Number(franchise.franchiseId) === Number(student.franchiseId)
    );
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
    const dataToExport = filteredData.map(({ _id,__v, imageBase64,marks,certificate, marksheet,image, ...rest }) => rest);
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
  const renderStudentImage = (student: StudentData) => {
    if (student.image && student.image.data) {
      const base64Image = typeof student.image.data === "string"
        ? student.image.data
        : convertBufferToBase64(student.image.data);
      return (
        <img
          src={`data:${student.image.contentType};base64,${base64Image}`}
          alt={student.name}
          className={styles.student_ImgTable}
        />
      );
    }
    return "No Image";
  };

  // Open Add Marks Modal.
  const handleAddMarks = useCallback((student: StudentData) => {
    setSelectedStudent(student);
    setIsMarksModalVisible(true);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <div className={styles.pageContent}>
          <h2>View Students</h2>
          <div className={styles.exportContainer}>
            <button className={styles.exportBtn} onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
          <div className={styles.headerControls}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by name, email, enrollment ID, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                disabled={loading}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className={styles.clearSearchBtn}
                  title="Clear search"
                  disabled={loading}
                >
                  ×
                </button>
              )}
            </div>
            <div className={styles.entriesSelector}>
              <label htmlFor="entries">Show </label>
              <select 
                id="entries" 
                value={pageSize} 
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                disabled={loading}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span> entries</span>
            </div>
          </div>
          {/* Keep client-side filter for franchise users or as additional filter */}
          {!localStorage.getItem("adminId") && (
            <div className={styles.filterContainer}>
              <input
                type="text"
                placeholder="Additional filter by name or email..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          )}
          {loading && students.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px" }}>Loading students...</div>
          )}
          {error && (
            <div style={{ textAlign: "center", padding: "20px", color: "red" }}>Error: {error}</div>
          )}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Image</th>
                  <th onClick={() => handleSort("name")}>Name</th>
                  <th onClick={() => handleSort("email")}>Email</th>
                  <th onClick={() => handleSort("phone")}>Phone</th>
                  <th onClick={() => handleSort("course")}>Course</th>
                  <th onClick={() => handleSort("enrollmentId")}>Enrollment No.</th>
                  <th onClick={() => handleSort("centerName")}>Center Name</th>
                  <th onClick={() => handleSort("status")}>Status</th>
                  <th>Marksheet</th>
                  <th>Certificate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && students.length > 0 && (
                  <tr>
                    <td colSpan={12} style={{ textAlign: "center", padding: "20px" }}>
                      Loading...
                    </td>
                  </tr>
                )}
                {!loading && filteredData.length > 0 ? (
                  filteredData.map((student, index) => (
                    <tr key={student.id || student._id}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{renderStudentImage(student)}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.course}</td>
                      <td>{student.enrollmentId}</td>
                      <td>{(student as any).centerName || (student as any).franchiseName || "N/A"}</td>
                      <td>
                        <span className={student.status === "Active" ? styles.active : styles.completed}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        {student.certificationStatus === 'enable' && (
                        <button className={styles.viewBtn} onClick={() => handleViewMarksheet(student)}>
                          View Marksheet
                        </button>
                        )}
                      </td>
                      <td>
                      {student.certificationStatus === 'enable' && (
                        <button className={styles.viewBtn} onClick={() => handleViewCertificate(student)}>
                          View Certificate
                        </button>
                      )}
                      </td>
                      <td className={styles.btns}>
                        <button 
                          className={styles.editBtn} 
                          onClick={() => handleEdit(student)}
                          disabled={isFranchise}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(student)}
                          disabled={isFranchise}>
                          Delete
                        </button>
                        {/* <button className={styles.marksBtn} onClick={() => handleAddMarks(student)}>
                          Add Marks
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : !loading ? (
                  <tr>
                    <td colSpan={12} style={{ textAlign: "center", padding: "20px" }}>
                      No records found
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          {pagination.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </button>

              {/* First page */}
              {currentPage > 3 && (
                <>
                  <button onClick={() => handlePageChange(1)}>1</button>
                  {currentPage > 4 && <span className={styles.paginationEllipsis}>...</span>}
                </>
              )}

              {/* Page numbers */}
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                  className={currentPage === pageNum ? styles.activePage : ""}
                >
                  {pageNum}
                </button>
              ))}

              {/* Last page */}
              {currentPage < pagination.totalPages - 2 && (
                <>
                  {currentPage < pagination.totalPages - 3 && (
                    <span className={styles.paginationEllipsis}>...</span>
                  )}
                  <button onClick={() => handlePageChange(pagination.totalPages)}>
                    {pagination.totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages || loading}
              >
                Next
              </button>
            </div>
          )}
          <div className={styles.paginationInfo}>
            {debouncedSearchTerm ? (
              <>
                Showing {students.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
                {Math.min(currentPage * pageSize, pagination.total)} of {pagination.total} students
                {" "}(filtered by "{debouncedSearchTerm}")
              </>
            ) : (
              <>
                Showing {students.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
                {Math.min(currentPage * pageSize, pagination.total)} of {pagination.total} students
              </>
            )}
          </div>
        </div>
      </div>
      {/* Add Marks Modal */}
      {isMarksModalVisible && selectedStudent && (
        <Modal
          title={`Add Marks for ${selectedStudent.name}`}
          open={isMarksModalVisible}
          onCancel={() => setIsMarksModalVisible(false)}
          footer={null}
          width={1000}
          className={styles.marksModal}
        >
        </Modal>
      )}
    </div>
  );
};

export default ViewStudent;