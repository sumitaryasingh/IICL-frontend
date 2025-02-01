import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";
import { Outlet } from "react-router-dom";
import "./styles/franchiseParent.css";
const Franchise: React.FC = () => {
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

    return (
        <div className="all-franchise-content">
            <Navbar />
            <div>
                <h1>{headingText}</h1>
                <Outlet /> {/* Renders child components dynamically */}
            </div>
            <Footer />
        </div>
    );
};

export default Franchise;
