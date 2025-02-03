import React from "react";
import Navbar from "../../common-components/Navbar";
import Hero from "./Hero";
import Footer from "../../common-components/Footer";
import StorySection from "./StorySection"; // ✅ Import StorySection properly
import StatsSection from "./StatsSection";
import Attract from "./Attract";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <StorySection />
      <StatsSection/>
      <Attract/>
      <Footer />
    </div>
  );
};

export default Home;
