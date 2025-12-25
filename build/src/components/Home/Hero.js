import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
const Hero = ({ scrollToStory }) => {
    const navigate = useNavigate();
    const handleClickEnquire = () => {
        navigate("/franchise/form");
    };
    return (_jsxs("section", { className: "hero-container", children: [_jsx("div", { className: "overlays" }), _jsxs("div", { className: "hero-content", children: [_jsxs("h1", { className: "hero-heading", children: [_jsx("span", { children: "\"Unlock Your Potential with " }), _jsx("span", { className: "highlight", children: "Indian Institute of Computer Literacy" }), "\""] }), _jsxs("p", { className: "hero-description", children: ["\"At ", _jsx("span", { className: "highligh", children: "Indian Institute of Computer Literacy" }), ", we provide cutting-edge computer education to help you build a successful career in technology...\""] }), _jsxs("div", { className: "hero-buttons", children: [_jsx("button", { onClick: scrollToStory, className: "explore-button", children: "Explore Now" }), _jsx("button", { onClick: handleClickEnquire, className: "enroll-button", children: "Enquire Now" })] })] })] }));
};
export default Hero;
