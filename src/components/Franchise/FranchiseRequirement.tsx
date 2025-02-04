import React from "react";
import "./styles/franchiseRequirement.css";

const FranchiseRequirement: React.FC = () => {
    return (
        <div className="main-container">
            <div className="requirement-container">
                <h2 className="requirement-heading">Franchise Requirements</h2>

                {/* Requirements Table */}
                <div className="table-section">
                    <h3 className="table-heading">Infrastructure Requirements</h3>
                    <table className="requirement-table">
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>Requirements</th>
                                <th>Feature</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td>Computer System</td><td>P1 / Celeron / above - 4-6</td></tr>
                            <tr><td>2</td><td>Printer</td><td>Dot Matrix / Inkjet - 1</td></tr>
                            <tr><td>3</td><td>Scanner</td><td>Flat Bed - 1</td></tr>
                            <tr><td>4</td><td>Counselor Table</td><td>With reception area - 1</td></tr>
                            <tr><td>5</td><td>Director Cabin</td><td>Need based - 1</td></tr>
                            <tr><td>6</td><td>Computer Lab</td><td>Mind Room - 1</td></tr>
                            <tr><td>7</td><td>Theory Room</td><td>Mind Room - 1</td></tr>
                            <tr><td>8</td><td>Telephone/ Modem</td><td>With Internet connection - 1</td></tr>
                            <tr><td>9</td><td>Carpet Area</td><td>Minimum 200-400 Sq. Ft. - 1</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Staff Requirement Table */}
                <div className="table-section">
                    <h3 className="table-heading">Staff Requirements</h3>
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Faculty</td><td>2</td></tr>
                            <tr><td>Counselor</td><td>1</td></tr>
                            <tr><td>Peon</td><td>1</td></tr>
                        </tbody>
                    </table>
                </div>

                <p className="staff-note">
                    <strong>Staff:</strong> The centre head must submit the faculty profiles to FACT (H.O.) for approval before engaging them for course instruction at the authorized center.
                </p>

                {/* Who can take franchise? */}
                <h3 className="franchise-heading">Who Can Take a Franchise of <span className="fact">FACT?</span></h3>
                <ul className="franchise-list">
                    <li>✔ Anyone who is a resident of India.</li>
                    <li>✔ Anyone who has at least 4 computers.</li>
                    <li>✔ Passionate individuals eager to teach computer courses.</li>
                    <li>✔ Those who have a strong interest in social work.</li>
                    <li>✔ Entrepreneurs with accessible and suitable locations.</li>
                    <li>✔ Individuals determined to make a difference in IT education.</li>
                </ul>

                {/* FACT Description */}
                <div className="fact-description">
                    <p>
                        <strong>FACT</strong> is a leading institution dedicated to empowering job seekers, aspiring entrepreneurs, and those interested in the IT education sector.
                    </p>
                    <p>
                        With a streamlined admission process and easy franchise setup, <strong>FACT</strong> enables individuals to establish computer training centers in any village, city, or district across India and start earning from day one.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FranchiseRequirement;
