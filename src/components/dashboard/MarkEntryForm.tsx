// components/DynamicMarkEntryForm.tsx
import React, { useState } from "react";
import { Subject } from "../../services/studentService";
import styles from "./styles/ViewStudent.module.css";

interface DynamicMarkEntryFormProps {
  onSubmit: (subjects: Subject[]) => void;
}

const MarkEntryForm: React.FC<DynamicMarkEntryFormProps> = ({ onSubmit }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const addSubject = () => {
    const newSubject: Subject = {
      subject: "",
      theory: 60,
      lab: 40,
      totalMarks: 0,
      obtainedTheory: 0,
      obtainedLab: 0,
      obtainedTotal: 0,
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (index: number) => {
    const updated = [...subjects];
    updated.splice(index, 1);
    setSubjects(updated);
  };

  const handleChange = (index: number, field: keyof Subject, value: string) => {
    const updated = [...subjects];
    if (field === "subject") {
      updated[index][field] = value;
    } else {
      let parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) parsedValue = 0;
      updated[index][field] = parsedValue;
    }

    if (field === "theory" || field === "lab") {
      updated[index].totalMarks = updated[index].theory + updated[index].lab;
    }
    if (field === "obtainedTheory" || field === "obtainedLab") {
      updated[index].obtainedTotal = updated[index].obtainedTheory + updated[index].obtainedLab;
    }

    setSubjects(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(subjects);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.dynamicMarkEntryForm}>
      {subjects.map((subj, index) => (
        <div key={index} className={styles.subjectEntry}>
          <h4 className={styles.subjectTitle}>Subject {index + 1}</h4>
          <div className={styles.inputGroup}>
            <label>
              Subject Name:
              <input
                type="text"
                value={subj.subject}
                onChange={(e) => handleChange(index, "subject", e.target.value)}
                required
                className={styles.inputField}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label>
              Maximum Theory Marks:
              <input
                type="number"
                min="0"
                value={subj.theory}
                onChange={(e) => handleChange(index, "theory", e.target.value)}
                required
                className={styles.inputField}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label>
              Maximum Practical Marks:
              <input
                type="number"
                min="0"
                value={subj.lab}
                onChange={(e) => handleChange(index, "lab", e.target.value)}
                required
                className={styles.inputField}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label>
              Obtained Theory Marks:
              <input
                type="number"
                min="0"
                value={subj.obtainedTheory}
                onChange={(e) => handleChange(index, "obtainedTheory", e.target.value)}
                required
                className={styles.inputField}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label>
              Obtained Practical Marks:
              <input
                type="number"
                min="0"
                value={subj.obtainedLab}
                onChange={(e) => handleChange(index, "obtainedLab", e.target.value)}
                required
                className={styles.inputField}
              />
            </label>
          </div>
          <div className={styles.totalMarksDisplay}>
            <strong>
              Total Maximum: {subj.totalMarks} | Total Obtained: {subj.obtainedTotal}
            </strong>
          </div>
          <button type="button" onClick={() => removeSubject(index)} className={styles.removeButton}>
            Remove Subject
          </button>
          <hr />
        </div>
      ))}
      <button type="button" onClick={addSubject} className={styles.addButton}>
        Add Subject
      </button>
      <br />
      <button type="submit" className={styles.submitButton}>Submit Marks</button>
    </form>
  );
};

export default MarkEntryForm;
