import React, { useState, useEffect } from 'react';
import styles from './styles/MarkEntryForm.module.css';
import { 
  addEditStudentMarksByEnrollmentId,
  updateStudentMarkByEnrollmentId,
  deleteStudentMarkByEnrollmentId 
} from '../../services/studentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Course {
  id: string;
  course: string;
  subjects: string[];
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
      "Fundamentals", "MS Excel", "MS Word", "MS PowerPoint",
      "Tally", "Pagemaker", "MS Access", "MS Outlook & Internet"
    ],
  },
  {
    id: "2",
    course: "DCA",
    subjects: ["Fundamentals", "MS Excel", "MS Word", "MS PowerPoint", "Tally"],
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
  

  const handleAddSubject = async (): Promise<boolean> => {
    if (!selectedCourseId) {
      toast.error("Please select a course.");
      return false;
    }
    if (!selectedSubject) {
      toast.error("Please select a subject.");
      return false;
    }
    if (theoryMaxMarks === '' || theoryObtainedMarks === '' || practicalMaxMarks === '' || practicalObtainedMarks === '') {
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
    await handleAddSubject(); // do not close modal, just update table
  };

  const handleOnCancel = () => {
    setIsMarksModalVisible(false);
  };

  return (
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
                      <button className={styles.editBtn} onClick={() => handleEditMarks(item, index)}>
                        Edit
                      </button>
                      <button className={styles.dltBtn} onClick={() => handleDeleteMarks(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

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
            marginTop:"0.8rem"
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
            marginTop:"0.8rem"
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddMarksFormPopUp;
