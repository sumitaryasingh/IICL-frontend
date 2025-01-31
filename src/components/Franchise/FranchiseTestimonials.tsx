import React from "react";
import Navbar from "../../common-components/Navbar";
import Footer from "../../common-components/Footer";

const FranchiseTestimonials: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <h2>Franchise Testimonials</h2>
                <p>Read success stories from our franchise partners.</p>
            </div>
            <Footer />
        </div>
    );
};

export default FranchiseTestimonials;
