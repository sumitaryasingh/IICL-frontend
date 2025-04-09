import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Home.css"; // Import CSS
const WelcomeSection = () => {
    return (_jsx("section", { className: "welcome-section", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "content", children: [_jsxs("h2", { children: [_jsx("span", { className: "highlight", children: "Welcome To" }), " ", _jsx("b", { children: "IICL Education" })] }), _jsx("div", { className: "underline" }), _jsx("p", { children: "IICL Educational and Technologies Foundation is one of the leading non-formal training providers, developing Skills and Talent through its efficacious learning programs and techniques, hence building a pool of coveted workforce according to global industry requirements." }), _jsx("p", { children: "IICL Educational and Technologies Foundation has effectively ventured into diverse training sectors ranging from IT hardware & software training..." }), _jsx("a", { href: "#", className: "btn", children: "About More" })] }), _jsx("div", { className: "image-container", children: _jsx("img", { src: "/images/image.png", alt: "Welcome Image" }) })] }) }));
};
export default WelcomeSection;
