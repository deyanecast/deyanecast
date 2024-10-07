import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="navbar">
      <Link to="/About" className="navbar-logo">
        <img src="https://utfs.io/f/FW3ifDeLBap6o1XXfFlVhBLlipgCSf7e0PIO28ERwkXnFxjQ" alt="Jellyfish Logo" className="navbar-icon" />
      </Link>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
}

export default Navbar;
