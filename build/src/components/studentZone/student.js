import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../common-components/Footer";
import Navbar from "../../common-components/Navbar";
const Student = () => {
    const location = useLocation();
    // Extracting the path to determine the current section
    const path = location.pathname.split('/').pop(); // Get the last part of the URL
    let headingText = '';
    switch (path) {
        case 'form':
            headingText = 'Franchise Form';
            break;
        case 'network':
            headingText = 'Franchise Network';
            break;
        case 'login':
            headingText = 'Franchise Login';
            break;
    }
    return (_jsxs("div", { className: "all-franchise-content", children: [_jsx(Navbar, {}), _jsxs("div", { children: [_jsx("h1", { children: headingText }), _jsx(Outlet, {}), " "] }), _jsx(Footer, {})] }));
};
export default Student;
