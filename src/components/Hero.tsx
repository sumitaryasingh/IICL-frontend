import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-container">
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="hero-heading"><span style={{ color: "white" }}>"Unlock Your Potential with</span> <span className="highlight">IICL Education"</span></h1>
        <p className="hero-description">
          "At <span className="highlight">IICL Education</span>, we provide cutting-edge computer education to help you build a successful career in technology. Our expert-led courses in programming, web development, and IT solutions are designed to equip you with the skills needed to thrive in today’s digital world. Join us and unlock your full potential."
        </p>

        <div className="hero-buttons">
          <button className="explore-button">Explore Now</button>
          <button className="enroll-button">Enroll Now</button>
        </div>
      </div>

      {/* Play Button */}
      <button className="play-button">
        <PlayIcon className="play-icon" />
      </button>
    </section>
  );
};

export default Hero;
