import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles/ViewStudent.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import { IoIosCloseCircle } from "react-icons/io";
import { deleteStudentData, fetchStudents, StudentData } from "../../services/studentService";
import { fetchFranchiseData, FranchiseData } from "../../services/viewFranchise";
import AddMarksFormPopUp from "./AddMarksFormPopUp";
import Franchise from "../Franchise/Franchise";
import { toast } from "react-toastify";

const ViewStudent: React.FC = () => {
  // State variables
  const [students, setStudents] = useState<StudentData[]>([]);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState<keyof StudentData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
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

  // Fetch student data on component mount.
  useEffect(() => {
    const getStudents = async () => {
      try {
        const adminId = localStorage.getItem("adminId");
        const franchiseId = localStorage.getItem("franchiseId") || "";

        const data = await fetchStudents(adminId ? "" : franchiseId);
        setStudents(data);
      } catch (error) {
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

  // Filter and sort the students.
  const filteredData = useMemo(() => {
    let data = [...students];
    if (filterText) {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase()) ||
          item.email.toLowerCase().includes(filterText.toLowerCase())
      );
    }
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

  useEffect(() => {
    setCurrentPage(1);
  }, [filterText, sortField, sortOrder]);

  // Pagination calculation.
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = useMemo(() => filteredData.slice(indexOfFirst, indexOfLast), [filteredData, indexOfFirst, indexOfLast]);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = useCallback((field: keyof StudentData) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }, [sortField]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleEdit = useCallback((student: StudentData) => {
    console.log("Editing student:", student);
    navigate(`/dashboard/student/add-student/${student.enrollmentId}`);
  }, [navigate]);

  const handleDelete = useCallback(async (student: StudentData) => {
    console.log("Deleting student:", student);
    const confirmDelete = window.confirm(`Are you sure you want to delete student ${student.name}?`);
    if (confirmDelete) {
      try {
        await deleteStudentData(student._id); // Make sure this function is imported
        const adminId = localStorage.getItem("adminId");
        const franchiseId = localStorage.getItem("franchiseId") || "";
        const refreshedData = await fetchStudents(adminId ? "" : franchiseId);
        setStudents(refreshedData);
        toast.success("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student. Please try again.");
      }
    }
  }, []);


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
          <div className={styles.entriesSelector}>
            <label htmlFor="entries">Show </label>
            <select id="entries" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span> entries</span>
          </div>
          <div className={styles.filterContainer}>
            <input
              type="text"
              placeholder="Filter by name or email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
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
                      <td>{renderStudentImage(student)}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.course}</td>
                      <td>{student.enrollmentId}</td>
                      <td>
                        <span className={
                          new Date() < new Date(student.sessionFrom)
                            ? styles.notStarted
                            : new Date() > new Date(student.sessionTo)
                              ? styles.completed
                              : styles.active
                        }>
                          {
                            new Date() < new Date(student.sessionFrom)
                              ? "inActive"
                              : new Date() > new Date(student.sessionTo)
                                ? "Completed"
                                : "Active"
                          }
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
                ) : (
                  <tr>
                    <td colSpan={11}>No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
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