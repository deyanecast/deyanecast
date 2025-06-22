import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './FloatingNavbar.css';

const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsVisible(true);
      } else if (location.pathname === '/about') {
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
        setIsVisible(isAtBottom);
      } else {
        const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
        setIsVisible(isNearBottom);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="floating-navbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="floating-nav-list">
            <li>
              <Link to="/" className="nav-link home-link">
                <img 
                  src="https://utfs.io/f/FW3ifDeLBap6o1XXfFlVhBLlipgCSf7e0PIO28ERwkXnFxjQ" 
                  alt="Home" 
                  className="nav-icon"
                />
              </Link>
            </li>
            <li className="nav-separator">/</li>
            <li>
              <Link to="/about" className="nav-link">
                ABOUT
              </Link>
            </li>
            <li className="nav-separator">/</li>
            <li>
              <Link to="/contact" className="nav-link">
                CONTACT
              </Link>
            </li>
            <li className="nav-separator">/</li>
            <li>
              <Link to="/projects" className="nav-link">
                PROJECTS
              </Link>
            </li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavbar; 