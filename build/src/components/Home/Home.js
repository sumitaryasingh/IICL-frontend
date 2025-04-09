import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "../../common-components/Navbar";
import Hero from "./Hero";
import Footer from "../../common-components/Footer";
import StorySection from "./StorySection"; // ✅ Import StorySection properly
import StatsSection from "./StatsSection";
import Attract from "./Attract";
import EducationalPartners from "./EducationalPartners";
import MarqueeSection from "./MarqueeSection";
const Home = () => {
    return (_jsxs("div", { className: "home", children: [_jsx(Navbar, {}), _jsx(Hero, {}), _jsx(StorySection, {}), _jsx(StatsSection, {}), _jsx(Attract, {}), _jsx(EducationalPartners, {}), _jsx(MarqueeSection, {}), _jsx(Footer, {})] }));
};
export default Home;
