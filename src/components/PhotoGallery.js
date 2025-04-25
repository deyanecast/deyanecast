import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import gsap from 'gsap';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const pageRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const intl = useIntl();

  const photos = [
    {
      id: 1,
      image: 'https://i.postimg.cc/vT8kwx88/IMG-0022.jpg',
      titleId: "gallery.project1.title",
      descriptionId: "gallery.project1.description",
      date: '2024',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      titleId: "gallery.project2.title",
      descriptionId: "gallery.project2.description",
      date: '2024',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      titleId: "gallery.project3.title",
      descriptionId: "gallery.project3.description",
      date: '2024',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      titleId: "gallery.project4.title",
      descriptionId: "gallery.project4.description",
      date: '2024',
    }
  ];

  // Precargar imágenes
  useEffect(() => {
    photos.forEach((photo) => {
      const img = new Image();
      img.src = photo.image;
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [photo.id]: true
        }));
      };
    });
  }, []);

  const animateTransition = (direction) => {
    if (isAnimating) return;

    const nextPage = direction === 1 
      ? (currentPage + 1) % photos.length 
      : (currentPage - 1 + photos.length) % photos.length;

    if (!imagesLoaded[photos[nextPage].id]) {
      return;
    }

    setIsAnimating(true);

    const currentElement = pageRef.current;
    const clone = currentElement.cloneNode(true);
    currentElement.parentNode.appendChild(clone);

    gsap.set(clone, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0
    });

    gsap.to(currentElement, {
      duration: 0.4,
      opacity: 0,
      ease: "none"
    });

    gsap.to(clone, {
      duration: 0.4,
      opacity: 1,
      ease: "none",
      onComplete: () => {
        clone.remove();
        setCurrentPage(nextPage);
        setIsAnimating(false);
        gsap.set(currentElement, {
          clearProps: "all"
        });
      }
    });
  };

  const handlePageClick = (direction) => {
    if (!isAnimating) {
      const nextPage = direction === 1 
        ? (currentPage + 1) % photos.length 
        : (currentPage - 1 + photos.length) % photos.length;
      
      if (imagesLoaded[photos[nextPage].id]) {
        animateTransition(direction);
      }
    }
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentPage) return;
    if (imagesLoaded[photos[index].id]) {
      const direction = index > currentPage ? 1 : -1;
      animateTransition(direction);
    }
  };

  return (
    <div className="photo-gallery">
      <div className="gallery-container">
        <div className="page-turn-area left" onClick={() => handlePageClick(-1)} />
        <div className="page-turn-area right" onClick={() => handlePageClick(1)} />
        <div className="gallery-page" ref={pageRef}>
          <div className="photo-container">
            <img
              src={photos[currentPage].image}
              alt={intl.formatMessage({ id: photos[currentPage].titleId })}
              className="gallery-photo"
            />
          </div>
          <div className="photo-info">
            <h3><FormattedMessage id={photos[currentPage].titleId} /></h3>
            <p className="date">{photos[currentPage].date}</p>
            <p className="description">
              <FormattedMessage id={photos[currentPage].descriptionId} />
            </p>
          </div>
        </div>
      </div>
      <div className="page-indicator">
        {photos.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentPage ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery; 