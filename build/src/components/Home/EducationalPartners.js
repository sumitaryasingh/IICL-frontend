import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Home.css";
const partners = [
    {
        name: "ISO Certified 9001:2015",
        logo: "../images/isoLogo1.jpg",
        url: "#"
    },
    {
        name: "IAF Certified",
        logo: "../images/iafLogo.svg",
        url: "#"
    },
    {
        name: "MSME Certified",
        logo: "../images/msmeLogo.jpg",
        url: "#"
    },
    {
        name: "NITI Ayog Certified",
        logo: "../images/nitiLogo.jpg",
        url: "#"
    },
    {
        name: "QRO Certified",
        logo: "../images/qroLogo.png",
        url: "#"
    }
    // {
    //   name: "Yale University",
    //   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/225px-Yale_University_Shield_1.svg.png",
    //   url: "https://www.yale.edu/"
    // },
    // {
    //   name: "Princeton University",
    //   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/210px-Princeton_seal.svg.png",
    //   url: "https://www.princeton.edu/"
    // },
    // {
    //   name: "Columbia University",
    //   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Columbia_coat_of_arms_no_crest.svg/270px-Columbia_coat_of_arms_no_crest.svg.png",
    //   url: "https://www.columbia.edu/"
    // }
];
const EducationalPartners = () => {
    return (_jsxs("section", { className: "partners-section", children: [_jsx("h2", { className: "partners-title", children: "Our Tieups and Achievements" }), _jsx("div", { className: "partners-container", children: _jsx("div", { className: "partners-marquee", children: partners.map((partner) => (_jsx("a", { href: partner.url, target: "_blank", rel: "noopener noreferrer", className: "partner-logo", title: partner.name, children: _jsx("img", { src: partner.logo, alt: partner.name }) }, partner.name))) }) })] }));
};
export default EducationalPartners;
