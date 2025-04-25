import React from 'react';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import PhotoGallery from '../components/PhotoGallery';
import { Link } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  return (
    <motion.div
      className="gallery-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="gallery-header">
        <Link to="/projects" className="back-link">
          <motion.span
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            ← <FormattedMessage id="gallery.backToProjects" />
          </motion.span>
        </Link>
        <h1 className="gallery-title">
          <FormattedMessage id="gallery.title" />
        </h1>
      </div>
      
      <PhotoGallery />
    </motion.div>
  );
};

export default Gallery; 