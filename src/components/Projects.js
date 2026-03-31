import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './Projects.css';

const Projects = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    gsap.set(el.querySelector('.projects-title'), { opacity: 0, y: 18 });
    gsap.set(el.querySelectorAll('.project-card'), { opacity: 0, y: 28 });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    gsap.to(el.querySelector('.projects-title'), {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3,
    });
    gsap.to(el.querySelectorAll('.project-card'), {
      opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out', delay: 0.45,
    });
  }, []);

  return (
    <div className="projects-container" ref={containerRef}>
      <h1 className="projects-title">Projects</h1>
      <div className="projects-grid">
        <Link to="/projects/snake-game" className="project-card">
          <h2>Snake Game</h2>
          <p>Classic Snake: arrow keys to move, eat food to grow.</p>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
