// /src/App.tsx
import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  console.log("hello")
  return (
    
    <div className="App">
      <Navbar />
      <Hero /> 
    </div>)
}

export default App;
