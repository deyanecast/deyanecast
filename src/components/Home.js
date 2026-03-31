import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Welcome';
  const contentRef = useRef(null);

  // Set initial hidden state before first paint
  useLayoutEffect(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 20, scale: 0.97 });
  }, []);

  // Entrance animation (runs once)
  useEffect(() => {
    const el = contentRef.current;
    gsap.killTweensOf(el);
    const lines = el.querySelectorAll('.info-line');
    gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo(
      lines,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  // Typewriter effect
  useEffect(() => {
    let intervalId;
    let timeoutId;

    const typeText = () => {
      let idx = 0;
      intervalId = setInterval(() => {
        if (idx <= fullText.length) {
          setDisplayText(fullText.slice(0, idx));
          idx++;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            setDisplayText('');
            typeText();
          }, 3000);
        }
      }, 150);
    };

    typeText();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [fullText]);

  return (
    <div className="home-container">
      <div className="quadrant-content" ref={contentRef}>
        <div className="info-block">
          <div className="info-line">
            {displayText}<span className="cursor">|</span>
          </div>
          <div className="info-line">2021 – present</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
