import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Marquee from 'react-fast-marquee';
import { cards } from './cardData';
const MarqueeSection = () => {
    return (_jsxs("section", { className: "marquee-section", children: [_jsx("h2", { className: "marquee-title", children: "Our top students" }), _jsx(Marquee, { speed: 50, gradient: false, children: cards.map((card, index) => (_jsx("div", { className: `marquee-card marquee-card-${index + 1}`, children: _jsxs("a", { href: card.link, className: "card-link", children: [_jsx("img", { src: card.imageUrl, alt: card.title, className: "card-image" }), _jsx("h3", { className: "card-title", children: card.title }), _jsx("p", { className: "card-description", children: card.description })] }) }, index))) })] }));
};
export default MarqueeSection;
