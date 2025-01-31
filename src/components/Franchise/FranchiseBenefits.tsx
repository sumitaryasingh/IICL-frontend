import React from "react";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";

const FranchiseBenefits: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Franchise Benefits</h2>
                <p>Discover the benefits of partnering with us.</p>
            </div>
            <Footer />
        </div>
    );
};

export default FranchiseBenefits;
