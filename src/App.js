import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, LanguageContext } from './context/LanguageContext';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import './style.css';

const LanguageButton = () => {
  const { locale, switchLanguage } = React.useContext(LanguageContext);
  return (
    <button onClick={switchLanguage} className="language-toggle">
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <LanguageButton />
        <Analytics debug={true} />
      </div>
    </LanguageProvider>
  );
};

export default App;
