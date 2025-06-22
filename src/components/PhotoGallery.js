import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { gsap } from 'gsap';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const intl = useIntl();
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentImageRef = useRef(null);

  const images = useMemo(() => [
  ], []);

  const goToNextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nextPage = (currentPage + 1) % images.length;
    
    gsap.to(currentImageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentPage(nextPage);
        gsap.set(currentImageRef.current, { opacity: 1 });
        setIsAnimating(false);
      }
    });
  };

  const goToPreviousPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const prevPage = currentPage === 0 ? images.length - 1 : currentPage - 1;
    
    gsap.to(currentImageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentPage(prevPage);
        gsap.set(currentImageRef.current, { opacity: 1 });
        setIsAnimating(false);
      }
    });
  };

  useEffect(() => {
    // Preload images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        <div className="image-container">
          <img
            ref={currentImageRef}
            src={images[currentPage]}
            alt={`${intl.formatMessage({ id: 'gallery.image' })} ${currentPage + 1}`}
            className="gallery-image"
          />
        </div>
        
        <div className="gallery-controls">
          <button 
            onClick={goToPreviousPage} 
            className="nav-button prev-button"
            disabled={isAnimating}
          >
            {intl.formatMessage({ id: 'gallery.previous' })}
          </button>
          
          <div className="page-indicator">
            {intl.formatMessage({ id: 'gallery.page' })} {currentPage + 1} / {images.length}
          </div>
          
          <button 
            onClick={goToNextPage} 
            className="nav-button next-button"
            disabled={isAnimating}
          >
            {intl.formatMessage({ id: 'gallery.next' })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery; 