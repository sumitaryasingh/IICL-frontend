import React from "react";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";

const FranchiseLogin: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Franchise Login</h2>
                <p>Login to access your franchise dashboard.</p>
            </div>
            <Footer />
        </div>
    );
};

export default FranchiseLogin;
