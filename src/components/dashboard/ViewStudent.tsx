import React, { useState, useEffect } from "react";
import styles from "./styles/ViewStudent.module.css";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Navigate, useNavigate } from "react-router-dom";

export interface Subject {
  subject: string;
  theory: number;
  lab: number;
  totalMarks: number;
  obtainedTheory: number;
  obtainedLab: number;
  obtainedTotal: number;
}

export interface StudentData {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  enrollmentNumber: string;
  status: "Active" | "Completed";
  marksheet: string;       // URL or identifier for the marksheet
  certificate: string;     // URL or identifier for the certificate
  institute: string;       // Institute name
  location: string;        // Location
  marks: number;           // Overall marks obtained (e.g., out of 800)
  grade: string;           // Grade achieved
  date: string;            // Date (e.g., exam or certificate date)
  rollNumber: string;      // Roll number
  certificateNumber: string; // Certificate number
  organization: string;    // Organization (e.g., IICL)
  subjects: Subject[];     // Subjects and their marks details
}

// Updated sample student data for demonstration
const sampleStudents: StudentData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    course: "B.Sc Computer Science",
    enrollmentNumber: "ENR001",
    status: "Active",
    marksheet: "/marksheet/john",
    certificate: "/certificate/john",
    institute: "ABC Institute",
    location: "Cityville",
    marks: 680,
    grade: "A",
    date: "2023-07-15",
    rollNumber: "R001",
    certificateNumber: "CERT001",
    organization: "IICL",
    subjects: [
      {
        subject: "Mathematics",
        theory: 70,
        lab: 30,
        totalMarks: 100,
        obtainedTheory: 65,
        obtainedLab: 28,
        obtainedTotal: 93,
      },
      {
        subject: "Physics",
        theory: 70,
        lab: 30,
        totalMarks: 100,
        obtainedTheory: 60,
        obtainedLab: 27,
        obtainedTotal: 87,
      },
    ],
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "0987654321",
    course: "MBA",
    enrollmentNumber: "ENR002",
    status: "Completed",
    marksheet: "/marksheet/jane",
    certificate: "/certificate/jane",
    institute: "XYZ Institute",
    location: "Townsville",
    marks: 720,
    grade: "A+",
    date: "2023-06-20",
    rollNumber: "R002",
    certificateNumber: "CERT002",
    organization: "IICL",
    subjects: [
      {
        subject: "Management",
        theory: 60,
        lab: 0,
        totalMarks: 60,
        obtainedTheory: 55,
        obtainedLab: 0,
        obtainedTotal: 55,
      },
      {
        subject: "Economics",
        theory: 70,
        lab: 0,
        totalMarks: 70,
        obtainedTheory: 65,
        obtainedLab: 0,
        obtainedTotal: 65,
      },
    ],
  },
  // Add more sample student items as needed...
];



const ViewStudent: React.FC = () => {
  // Main student data state
  const [students, setStudents] = useState<StudentData[]>([]);
  // Filtered/sorted data for the table
  const [filteredData, setFilteredData] = useState<StudentData[]>([]);

  // For filtering, sorting, and pagination
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof StudentData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const navigate = useNavigate();

  // Initialize with sample data
  useEffect(() => {
    setStudents(sampleStudents);
    setFilteredData(sampleStudents);
  }, []);

  // Update filtered data whenever filterText, sorting, or student data changes
  useEffect(() => {
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

    setFilteredData(data);
    setCurrentPage(1); // Reset to first page when filtering/sorting changes
  }, [filterText, students, sortField, sortOrder]);

  // Calculate pagination indices
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Toggle sorting on header click
  const handleSort = (field: keyof StudentData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Dummy action handlers
  const handleEdit = (student: StudentData) => {
    console.log("Editing student:", student);
    // Implement edit functionality here
  };

  const handleDelete = (student: StudentData) => {
    console.log("Deleting student:", student);
    // Implement delete functionality here
  };

  const handleViewMarksheet = (student: StudentData) => {
    navigate(`/dashboard/students/view/marksheet/${student.id}`, {state:{student}});  
    console.log("Viewing marksheet for:", student);
    // Implement view marksheet functionality here
  };

  const handleViewCertificate = (student: StudentData) => {
    navigate(`/dashboard/students/view/certificate/${student.id}`, {state:{student}});
    console.log("Viewing certificate for:", student);
    // Implement view certificate functionality here
  };

  // Export the filtered student data to an Excel file (excluding certificate & marksheet)
  const exportToExcel = () => {
    const dataToExport = filteredData.map(({ certificate, marksheet, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(dataBlob, "iicl_students.xlsx");
  };

  return (
    <div className={styles.dashboardContainer}>
      <DashboardSidebar />
      <div className={styles.mainContent}>
        <Navbar />
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

          {/* Responsive Table Container */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th onClick={() => handleSort("name")}>Name</th>
                  <th onClick={() => handleSort("email")}>Email</th>
                  <th onClick={() => handleSort("phone")}>Phone</th>
                  <th onClick={() => handleSort("course")}>Course</th>
                  <th onClick={() => handleSort("enrollmentNumber")}>
                    Enrollment No.
                  </th>
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
                        <span
                          className={
                            student.status === "Active"
                              ? styles.active
                              : styles.completed
                          }
                        >
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.viewBtn}
                          onClick={() => handleViewMarksheet(student)}
                        >
                          View Marksheet
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.viewBtn}
                          onClick={() => handleViewCertificate(student)}
                        >
                          View Certificate
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(student)}
                        >
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
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
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
