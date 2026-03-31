import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Gallery from './pages/Gallery';
import ProjectDetail from './pages/ProjectDetail';
import FloatingNavbar from './components/FloatingNavbar';
import ThemeToggle from './components/ThemeToggle';
import PageTransition from './components/PageTransition';
import './style.css';

const AppContent = () => {
  const location = useLocation();
  const isProjectDetailRoute = location.pathname.startsWith('/projects/');

  return (
    <div className="App">
      <PageTransition>
        <div className={`content ${isProjectDetailRoute ? 'content--full-bleed' : ''}`.trim()}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
        </div>
      </PageTransition>
      <FloatingNavbar />
      <ThemeToggle />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
