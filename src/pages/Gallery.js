import React from 'react';
import { useIntl } from 'react-intl';
import PhotoGallery from '../components/PhotoGallery';

const Gallery = () => {
  const intl = useIntl();

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <span className="gallery-section">GALERÍA</span>
        <h1 className="gallery-title">{intl.formatMessage({ id: 'gallery.title' })}</h1>
        <p className="gallery-subtitle">{intl.formatMessage({ id: 'gallery.subtitle' })}</p>
      </div>
      <PhotoGallery />
    </div>
  );
};

export default Gallery; 