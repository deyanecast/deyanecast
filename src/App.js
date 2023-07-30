// App.js
import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Career from './components/Career';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';

// New component where home and projects are displayed together
const HomeAndProjectsAndFooter = () => (
  <div id="home">
    <Home />
    <Projects />
    <Experience />
    <Contact />
    <Footer />
  </div>
);

// New component where about and career are displayed together
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
            <Route path="/" element={<HomeAndProjectsAndFooter />} />
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
