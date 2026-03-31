import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 24 });
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    gsap.killTweensOf(el);
    gsap.to(el, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo(
      el.querySelectorAll('.about-title, .about-description, .about-skills h3, .about-skills li'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.45 }
    );
  }, []);

  return (
    <div className="about-container">
      <div className="about-content" ref={contentRef}>
        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <p className="about-description">
            I am a full stack developer experienced in modern technologies and agile methodologies.
            I specialize in building scalable and high-performance web applications.
          </p>
          <div className="about-skills">
            <h3>Skills</h3>
            <ul>
              <li>React, Node.js, TypeScript</li>
              <li>SQL and NoSQL Databases</li>
              <li>Responsive Design and UX/UI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
