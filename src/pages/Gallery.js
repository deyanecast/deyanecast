import React from 'react';
import PhotoGallery from '../components/PhotoGallery';

const Gallery = () => {
  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1 className="gallery-title">Photo Gallery</h1>
        <p className="gallery-subtitle">A collection of my favorite visual works</p>
      </div>
      <PhotoGallery />
    </div>
  );
};

export default Gallery; 