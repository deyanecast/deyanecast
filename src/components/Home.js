import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const roles = ['Full Stack Developer', 'Problem Solver', 'UI Enthusiast'];

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 20, scale: 0.97 });
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    gsap.killTweensOf(el);
    gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo(
      el.querySelectorAll('.home-name, .home-role-line, .home-tagline, .home-cta'),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.13, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    let intervalId;
    let timeoutId;
    let roleIdx = 0;

    const typeRole = () => {
      const text = roles[roleIdx];
      let charIdx = 0;
      intervalId = setInterval(() => {
        if (charIdx <= text.length) {
          setDisplayText(text.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            roleIdx = (roleIdx + 1) % roles.length;
            setDisplayText('');
            typeRole();
          }, 2400);
        }
      }, 110);
    };

    typeRole();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="quadrant-content" ref={contentRef}>
        <span className="home-greeting">Hey, I&rsquo;m</span>
        <h1 className="home-name">DeyaneCast</h1>
        <div className="home-role-line">
          <span className="home-role-text">{displayText}</span>
          <span className="cursor">|</span>
        </div>
        <p className="home-tagline">
          I build fast, clean web experiences that people actually enjoy using.
        </p>
      </div>
    </div>
  );
};

export default Home;
