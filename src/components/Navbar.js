import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LanguageContext } from '../context/LanguageContext';
import '../style.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, switchLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <img 
          src="https://utfs.io/f/FW3ifDeLBap6o1XXfFlVhBLlipgCSf7e0PIO28ERwkXnFxjQ" 
          alt="Jellyfish Logo" 
          className="navbar-icon" 
        />
      </Link>
      
      <nav className={isMenuOpen ? 'open' : ''}>
        <Link to="/about" onClick={closeMenu}>
          <FormattedMessage id="nav.about" />
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          <FormattedMessage id="nav.contact" />
        </Link>
        <Link to="/projects" onClick={closeMenu}>
          <FormattedMessage id="nav.projects" />
        </Link>
      </nav>

      <button 
        className="menu-toggle" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
    </div>
  );
};

export default Navbar;
