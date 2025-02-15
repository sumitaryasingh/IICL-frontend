import React from "react";
import "./Home.css";
import { FaUniversity } from 'react-icons/fa';


interface Partner {
  name: string;
  logo: string;
  url: string;
}

const partners: Partner[] = [
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



const EducationalPartners: React.FC = () => {
  return (
    <section className="partners-section">
      <h2 className="partners-title">Our Tieups and Achievements</h2>
      <div className="partners-container">
        <div className="partners-marquee">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-logo"
              title={partner.name}
            >
              <img src={partner.logo} alt={partner.name} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationalPartners;
