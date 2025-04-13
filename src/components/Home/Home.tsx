import React, { useRef } from "react";
import Navbar from "../../common-components/Navbar";
import Hero from "./Hero";
import Footer from "../../common-components/Footer";
import StorySection from "./StorySection";
import StatsSection from "./StatsSection";
import Attract from "./Attract";
import EducationalPartners from "./EducationalPartners";
import MarqueeSection from "./MarqueeSection";

const Home: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="home">
      <Navbar />
      <Hero scrollToStory={() => storyRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div ref={storyRef}>
        <StorySection />
      </div>
      <StatsSection />
      <Attract />
      <EducationalPartners />
      <MarqueeSection />
      <Footer />
    </div>
  );
};

export default Home;
