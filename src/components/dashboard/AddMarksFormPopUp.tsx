import React, { useState } from 'react';
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
  student: any; // Replace with your proper student type if available
  setIsMarksModalVisible: (visible: boolean) => void;
  StudentMarks: Mark[]; // Marks loaded from the database
  onMarksUpdate: (updatedMarks: Mark[]) => void;
}

const courses: Course[] = [
  {
    id: "1",
    course: "ADCA",
    subjects: [
      "Fundamentals",
      "MS Excel",
      "MS Word",
      "MS PowerPoint",
      "Tally",
      "Pagemaker",
      "MS Access",
      "MS Outlook & Internet"
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
  // Form fields state
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [theoryMaxMarks, setTheoryMaxMarks] = useState<number | ''>(60);
  const [theoryObtainedMarks, setTheoryObtainedMarks] = useState<number | ''>('');
  const [practicalMaxMarks, setPracticalMaxMarks] = useState<number | ''>(40);
  const [practicalObtainedMarks, setPracticalObtainedMarks] = useState<number | ''>('');
  
  // Editing state variables
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  // Reset form fields
  const resetForm = () => {
    setSelectedSubject('');
    setTheoryMaxMarks('');
    setTheoryObtainedMarks('');
    setPracticalMaxMarks('');
    setPracticalObtainedMarks('');
  };

  // Handle form submission for adding or updating a mark
  const handleAddSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!selectedCourseId) {
      toast.error("Please select a course.");
      return;
    }
    if (!selectedSubject) {
      toast.error("Please select a subject.");
      return;
    }
    if (theoryMaxMarks === '' || theoryObtainedMarks === '' || practicalMaxMarks === '' || practicalObtainedMarks === '') {
      toast.error("Please enter all marks.");
      return;
    }

    // If in editing mode, update the mark in the database
    if (isEditing && editingIndex !== null) {
      const updatedMark: Mark = {
        subject: selectedSubject,
        theoryMaxMarks: Number(theoryMaxMarks),
        theoryObtainedMarks: Number(theoryObtainedMarks),
        practicalMaxMarks: Number(practicalMaxMarks),
        practicalObtainedMarks: Number(practicalObtainedMarks),
      };
      try {
        await updateStudentMarkByEnrollmentId(student, updatedMark);
        const updatedMarks = [...StudentMarks];
        updatedMarks[editingIndex] = updatedMark;
        onMarksUpdate(updatedMarks);
        toast.success("Mark updated successfully!");
      } catch (error) {
        toast.error("Failed to update mark. Please try again.");
        console.error("Update error:", error);
      }
      setIsEditing(false);
      setEditingIndex(null);
      resetForm();
      return;
    }

    // For adding new mark, check if subject already exists (case-insensitive)
    const duplicate = StudentMarks.some(
      (mark) => mark.subject.toLowerCase() === selectedSubject.toLowerCase()
    );
    if (duplicate) {
      toast.error("This subject already exists in the database. Duplicate entries are not allowed.");
      return;
    }

    const newSubjectMark: Mark = {
      subject: selectedSubject,
      theoryMaxMarks: Number(theoryMaxMarks),
      theoryObtainedMarks: Number(theoryObtainedMarks),
      practicalMaxMarks: Number(practicalMaxMarks),
      practicalObtainedMarks: Number(practicalObtainedMarks),
    };

    try {
      await addEditStudentMarksByEnrollmentId(student.enrollmentId, [newSubjectMark]);
      onMarksUpdate([...StudentMarks, newSubjectMark]);
      toast.success("Mark added successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to add mark. Please try again.");
      console.error("Add error:", error);
    }
  };

  // Edit function: pre-fill form with the mark's data and set edit mode
  const handleEditMarks = (mark: Mark, index: number) => {
    setSelectedSubject(mark.subject);
    setTheoryMaxMarks(mark.theoryMaxMarks);
    setTheoryObtainedMarks(mark.theoryObtainedMarks);
    setPracticalMaxMarks(mark.practicalMaxMarks);
    setPracticalObtainedMarks(mark.practicalObtainedMarks);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Delete function: remove the mark from the database and update parent's state
  const handleDeleteMarks = async (mark: Mark) => {
    try {
      await deleteStudentMarkByEnrollmentId(student, mark.subject);
      const updatedMarks = StudentMarks.filter(
        (item) => item.subject.toLowerCase() !== mark.subject.toLowerCase()
      );
      onMarksUpdate(updatedMarks);
      toast.success("Mark deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete mark. Please try again.");
      console.error("Delete error:", error);
    }
  };

  const handleOnSave = async () => {
    // Since all changes are directly updated in the DB, just close the modal.
    setIsMarksModalVisible(false);
  };

  const handleOnCancel = () => {
    setIsMarksModalVisible(false);
  };

  return (
    <>
      <div className={styles.marksFormContainer}>
        <h2 className={styles.heading}>Add/Edit Marks</h2>
        <form onSubmit={handleAddSubject} className={styles.form}>
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
          <button type="submit" className={styles.submitButton}>
            {isEditing ? "Update Mark" : "Add Mark"}
          </button>
        </form>

        <div className={styles.marksTableContainer}>
          <h3>Marks in Database</h3>
          {StudentMarks.length === 0 ? (
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
                {StudentMarks.map((item, index) => (
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
            cursor: "pointer"
          }}
        >
          Save
        </button>
        <button 
          onClick={handleOnCancel} 
          style={{
            backgroundColor: "#f8f9fa",
            color: "#333",
            border: "1px solid #ccc",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddMarksFormPopUp;
