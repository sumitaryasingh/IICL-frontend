import React, { useState, useEffect, useMemo } from "react";
import { Table, Modal, Button } from "antd";
import styles from "./styles/MarkEntryForm.module.css";
import { getAllStudents, StudentData } from "../../services/studentService";
import AddMarksFormPopUp from "./AddMarksFormPopUp";

interface StudentProps {
  student: string;
  setIsMarksModalVisible: any;
  StudentMarks: Mark[];
  onMarksUpdate: (updatedMarks: Mark[]) => void; // ✅ Pass function from parent
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isMarksModalVisible, setIsMarksModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        console.log("Fetched Students:", data);
        console.log("Fetched Students marks:", data[0].marks);

        const validData = (data || []).map((student: StudentData, index) => ({
          ...student,
          enrollmentId: student.enrollmentId || `temp-${index}`,
          id: student.id || `fallback-id-${index}`,
          franchiseId: student.franchiseId ? String(student.franchiseId) : "unknown",
          marks: Array.isArray(student.marks) ? student.marks : [], // Ensure marks array exists
        }));

        console.log("Processed Students:", validData);
        setStudents(validData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);


  const handleMarksUpdate = (updatedMarks: Mark[], studentId: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.enrollmentId === studentId
          ? { ...student, marks: updatedMarks } // ✅ Update only the selected student’s marks
          : student
      )
    );
  };

  // Group students by franchiseId
  const groupedStudents = useMemo(() => {
    return students.reduce<Record<string, Student[]>>((acc, student) => {
      const franchiseKey = String(student.franchiseId);
      if (!acc[franchiseKey]) {
        acc[franchiseKey] = [];
      }
      acc[franchiseKey].push(student);
      return acc;
    }, {});
  }, [students]);

  // Handle opening modal and setting selected student
  const handleAddMarksClick = (student: Student) => {
    setSelectedStudent(student);
    setIsMarksModalVisible(true);
  };
  

  return (
    <div className={styles.container}>
      {Object.keys(groupedStudents).map((franchiseId) => (
        <div key={franchiseId} className={styles.franchiseSection}>
          <h2 className={styles.heading}>Franchise {franchiseId}</h2>
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
                  <Button type="primary" onClick={() => handleAddMarksClick(record)}>
                    Add Marks
                  </Button>
                ),
              },
            ]}
          />
        </div>
      ))}

     {/* Modal for Add Marks */}
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
    student={selectedStudent} // ✅ Pass the full student object
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
