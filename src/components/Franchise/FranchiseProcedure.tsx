import React from "react";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";

const FranchiseProcedure: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Franchise Procedure</h2>
                <p>Learn about the step-by-step process of acquiring a franchise.</p>
            </div>
            <Footer />
        </div>
    );
};

export default FranchiseProcedure;
