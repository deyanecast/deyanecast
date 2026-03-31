import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentImageRef = useRef(null);

  const images = useMemo(() => [
  ], []);

  const hasImages = images.length > 0;

  const goToNextPage = () => {
    if (!hasImages || isAnimating) return;
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
    if (!hasImages || isAnimating) return;
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
    if (!hasImages) return;
    // Preload images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images, hasImages]);

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        <div className="image-container">
          {hasImages ? (
            <img
              ref={currentImageRef}
              src={images[currentPage]}
              alt={`Slide ${currentPage + 1}`}
              className="gallery-image"
            />
          ) : (
            <div className="gallery-empty-state">
              Images coming soon.
            </div>
          )}
        </div>
        
        <div className="gallery-controls">
          <button 
            onClick={goToPreviousPage} 
            className="nav-button prev-button"
            disabled={isAnimating || !hasImages}
          >
            Previous
          </button>
          
          <div className="page-indicator">
            {hasImages ? `Page ${currentPage + 1} / ${images.length}` : 'No images yet'}
          </div>
          
          <button 
            onClick={goToNextPage} 
            className="nav-button next-button"
            disabled={isAnimating || !hasImages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery; 