import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import styles from "./styles/Dashboard.module.css";
import Navbar from "./Navbar";
import Certificate from "./Certificate";
import Marksheet from "./Marksheet";

// const studentData = {
//   name: "Rohit Sharma",
//   course: "Diploma in Computer Application",
//   institute: "icomputer education",
//   location: "Ram Rajya more, Siwan - Bihar",
//   marks: 87.3,
//   grade: "A",
//   date: "05 September 2024",
//   rollNumber: "IICL18989009198765",
//   certificateNumber: "CERT1876332345612",
//   organization: "Certiport Academy",
// };

// const studentMarksheet = {
//   name: "Rohit Sharma",
//   enrollmentNumber: "IICL18989009198765",
//   certificateNumber: "CERT1876332345612",
//   course: "Diploma in Computer Application (DCA)",
//   fatherName: "Mr. Ramesh Sharma",
//   motherName: "Mrs. Sunita Sharma",
//   institute: "icomputer education",
//   location: "Ram Rajya more, Siwan - Bihar",
//   registrationNumber: "REGIICL123456789",
//   marks: 613,
//   percentage:76.63,
//   grade: "A",
//   subjects: [
//     { subject: "Computer Fundamentals, IT & Windows", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 49, obtainedLab: 34, obtainedTotal: 73 },
//     { subject: "MS Word", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 43, obtainedLab: 33, obtainedTotal: 66 },
//     { subject: "MS Excel", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 45, obtainedLab: 34, obtainedTotal: 79 },
//     { subject: "MS PowerPoint", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 39, obtainedLab: 31, obtainedTotal: 70 },
//     { subject: "MS Outlook & Internet", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 43, obtainedLab: 34, obtainedTotal: 77 },
//     { subject: "MS Access", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 39, obtainedLab: 31, obtainedTotal: 70 },
//     { subject: "Tally, RPP9 / Tally Prime", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 39, obtainedLab: 31, obtainedTotal: 70 },
//     { subject: "PageMaker, Photoshop, Corel Draw", theory: 60, lab: 40, totalMarks: 100, obtainedTheory: 43, obtainedLab: 34, obtainedTotal: 77 }
//   ]
// };

const DashboardIndex = () => {
  return (
    <div className={styles.dashboardContainer}>
      <DashboardSidebar />
      <div className={styles.mainContent}>
        <Navbar/>
        <div className={styles.pageContent}>
          <h1>Welcome to the Dashboard</h1>
          {/* <Certificate student={studentData}/> */}
          {/* Add more dashboard content here */}
          {/* <Marksheet student={studentMarksheet} /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;
