import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import programmeData from "../../api/programmeData.json";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import styles from "./styles/Programs.module.css";

// Define the types for the programme data
interface Programme {
  id: string;
  title: string;
  duration: string;
  subjects: string[];
}

export default function Programme() {
  const { type } = useParams<{ type: string }>(); // Get selected course type from URL
  const selectedType = decodeURIComponent(type || ""); // Decode special characters

  // Get the selected category data
  const [courseCategory, setCourseCategory] = useState(() =>
    programmeData.find((category) => category.type === selectedType)
  );
  const [showProgram, setShowProgram] = useState<string | null>(null);

  // Update the category when route changes
  useEffect(() => {
    setCourseCategory(programmeData.find((category) => category.type === selectedType));
    setShowProgram(null);
  }, [selectedType]);

  return (
    <div>
      <Navbar />

      {/* Links to all course types */}
      <div className={styles["course-links"]}>
        {programmeData.map((category) => (
          <Link key={category.type} to={`/programs/${encodeURIComponent(category.type)}`} className={styles["course-link"]}>
            {category.type}
          </Link>
        ))}
      </div>

      <div className={styles["program-container"]}>
        <h1>{selectedType ? `${selectedType} List` : "Select a Course Type"}</h1>

        {courseCategory ? (
          courseCategory.courses.map((curElem: Programme) => (
            <ProgramItems key={curElem.id} curElem={curElem} showProgram={showProgram} setShowProgram={setShowProgram} />
          ))
        ) : (
          <p>Please select a course type from above.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

// Define the props for individual course items
interface ProgramItemsProps {
  curElem: Programme;
  showProgram: string | null;
  setShowProgram: React.Dispatch<React.SetStateAction<string | null>>;
}

// Component to display each course item
const ProgramItems: React.FC<ProgramItemsProps> = ({ curElem, showProgram, setShowProgram }) => {
  const handleToggle = () => {
    setShowProgram((prev) => (prev === curElem.id ? null : curElem.id)); // Toggle accordion
  };

  return (
    <div className={styles.programItems}>
      <div className={styles.programHeader} onClick={handleToggle} style={{ cursor: "pointer" }}>
        <h3>{curElem.title}</h3>
        <IoMdArrowDropdownCircle className={styles["down-arrow"]} />
      </div>
      {showProgram === curElem.id && (
        <div className={styles.programDetails}>
          <p><strong>Duration:</strong> {curElem.duration}</p>
          <p><strong>Subjects:</strong> {curElem.subjects.join(", ")}</p>
        </div>
      )}
    </div>
  );
};
