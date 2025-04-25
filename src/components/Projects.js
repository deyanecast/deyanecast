// Projects.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-container">
      <h2 className="gradient-text">
        <FormattedMessage id="projects.title" />
      </h2>
      
      <Link to="/gallery" className="gallery-link">
        <motion.div
          className="coming-soon-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="pulse-animation"></div>
          <div className="tech-stack">
            <span>MY STORIES IN PICTURES</span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default Projects;
