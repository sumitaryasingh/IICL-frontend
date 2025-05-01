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
        <div className="certifications-section">
          <h2 className="section-title">Our Certifications</h2>
          <div className="certification-cards">
            <div className="cert-card">
              <img src="/images/isoLogo.jpg" className='isoLogo' alt="ISO Certified" />
              <h3>ISO 9001:2015 Certified</h3>
              <p>Recognized for maintaining international quality standards in education delivery.</p>
            </div>
            <div className="cert-card">
              <img src="/images/msmeLogo.jpg" alt="MSME Registered" />
              <h3>MSME Registered</h3>
              <p>Registered with the Ministry of Micro, Small & Medium Enterprises, Government of India.</p>
            </div>
            <div className="cert-card">
              <img src="/images/cert3.png" alt="NGO Darpan" />
              <h3>NGO Darpan</h3>
              <p>WMR EDUCATIONAL AND SOCIAL WELFARE TRUST</p>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
