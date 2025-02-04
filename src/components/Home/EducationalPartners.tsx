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
    name: "Harvard University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/225px-Harvard_University_coat_of_arms.svg.png",
    url: "https://www.harvard.edu/"
  },
  {
    name: "MIT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/225px-MIT_logo.svg.png",
    url: "https://www.mit.edu/"
  },
  {
    name: "Stanford University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/225px-Seal_of_Leland_Stanford_Junior_University.svg.png",
    url: "https://www.stanford.edu/"
  },
  {
    name: "Oxford University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/University_of_Oxford.svg/375px-University_of_Oxford.svg.png",
    url: "https://www.ox.ac.uk/"
  },
  {
    name: "Cambridge University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/225px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png",
    url: "https://www.cam.ac.uk/"
  },
  {
    name: "Yale University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/225px-Yale_University_Shield_1.svg.png",
    url: "https://www.yale.edu/"
  },
  {
    name: "Princeton University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/210px-Princeton_seal.svg.png",
    url: "https://www.princeton.edu/"
  },
  {
    name: "Columbia University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Columbia_coat_of_arms_no_crest.svg/270px-Columbia_coat_of_arms_no_crest.svg.png",
    url: "https://www.columbia.edu/"
  }
];



const EducationalPartners: React.FC = () => {
  return (
    <section className="partners-section">
      <h2 className="partners-title">Our Educational Partners</h2>
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
