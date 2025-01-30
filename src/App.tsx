// /src/App.tsx
import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import Footer from './common-components/Footer';
import Programme from './components/Programme';


const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <p>Backend Message: {message || 'Loading...'}</p>
      <Footer />
    </div>
  );
}

export default App;
