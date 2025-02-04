// MarqueeSection.tsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import { cards } from './cardData';

const MarqueeSection: React.FC = () => {
  return (
    <section className="marquee-section">
      <h2 className="marquee-title">Our top students</h2>
      <Marquee speed={50} gradient={false}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`marquee-card marquee-card-${index + 1}`}
          >
            <a href={card.link} className="card-link">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="card-image"
              />
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
