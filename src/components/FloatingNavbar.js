import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './FloatingNavbar.css';

const FloatingNavbar = () => {
  const location = useLocation();

  return (
    <nav className="floating-navbar">
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <FormattedMessage id="nav.home" defaultMessage="Home" />
        </Link>
        <Link 
          to="/about" 
          className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
        >
          <FormattedMessage id="nav.about" />
        </Link>
        <Link 
          to="/projects" 
          className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
        >
          <FormattedMessage id="nav.projects" />
        </Link>
        <Link 
          to="/contact" 
          className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
        >
          <FormattedMessage id="nav.contact" />
        </Link>
      </div>
    </nav>
  );
};

export default FloatingNavbar; 