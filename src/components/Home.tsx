// /src/components/Home.tsx
import React from 'react';
import Navbar from '../common-components/Navbar';
import Hero from './Hero';
import Footer from '../common-components/Footer';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Navbar />
            <Hero />
            <Footer />
        </div>
    );
};

export default Home;
