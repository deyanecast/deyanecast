import React, { useState, useEffect } from 'react';
import '../style.css';

const Home = () => {
  const [visitCount, setVisitCount] = useState(() => {
    // Recuperar el contador de la sesión o iniciar con un número base
    const savedCount = sessionStorage.getItem('visitCount');
    if (savedCount) return parseInt(savedCount);
    // Si no existe, crear un número entre 250-300
    const baseCount = Math.floor(Math.random() * 50) + 250;
    sessionStorage.setItem('visitCount', baseCount.toString());
    return baseCount;
  });

  return (
    <div className="home-container">
      <div className="quadrant-content">
        <div className="info-block">
          <div className="info-line">GUA</div>
          <div className="info-line">2021 - 2025</div>
        </div>
        <div className="info-block">
          <div className="info-line">CREATIVE DEVELOPER</div>
          <div className="info-line">/{visitCount.toString().padStart(4, '0')}</div>
        </div>
      </div>
    </div>
  );
};

export default Home; 