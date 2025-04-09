import { Link } from "react-router-dom";
import {programData} from "../../api/programmeData";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";
import styles from "./styles/Programs.module.css";

export default function ProgrammeList() {
  return (
    <div>
      <Navbar />
      <div className={styles["program-list-container"]}>
        <h1>Our Program Categories</h1>
        {programData.map((courseType: any, index: any) => (
          <Link to={`/programs/${encodeURIComponent(courseType.type)}`} key={index} className="program-link">
            {courseType.type}
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
