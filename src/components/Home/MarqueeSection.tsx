// MarqueeSection.tsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import { cards } from './cardData';

import './MarqueeSection.css';

const MarqueeSection: React.FC = () => {
  return (
    <section className="marquee-section">
      <h2 className="marquee-title">Our top students</h2>
      <Marquee speed={50} gradient={false}>
      {cards.map((card, index) => (
  <div
    key={index}
    className={`marquee-card bg-light-${(index % 6) + 1}`}
  >
    <a href={card.link} className="card-link">
      <h3 className="card-title">{card.title}</h3>
      <p className="card-description">{card.description}</p>
    </a>
  </div>
))}

      </Marquee>
    </section>
  );
};

export default MarqueeSection;
