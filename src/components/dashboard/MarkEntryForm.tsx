import React, { useState, useEffect, useMemo } from "react";
import { Table, Modal, Button, Input } from "antd";
import styles from "./styles/MarkEntryForm.module.css";
import { getAllStudents, StudentData } from "../../services/studentService";
import AddMarksFormPopUp from "./AddMarksFormPopUp";
import { fetchFranchiseData } from "../../services/viewFranchise";
import { FranchiseData } from "../../services/franchiseService";

interface Mark {
  subject: string;
  theoryMaxMarks: number;
  theoryObtainedMarks: number;
  practicalMaxMarks: number;
  practicalObtainedMarks: number;
}

interface Student {
  name: string;
  enrollmentId: string;
  franchiseId: string | number;
  course: string;
  batch: string;
  dob: string;
  email: string;
  fatherName: string;
  motherName: string;
  gender: string;
  phone: string;
  idProof: string;
  idProofNumber: string;
  qualification: string;
  address: string;
  registrationDate: string;
  sessionFrom: string;
  sessionTo: string;
  id: string | number;
  status: "Active" | "Completed";
  marksheet: string;
  image: any;
  marks: Mark[];
}

const MarkEntryForm: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchFranchise, setSearchFranchise] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isMarksModalVisible, setIsMarksModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [franchise, setFranchise] = useState<FranchiseData[]>([]);
  const [selectedFranchiseId, setSelectedFranchiseId] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        const validData = (data || []).map((student: StudentData, index) => ({
          ...student,
          enrollmentId: student.enrollmentId || `temp-${index}`,
          id: student.id || `fallback-id-${index}`,
          franchiseId: student.franchiseId ? String(student.franchiseId) : "unknown",
          marks: Array.isArray(student.marks) ? student.marks : [],
        }));
        setStudents(validData);
      } catch (error) {
        console.error("Error fetching students:", error);
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
      } catch (error) {
        console.error("Error fetching franchise data:", error);
      }
    };

    fetchFranchise();
  }, []);

  const handleMarksUpdate = (updatedMarks: Mark[], studentId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.enrollmentId === studentId ? { ...student, marks: updatedMarks } : student
      )
    );
    setFilteredStudents((prev) =>
      prev.map((student) =>
        student.enrollmentId === studentId ? { ...student, marks: updatedMarks } : student
      )
    );
  };

  const groupedStudents = useMemo(() => {
    if (!selectedFranchiseId) return {};
    return filteredStudents.reduce<Record<string, Student[]>>((acc, student) => {
      const key = String(student.franchiseId);
      if (!acc[key]) acc[key] = [];
      acc[key].push(student);
      return acc;
    }, {});
  }, [filteredStudents, selectedFranchiseId]);

  const handleAddMarksClick = (student: Student) => {
    setSelectedStudent(student);
    setIsMarksModalVisible(true);
  };

  const handleEnableCertificate = (student: Student) => {
    console.log("Enable certificate for:", student.enrollmentId);
  };

  const handleSearch = () => {
    const keyword = searchFranchise.trim().toLowerCase();

    const filtered = students.filter((student) => {
      return (
        student.franchiseId?.toString().toLowerCase().includes(keyword) ||
        student.enrollmentId?.toString().toLowerCase().includes(keyword) ||
        student.name?.toLowerCase().includes(keyword)
      );
    });

    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const handleFranchiseSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <select
          className={styles.selectFranchise}
          name="franchise"
          id="franchise"
          value={selectedFranchiseId}
          onChange={handleFranchiseSelect}
        >
          <option value="">Select a Franchise</option>
          {franchise.map((f) => (
            <option key={f.franchiseId} value={f.franchiseId}>
              {f.instituteName || `Franchise ${f.franchiseId}`}
            </option>
          ))}
        </select>
        <Input
          placeholder="Search by Franchise ID, Enrollment ID, or Name"
          value={searchFranchise}
          onChange={(e) => setSearchFranchise(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button
            onClick={() => {
              setFilteredStudents([]);
              setSearchFranchise("");
              setSelectedFranchiseId("");
            }}
          >
            Reset
          </Button>
        </div>
      </div>
      {!selectedFranchiseId && (
        <div style={{ padding: "10px", fontStyle: "italic", color: "gray" }}>
          Please select a franchise to view student data.
        </div>
      )}

      {Object.keys(groupedStudents).map((franchiseId) => (
        <React.Fragment key={franchiseId}>
          <div className={styles.headingBox}>
            <div className={styles.currentStudentsCount}>
              Showing {currentStudentsCount} students on this page.
            </div>
            <h2 className={styles.heading}>
              {franchise.find((f) => String(f.franchiseId) === franchiseId)?.instituteName || "Unknown"} : {franchiseId} — Students: {groupedStudents[franchiseId].length}
            </h2>
          </div>
          <div className={styles.franchiseSection}>
            <Table
              dataSource={groupedStudents[franchiseId]}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                onChange: (page, size) => {
                  setCurrentPage(page);
                  setPageSize(size || 10);
                },
              }}
              rowKey={(record) => record.enrollmentId || `student-${record.id}`}
              className={styles.table}
              columns={[
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
                  render: (_, record: Student) => (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <Button type="primary" onClick={() => handleAddMarksClick(record)}>
                        Add Marks
                      </Button>
                      <Button type="primary" onClick={() => handleEnableCertificate(record)}>
                        Enable Certificate & Marksheet
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </React.Fragment>
      ))}

      <Modal
        title={`Add Marks for ${selectedStudent?.name || "Student"}`}
        open={isMarksModalVisible}
        onCancel={() => setIsMarksModalVisible(false)}
        footer={null}
        width={1000}
        className={styles.marksModal}
      >
        {selectedStudent && (
          <AddMarksFormPopUp
            student={selectedStudent}
            setIsMarksModalVisible={setIsMarksModalVisible}
            StudentMarks={selectedStudent.marks || []}
            onMarksUpdate={(updatedMarks) =>
              handleMarksUpdate(updatedMarks, selectedStudent.enrollmentId)
            }
          />
        )}
      </Modal>
    </div>
  );
};

export default MarkEntryForm;
