import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Navbar from '../common-components/Navbar';
import Footer from '../common-components/Footer';
import './AboutUs.css';
const AboutUs = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("div", { className: "about-us", children: _jsxs("div", { className: "about-content", children: [_jsx("h1", { className: 'about-head', children: "About Us" }), _jsx("p", { children: "We are a leading provider of education services, empowering individuals with knowledge and skills for a brighter future. Our institute is dedicated to offering high-quality training in computer science, programming, and other technical fields to help students achieve their career goals." }), _jsxs("div", { className: "info-sections", children: [_jsxs("div", { className: "info-box", children: [_jsx("h2", { children: "Our Mission" }), _jsx("p", { children: "Our mission is to bridge the gap between education and industry by providing real-world skills that help students thrive in their careers." })] }), _jsxs("div", { className: "info-box", children: [_jsx("h2", { children: "Why Choose Us?" }), _jsxs("p", { children: ["- Expert faculty with industry experience.", _jsx("br", {}), "- Hands-on training with practical projects.", _jsx("br", {}), "- Career guidance and placement support."] })] })] })] }) }), _jsx(Footer, {})] }));
};
export default AboutUs;
