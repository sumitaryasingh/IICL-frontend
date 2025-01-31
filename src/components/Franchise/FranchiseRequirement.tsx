import React from "react";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";

const FranchiseRequirement: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Franchise Requirement</h2>
                <p>Check the requirements for owning a franchise.</p>
            </div>
            <Footer />
        </div>
    );
};

export default FranchiseRequirement;
