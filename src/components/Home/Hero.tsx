import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

type HeroProps = {
  scrollToStory: () => void;
};

const Hero: React.FC<HeroProps> = ({ scrollToStory }) => {
  const navigate = useNavigate();

  const handleClickEnquire = () => {
    navigate("/franchise/form");
  };

  return (
    <section className="hero-container">
      <div className="overlays"></div>

      <div className="hero-content">
        <h1 className="hero-heading">
          <span>"Unlock Your Potential with </span>
          <span className="highlight">Indian Institute of Computer Literacy</span>"
        </h1>
        <p className="hero-description">
          "At <span className="highligh">Indian Institute of Computer Literacy</span>, we provide
          cutting-edge computer education to help you build a successful career
          in technology..."
        </p>

        <div className="hero-buttons">
          <button onClick={scrollToStory} className="explore-button">
            Explore Now
          </button>
          <button onClick={handleClickEnquire} className="enroll-button">
            Enquire Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
