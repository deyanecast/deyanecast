import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider, LanguageContext } from './context/LanguageContext';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Gallery from './pages/Gallery';
import FloatingNavbar from './components/FloatingNavbar';
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
        <LanguageButton />
        <Analytics debug={true} />
      </div>
    </LanguageProvider>
  );
};

export default App;
