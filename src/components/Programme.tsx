import React, { useState } from 'react';
import programmeData from '../api/programmeData.json';
import './Programme.css';
import Footer from '../common-components/Footer';
import Navbar from './Navbar';

// Define TypeScript interface for programme data
interface Programme {
  id: string;
  title: string;
  duration: string;
  subjects: string[];
}

// Define props for ProgramItems component
interface ProgramItemsProps {
  curElem: Programme;
  showProgram: string | null; // Allow null for toggle functionality
  setShowProgram: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Programme() {
  const [showProgram, setShowProgram] = useState<string | null>(null); // Start with no open accordion

  return (
    <div>
    <Navbar />
    <div className='program-container'>
    <h1>Computer Courses List</h1>
      {programmeData.map((curElem: Programme) => (
        <ProgramItems 
          key={curElem.id} 
          curElem={curElem} 
          showProgram={showProgram} 
          setShowProgram={setShowProgram} 
        />
      ))}
    </div>
    <Footer />
    </div>
  );
}

const ProgramItems: React.FC<ProgramItemsProps> = ({ curElem, showProgram, setShowProgram }) => {
  // Function to toggle the accordion
  const handleToggle = () => {
    setShowProgram(prev => (prev === curElem.id ? null : curElem.id)); // Close if already open
  };

  return (
    <div className="programItems">
      <h3 onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {curElem.title}
      </h3>
      {showProgram === curElem.id && ( // Show only if clicked
        <div className="programDetails">
          <p>
            <strong>Duration:</strong> {curElem.duration}
          </p>
          <p>
            <strong>Subjects:</strong> {curElem.subjects.join(', ')}
          </p>
        </div>
      )}
    
    </div>
  );
};
