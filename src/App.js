import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider, LanguageContext } from './context/LanguageContext';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Gallery from './pages/Gallery';
import FloatingNavbar from './components/FloatingNavbar';
import './style.css';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

const LanguageButton = () => {
  const { locale, switchLanguage } = React.useContext(LanguageContext);
  
  const handleClick = () => {
    console.log('Language button clicked! Current locale:', locale);
    switchLanguage();
  };

  return (
    <button 
      onClick={handleClick} 
      className="language-toggle"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
};

const AppContent = () => {
  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <FloatingNavbar />
      <ThemeToggle />
      <LanguageButton />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
