import React from 'react';
import Navbar from '../common-components/Navbar';
import Footer from '../common-components/Footer';
import './AboutUs.css';

const AboutUs: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="about-us">
                <div className="about-content">
                    <h1 className='about-head'>About Us</h1>
                    <p>
                        We are a leading provider of education services, empowering individuals with knowledge
                        and skills for a brighter future. Our institute is dedicated to offering high-quality
                        training in computer science, programming, and other technical fields to help students
                        achieve their career goals.
                    </p>
                    <div className="info-sections">
                        <div className="info-box">
                            <h2>Our Mission</h2>
                            <p>
                                Our mission is to bridge the gap between education and industry by providing
                                real-world skills that help students thrive in their careers.
                            </p>
                        </div>
                        <div className="info-box">
                            <h2>Why Choose Us?</h2>
                            <p>
                                - Expert faculty with industry experience.<br />
                                - Hands-on training with practical projects.<br />
                                - Career guidance and placement support.
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
