import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import Navbar from "../../common-components/Navbar";
import Hero from "./Hero";
import Footer from "../../common-components/Footer";
import StorySection from "./StorySection";
import StatsSection from "./StatsSection";
import Attract from "./Attract";
import EducationalPartners from "./EducationalPartners";
import MarqueeSection from "./MarqueeSection";
import DocumentGallery from "./DocumentGallery";
const Home = () => {
    const storyRef = useRef(null);
    return (_jsxs("div", { className: "home", children: [_jsx(Navbar, {}), _jsx(Hero, { scrollToStory: () => storyRef.current?.scrollIntoView({ behavior: 'smooth' }) }), _jsx("div", { ref: storyRef, children: _jsx(StorySection, {}) }), _jsx(StatsSection, {}), _jsx(DocumentGallery, {}), _jsx(Attract, {}), _jsx(EducationalPartners, {}), _jsx(MarqueeSection, {}), _jsx(Footer, {})] }));
};
export default Home;
