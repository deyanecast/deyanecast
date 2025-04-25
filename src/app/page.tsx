'use client';

import { useState, useEffect } from 'react';
import './home.css';

export default function Home() {
  const [visitCount, setVisitCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCount = sessionStorage.getItem('visitCount');
      if (savedCount) return parseInt(savedCount);
      const baseCount = Math.floor(Math.random() * 50) + 250;
      sessionStorage.setItem('visitCount', baseCount.toString());
      return baseCount;
    }
    return 250;
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
} 