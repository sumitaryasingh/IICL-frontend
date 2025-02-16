// components/ViewStudent.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewStudent.module.css";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { fetchStudents, StudentData } from "../../services/studentService";

const ViewStudent: React.FC = () => {
  // State variables
  const [students, setStudents] = useState<StudentData[]>([]);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof StudentData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const navigate = useNavigate();

  // Fetch student data from the API on component mount.
  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    getStudents();
  }, []);

  // Memoized filtered and sorted data
  const filteredData = useMemo(() => {
    let data = [...students];

    // Filter by name or email (case-insensitive)
    if (filterText) {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.email.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sort data if a sort field is selected
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

  // Reset current page when filter or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterText, sortField, sortOrder]);

  // Pagination calculation
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = useMemo(
    () => filteredData.slice(indexOfFirst, indexOfLast),
    [filteredData, indexOfFirst, indexOfLast]
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Event handlers wrapped in useCallback for performance optimization.
  const handleSort = useCallback(
    (field: keyof StudentData) => {
      if (sortField === field) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortField]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleEdit = useCallback((student: StudentData) => {
    console.log("Editing student:", student);
    // Implement edit functionality here
  }, []);

  const handleDelete = useCallback((student: StudentData) => {
    console.log("Deleting student:", student);
    // Implement delete functionality here
  }, []);

  const handleViewMarksheet = useCallback(
    (student: StudentData) => {
      navigate(`/dashboard/students/view/marksheet/${student.id}`, { state: { student } });
      console.log("Viewing marksheet for:", student);
    },
    [navigate]
  );

  const handleViewCertificate = useCallback(
    (student: StudentData) => {
      navigate(`/dashboard/students/view/certificate/${student.id}`, { state: { student } });
      console.log("Viewing certificate for:", student);
    },
    [navigate]
  );

  const exportToExcel = useCallback(() => {
    // Exclude certificate and marksheet from export
    const dataToExport = filteredData.map(({ certificate, marksheet, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(dataBlob, "iicl_students.xlsx");
  }, [filteredData]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <div className={styles.pageContent}>
          <h2>View Students</h2>

          {/* Export Button */}
          <div className={styles.exportContainer}>
            <button className={styles.exportBtn} onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>

          {/* Show Entries Selector */}
          <div className={styles.entriesSelector}>
            <label htmlFor="entries">Show </label>
            <select
              id="entries"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span> entries</span>
          </div>

          {/* Filter Input */}
          <div className={styles.filterContainer}>
            <input
              type="text"
              placeholder="Filter by name or email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {/* Table Container */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th onClick={() => handleSort("name")}>Name</th>
                  <th onClick={() => handleSort("email")}>Email</th>
                  <th onClick={() => handleSort("phone")}>Phone</th>
                  <th onClick={() => handleSort("course")}>Course</th>
                  <th onClick={() => handleSort("enrollmentNumber")}>Enrollment No.</th>
                  <th onClick={() => handleSort("status")}>Status</th>
                  <th>Marksheet</th>
                  <th>Certificate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1 + indexOfFirst}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.course}</td>
                      <td>{student.enrollmentNumber}</td>
                      <td>
                        <span className={student.status === "Active" ? styles.active : styles.completed}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.viewBtn} onClick={() => handleViewMarksheet(student)}>
                          View Marksheet
                        </button>
                      </td>
                      <td>
                        <button className={styles.viewBtn} onClick={() => handleViewCertificate(student)}>
                          View Certificate
                        </button>
                      </td>
                      <td>
                        <button className={styles.editBtn} onClick={() => handleEdit(student)}>
                          Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(student)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10}>No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className={styles.pagination}>
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
