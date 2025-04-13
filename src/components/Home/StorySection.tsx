import React, { useState } from "react";
import "./Home.css";

const WelcomeSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(true);
  };

  return (
    <section className="welcome-section">
      <div className="container">
        {/* Left Content */}
        <div className="content">
          <h2>
            <span className="highlight">Welcome To</span> <b>IICL Education</b>
          </h2>
          <div className="underline"></div>
          <p>
            IICL Educational and Technologies Foundation is one of the leading
            non-formal training providers, developing Skills and Talent through
            its efficacious learning programs and techniques, hence building a
            pool of coveted workforce according to global industry requirements.
          </p>
          <p>
            IICL Educational and Technologies Foundation has effectively
            ventured into diverse training sectors ranging from IT hardware &amp;
            software training...
          </p>
          {expanded && (
            <p>
              We also offer courses in management, vocational skills, and
              personality development. Our mission is to empower youth by
              creating job-ready individuals equipped with the latest technical
              know-how and interpersonal expertise. Our foundation partners with
              reputed organizations and government bodies to ensure quality and
              credibility.
            </p>
          )}
          {!expanded && (
            <button className="btn" onClick={handleExpand}>
              About More
            </button>
          )}
        </div>

        {/* Right Image */}
        <div className="image-container">
          <img src="/images/image.png" alt="Welcome Image" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
