import React from "react";
import "./Home.css";  // Make sure to create the relevant CSS file

const Attract: React.FC = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-title">What we offer</h2>
        <div className="cards-container">
          {/* Card 1: Resources */}
          <div className="card">
            <img
              src="/images/resources.svg"
              alt="Resources"
              className="card-icon"
            />
            <h3 className="card-title">Comprehensive Resources</h3>
            <p className="card-description">
              We provide students with top-notch resources to enhance their
              learning experience, including access to e-books, software tools,
              and dedicated support materials.
            </p>
          </div>

          {/* Card 2: Advantages */}
          <div className="card">
            <img
              src="/images/advantages.svg"
              alt="Advantages"
              className="card-icon"
            />
            <h3 className="card-title">Exclusive Advantages</h3>
            <p className="card-description">
              Our students benefit from unique perks, including one-on-one
              mentorship, career counseling, and networking opportunities with
              industry leaders.
            </p>
          </div>

          {/* Card 3: Attractive Features */}
          <div className="card">
            <img
              src="/images/features.svg"
              alt="Attractive Features"
              className="card-icon"
            />
            <h3 className="card-title">Attractive Features</h3>
            <p className="card-description">
              We offer flexible learning schedules, interactive online classes,
              and industry-relevant certification programs to help students stand
              out in the job market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attract;
