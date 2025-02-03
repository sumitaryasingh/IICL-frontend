import React from "react";
import "./Home.css"; // Import CSS

const WelcomeSection: React.FC = () => {
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
            ventured into diverse training sectors ranging from IT hardware &
            software training...
          </p>
          <a href="#" className="btn">
            About More
          </a>
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
