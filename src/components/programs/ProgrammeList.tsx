import { Link } from "react-router-dom";
import programmeData from "../../api/programmeData.json";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";
import "./styles/Programs.css";

export default function ProgrammeList() {
  return (
    <div>
      <Navbar />
      <div className="program-list-container">
        <h1>Our Program Categories</h1>
        {programmeData.map((courseType, index) => (
          <Link to={`/programs/${encodeURIComponent(courseType.type)}`} key={index} className="program-link">
            {courseType.type}
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
