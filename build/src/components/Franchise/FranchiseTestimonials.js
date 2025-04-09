import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./styles/franchiseTestimonials.css";
const testimonials = [
    {
        id: 1,
        name: "John Doe",
        title: "Franchisee, New York",
        content: "Partnering with IICL was the best decision! Their support helped me grow my business effortlessly.",
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
        content: "IICL made the whole process easy, and their marketing support is top-notch!",
    },
    {
        id: 4,
        name: "Emma Wilson",
        title: "Franchisee, Canada",
        content: "Highly recommend IICL for anyone looking to start their own education business!",
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
        content: "Partnering with IICL was the best decision! Their support helped me grow my business effortlessly.",
    },
    {
        id: 7,
        name: "Emma Wilson",
        title: "Franchisee, Canada",
        content: "Highly recommend IICL for anyone looking to start their own education business!",
    },
    {
        id: 8,
        name: "Raj Patel",
        title: "Franchisee, India",
        content: "IICL made the whole process easy, and their marketing support is top-notch!",
    },
];
const FranchiseTestimonials = () => {
    return (_jsxs("div", { className: "testimonials-container", children: [_jsx("h2", { className: "testimonials-heading", children: "What Our Franchisees Say" }), _jsx("div", { className: "testimonials-grid", children: testimonials.map((testimonial, index) => (_jsxs("div", { className: `testimonial-card card-${index % 4}`, children: [_jsxs("p", { className: "testimonial-content", children: ["\"", testimonial.content, "\""] }), _jsx("h3", { className: "testimonial-name", children: testimonial.name }), _jsx("p", { className: "testimonial-title", children: testimonial.title })] }, testimonial.id))) })] }));
};
export default FranchiseTestimonials;
