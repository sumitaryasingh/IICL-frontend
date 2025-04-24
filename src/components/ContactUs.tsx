import React, { useState } from 'react';
import Navbar from '../common-components/Navbar';
import Footer from '../common-components/Footer';
import { submitContactForm } from '../services/contactForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.css';

const ContactUs: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        const missingFields: string[] = [];
        if (!name) missingFields.push('Name');
        if (!email) missingFields.push('Email');
        if (!phone) missingFields.push('Phone Number');
        if (!message) missingFields.push('Message');

        if (missingFields.length > 0) {
            toast.error(`Please fill in: ${missingFields[0]}`);
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        try {
            const formData = { name, email, phone, message };
            const response = await submitContactForm(formData);

            if (response.success) {
                toast.success(response.message || 'Message sent successfully!');
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                toast.error(response.message || 'Failed to send message!');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            toast.error('There was an error submitting the form.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="contact-us">
                <h1 className='contact-head'>Contact Us</h1>
                <div className="contact-content">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p><strong>Phone:</strong>  9199893742, 9229730501</p>
                        <p><strong>Email:</strong> iicleducationindia@gmail.com</p>
                        <p><strong>Address:</strong> Ram Rajya More, Siwan - 841226</p>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.4964597801822!2d84.35185077598413!3d26.213053689806774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992fbd7d22b20f7%3A0xfa518b98bbbed6ee!2sFact%20Computer%20Education!5e0!3m2!1sen!2sin!4v1738487488178!5m2!1sen!2sin"
                                width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className="message">
                        <h2>Send Us a Message</h2>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" className='contact-input' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className='contact-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" className='contact-input' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" className='contact-input' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="submit-btn" onClick={handleSubmit}>Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
