import React, { useState, useEffect } from 'react';
import styles from './styles/MarkEntryForm.module.css';
import {
  addEditStudentMarksByEnrollmentId,
  updateStudentMarkByEnrollmentId,
  deleteStudentMarkByEnrollmentId,
  setStudentIssueDate,
} from '../../services/studentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Course {
  id: string;
  course: string;
  subjects: string[];
  issueDate?: string;
}

export interface Mark {
  subject: string;
  theoryMaxMarks: number;
  theoryObtainedMarks: number;
  practicalMaxMarks: number;
  practicalObtainedMarks: number;
}

interface StudentProps {
  student: any;
  setIsMarksModalVisible: (visible: boolean) => void;
  StudentMarks: Mark[];
  onMarksUpdate: (updatedMarks: Mark[]) => void;
}

const courses: Course[] = [
  {
    id: "1",
    course: "ADCA",
    subjects: [
      "Computer Fundamentals", "Operating Systems (MS Windows 10/11, Mac Os)", "MS Office (Word, Excel, PowerPoint)","Typing", "Graphic Designing(Photoshop, Pagemaker)", "Tally", "Internet & AI", "Coding & Programming(Python)", "Project"
    ]
  },
  {
    id: "2",
    course: "DCA",
    subjects: ["Computer Fundamentals", "Operating Systems (MS Windows 10/11, Mac Os)", "MS Office (Word, Excel, PowerPoint)", "Typing", "HTML", "Internet & AI","Project"],
  },
];

const AddMarksFormPopUp: React.FC<StudentProps> = ({
  student,
  setIsMarksModalVisible,
  StudentMarks,
  onMarksUpdate,
}) => {
  const [marksList, setMarksList] = useState<Mark[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [theoryMaxMarks, setTheoryMaxMarks] = useState<number | ''>(60);
  const [theoryObtainedMarks, setTheoryObtainedMarks] = useState<number | ''>('');
  const [practicalMaxMarks, setPracticalMaxMarks] = useState<number | ''>(40);
  const [practicalObtainedMarks, setPracticalObtainedMarks] = useState<number | ''>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'marks' | 'issue'>('marks');
  const [issueDate, setIssueDate] = useState<string>('');

  useEffect(() => {
    setMarksList(StudentMarks);
  }, [StudentMarks]);

  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  const resetForm = () => {
    setSelectedSubject('');
    setTheoryMaxMarks(60);
    setTheoryObtainedMarks('');
    setPracticalMaxMarks(40);
    setPracticalObtainedMarks('');
  };

 
const handleSaveIssueDate = async () => {
  try {
    const response = await setStudentIssueDate(student.enrollmentId, issueDate);
    alert(response.message); // or show in toast
  } catch (error: any) {
    alert(error.message);
  }
};
  

  const handleAddSubject = async (): Promise<boolean> => {
    if (!selectedCourseId) {
      toast.error("Please select a course.");
      return false;
    }
    if (!selectedSubject) {
      toast.error("Please select a subject.");
      return false;
    }
    if (
      theoryMaxMarks === '' ||
      theoryObtainedMarks === '' ||
      practicalMaxMarks === '' ||
      practicalObtainedMarks === ''
    ) {
      toast.error("Please enter all marks.");
      return false;
    }

    const newSubjectMark: Mark = {
      subject: selectedSubject,
      theoryMaxMarks: Number(theoryMaxMarks),
      theoryObtainedMarks: Number(theoryObtainedMarks),
      practicalMaxMarks: Number(practicalMaxMarks),
      practicalObtainedMarks: Number(practicalObtainedMarks),
    };

    if (isEditing && editingIndex !== null) {
      try {
        await updateStudentMarkByEnrollmentId(student, newSubjectMark);
        const updatedMarks = [...marksList];
        updatedMarks[editingIndex] = newSubjectMark;
        setMarksList(updatedMarks);
        onMarksUpdate(updatedMarks);
        toast.success("Mark updated successfully!");
        setIsEditing(false);
        setEditingIndex(null);
        resetForm();
        return true;
      } catch (error) {
        toast.error("Failed to update mark. Please try again.");
        console.error("Update error:", error);
        return false;
      }
    }

    const duplicate = marksList.some(
      (mark) => mark.subject.toLowerCase() === selectedSubject.toLowerCase()
    );
    if (duplicate) {
      toast.error("This subject already exists. Duplicate entries are not allowed.");
      return false;
    }

    try {
      await addEditStudentMarksByEnrollmentId(student.enrollmentId, [newSubjectMark]);
      const updated = [...marksList, newSubjectMark];
      setMarksList(updated);
      onMarksUpdate(updated);
      toast.success("Mark added successfully!");
      resetForm();
      return true;
    } catch (error) {
      toast.error("Failed to add mark. Please try again.");
      console.error("Add error:", error);
      return false;
    }
  };

  const handleEditMarks = (mark: Mark, index: number) => {
    setSelectedSubject(mark.subject);
    setTheoryMaxMarks(mark.theoryMaxMarks);
    setTheoryObtainedMarks(mark.theoryObtainedMarks);
    setPracticalMaxMarks(mark.practicalMaxMarks);
    setPracticalObtainedMarks(mark.practicalObtainedMarks);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDeleteMarks = async (mark: Mark) => {
    try {
      await deleteStudentMarkByEnrollmentId(student, mark.subject);
      const updatedMarks = marksList.filter(
        (item) => item.subject.toLowerCase() !== mark.subject.toLowerCase()
      );
      setMarksList(updatedMarks);
      onMarksUpdate(updatedMarks);
      toast.success("Mark deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete mark. Please try again.");
      console.error("Delete error:", error);
    }
  };

  const handleOnSave = async () => {
    await handleAddSubject();
  };

  const handleOnCancel = () => {
    setIsMarksModalVisible(false);
  };

  return (
    <>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('marks')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '10px',
            backgroundColor: activeTab === 'marks' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'marks' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Marks Entry
        </button>
        <button
          onClick={() => setActiveTab('issue')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: activeTab === 'issue' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'issue' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Issue Date
        </button>
      </div>

      {/* Tab Content */}
     {activeTab === 'marks' && (
  <>
    <div className={styles.marksFormContainer}>
      <h2 className={styles.heading}>Add/Edit Marks</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Course:</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.course}</option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className={styles.formGroup}>
            <label>Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select a subject</option>
              {selectedCourse.subjects.map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Theory Max Marks:</label>
          <input
            type="number"
            value={theoryMaxMarks}
            onChange={(e) => setTheoryMaxMarks(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Theory Obtained Marks:</label>
          <input
            type="number"
            value={theoryObtainedMarks}
            onChange={(e) => setTheoryObtainedMarks(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Practical Max Marks:</label>
          <input
            type="number"
            value={practicalMaxMarks}
            onChange={(e) => setPracticalMaxMarks(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Practical Obtained Marks:</label>
          <input
            type="number"
            value={practicalObtainedMarks}
            onChange={(e) => setPracticalObtainedMarks(Number(e.target.value))}
          />
        </div>
      </form>

      <div className={styles.marksTableContainer}>
        <h3>Marks in Database</h3>
        {marksList.length === 0 ? (
          <p>No marks added yet.</p>
        ) : (
          <table className={styles.marksTable}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Theory Max Marks</th>
                <th>Theory Obtained Marks</th>
                <th>Practical Max Marks</th>
                <th>Practical Obtained Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marksList.map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.theoryMaxMarks}</td>
                  <td>{item.theoryObtainedMarks}</td>
                  <td>{item.practicalMaxMarks}</td>
                  <td>{item.practicalObtainedMarks}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => handleEditMarks(item, index)}>Edit</button>
                    <button className={styles.dltBtn} onClick={() => handleDeleteMarks(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Buttons for marks tab */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={handleOnSave}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "0.8rem",
          }}
        >
          {isEditing ? "Update & Save" : "Add & Save"}
        </button>
        <button
          onClick={handleOnCancel}
          style={{
            backgroundColor: "crimson",
            color: "#fff",
            border: "1px solid #ccc",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "0.8rem",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </>
)}

{activeTab === 'issue' && (
  <div className={styles.marksFormContainer}>
    <h2 className={styles.heading}>Set Issue Date</h2>
    <div className={styles.formGroup}>
      <label>Issue Date:</label>
      <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
    </div>

    {/* Buttons for issue tab */}
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <button
        onClick={handleSaveIssueDate} 
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "0.8rem",
        }}
      >
        Save Issue Date
      </button>
      <button
        onClick={handleOnCancel}
        style={{
          backgroundColor: "crimson",
          color: "#fff",
          border: "1px solid #ccc",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "0.8rem",
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default AddMarksFormPopUp;
