import React from "react";
import "./styles/franchiseTestimonials.css";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        title: "Franchisee, New York",
        content: "Partnering with FACT was the best decision! Their support helped me grow my business effortlessly.",
    },
    {
        id: 2,
        name: "Jane Smith",
        title: "Franchisee, California",
        content: "Excellent training and business guidance. I was able to start earning from day one!",
    },
    {
        id: 3,
        name: "Raj Patel",
        title: "Franchisee, India",
        content: "FACT made the whole process easy, and their marketing support is top-notch!",
    },
    {
        id: 4,
        name: "Emma Wilson",
        title: "Franchisee, Canada",
        content: "Highly recommend FACT for anyone looking to start their own education business!",
    },
    {
        id: 5,
        name: "Jane Smith",
        title: "Franchisee, California",
        content: "Excellent training and business guidance. I was able to start earning from day one!",
    },
    {
        id: 6,
        name: "John Doe",
        title: "Franchisee, New York",
        content: "Partnering with FACT was the best decision! Their support helped me grow my business effortlessly.",
    },
    {
        id: 7,
        name: "Emma Wilson",
        title: "Franchisee, Canada",
        content: "Highly recommend FACT for anyone looking to start their own education business!",
    },
    {
        id: 8,
        name: "Raj Patel",
        title: "Franchisee, India",
        content: "FACT made the whole process easy, and their marketing support is top-notch!",
    },
];

const FranchiseTestimonials: React.FC = () => {
    return (
        <div className="testimonials-container">
            <h2 className="testimonials-heading">What Our Franchisees Say</h2>
            <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className={`testimonial-card card-${index % 4}`}>
                        <p className="testimonial-content">"{testimonial.content}"</p>
                        <h3 className="testimonial-name">{testimonial.name}</h3>
                        <p className="testimonial-title">{testimonial.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FranchiseTestimonials;
