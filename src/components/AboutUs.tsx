import React from 'react';
import Navbar from '../common-components/Navbar';
import Footer from '../common-components/Footer';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="about-us">
        <div className="about-hero">
          <h1 className="about-head">About IICL Education</h1>
          <p className="about-sub">
            Empowering minds. Transforming futures.
          </p>
        </div>

        <div className="about-content">
          <p className="about-intro">
            At <strong>IICL Education</strong>, we are dedicated to shaping the future of India through high-quality, accessible, and industry-relevant education. With a mission to empower students and professionals with cutting-edge knowledge and practical skills, we offer programs across IT, vocational training, and entrepreneurial development.
          </p>

          <div className="info-sections">
            <div className="info-box">
              <h2>Our Mission</h2>
              <p>
                To bridge the gap between traditional education and modern industry demands by nurturing future-ready professionals through skill-based training and innovation-led programs.
              </p>
            </div>

            <div className="info-box">
              <h2>Our Vision</h2>
              <p>
                To be India’s most impactful training institution, creating a wave of skilled individuals ready to contribute meaningfully to society and the economy.
              </p>
            </div>

            <div className="info-box">
              <h2>Why Choose IICL?</h2>
              <p>
                ✓ Industry-experienced faculty<br />
                ✓ Hands-on learning & real-world projects<br />
                ✓ Certification & placement assistance<br />
                ✓ Personalized mentorship & career support
              </p>
            </div>

            <div className="info-box">
              <h2>Community Impact</h2>
              <p>
                We have empowered 10,000+ students across rural and urban India through affordable, high-quality training in software, hardware, and vocational skills.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
