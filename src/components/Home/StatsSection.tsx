import React from "react";
import "./Home.css";

// Animated Counter Hook
const useCounter = (end: number, duration: number) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const increment = Math.ceil(end / (duration / 10));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 10);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

// Stats Component
const StatsSection: React.FC = () => {
  const trainingCenters = useCounter(700, 2000);
  const professionalCourses = useCounter(250, 2000);
  const enrolledStudents = useCounter(7350, 2000);

  return (
    <section className="stats-section">
      <div className="stats-container">
        {/* Training Centers */}
        <div className="stat-box">
          <img
            src="/images/training.png"
            alt="Training Centers"
            className="icon"
          />
          <h2 className="stat-number">{trainingCenters}+</h2>
          <p>TRAINING CENTERS</p>
        </div>

        {/* Professional Courses */}
        <div className="stat-box">
          <img
            src="/images/courses.png"
            alt="Professional Courses"
            className="icon"
          />
          <h2 className="stat-number">{professionalCourses}+</h2>
          <p>PROFESSIONAL COURSES</p>
        </div>

        {/* Enrolled Students */}
        <div className="stat-box">
          <img
            src="/images/student.png"
            alt="Enrolled Students"
            className="icon"
          />
          <h2 className="stat-number">{enrolledStudents}+</h2>
          <p>ENROLLED STUDENTS</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
