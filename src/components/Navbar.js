import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    document.body.style.paddingTop = isMenuOpen ? '200px' : '60px';
  }, [isMenuOpen]);

  if (!isMounted) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <Link to="/About" className="navbar-logo">
        <img src="https://utfs.io/f/FW3ifDeLBap6o1XXfFlVhBLlipgCSf7e0PIO28ERwkXnFxjQ" alt="Jellyfish Logo" className="navbar-icon" />
      </Link>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={isMenuOpen ? 'open' : ''}>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
      </nav>
    </div>
  );
}

export default Navbar;
