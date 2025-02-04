import React from "react";
import Navbar from "../../common-components/Navbar";
import Hero from "./Hero";
import Footer from "../../common-components/Footer";
import StorySection from "./StorySection"; // ✅ Import StorySection properly
import StatsSection from "./StatsSection";
import Attract from "./Attract";
import EducationalPartners from "./EducationalPartners";
import MarqueeSection from "./MarqueeSection";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <StorySection />
      <StatsSection/>
      <Attract/>
      <EducationalPartners/>
      <MarqueeSection/>
      <Footer />
    </div>
  );
};

export default Home;
