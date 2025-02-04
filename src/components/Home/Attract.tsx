import React, { useState } from "react";
import {FaChevronDown,FaChevronUp, FaBook, FaGraduationCap, FaLaptop, FaHandshake, FaUsers, FaBullhorn, FaRegPaperPlane, FaSearch } from "react-icons/fa";  // Importing icons
import "./Home.css";  // Make sure to link the correct CSS

const Attract: React.FC = () => {
  const [showMore, setShowMore] = useState(false); // State to toggle cards visibility

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle the state for showing more cards
  };

  return (
    <section className="about-section">
        <h2 className="section-title">What We Offer</h2>
      <div className="container">
        <div className="cards-container">
          {/* Card 1 */}
          <div className="card">
            <FaBook className="card-icon" />
            <h3 className="card-title">Comprehensive Resources</h3>
            <p className="card-description">
              We provide students with top-notch resources including e-books, software tools, and support materials.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card">
            <FaGraduationCap className="card-icon" />
            <h3 className="card-title">Exclusive Advantages</h3>
            <p className="card-description">
              Get one-on-one mentorship, career counseling, and networking opportunities with industry leaders.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card">
            <FaLaptop className="card-icon" />
            <h3 className="card-title">Attractive Features</h3>
            <p className="card-description">
              Enjoy flexible learning schedules, interactive online classes, and industry-relevant certification programs.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card">
            <FaHandshake className="card-icon" />
            <h3 className="card-title">24/7 Support</h3>
            <p className="card-description">
              Our dedicated support team ensures you get help anytime, so your learning never stops.
            </p>
          </div>

          {/* Conditionally rendered cards (hidden initially on mobile) */}
          {showMore && (
            <>
              {/* Card 5 */}
              <div className="card">
                <FaUsers className="card-icon" />
                <h3 className="card-title">Active Community</h3>
                <p className="card-description">
                  Join a supportive and engaging community of learners, mentors, and alumni to foster collaboration.
                </p>
              </div>

              {/* Card 6 */}
              <div className="card">
                <FaBullhorn className="card-icon" />
                <h3 className="card-title">Career Services</h3>
                <p className="card-description">
                  Access our career services to get job placements, internship opportunities, and career counseling.
                </p>
              </div>

              {/* Card 7 */}
              <div className="card">
                <FaRegPaperPlane className="card-icon" />
                <h3 className="card-title">Innovation & Growth</h3>
                <p className="card-description">
                  Our curriculum is designed to promote creativity, innovation, and problem-solving skills.
                </p>
              </div>

              {/* Card 8 */}
              <div className="card">
                <FaSearch className="card-icon" />
                <h3 className="card-title">Industry Collaboration</h3>
                <p className="card-description">
                  Collaborate with professionals and participate in real-world projects to gain practical experience.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

        {/* Show More Button */}
        <div className="show-more">
          <button onClick={toggleShowMore} className="show-more-btn">
            {showMore ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
    </section>
  );
};

export default Attract;
