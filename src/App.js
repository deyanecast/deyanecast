import React from 'react';
import About from './components/About';
import Projects from './components/Projects';
import Career from './components/Career';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './style.css';

const AboutCareer = () => (
  <>
    <About />
    <Career/>
  </>
);

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about-career" element={<AboutCareer />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/career" element={<Career />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
