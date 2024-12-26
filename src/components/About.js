import React from 'react';
import { FormattedMessage } from 'react-intl';

const About = () => {
  const scrollToTech = () => {
    document.querySelector('.tech-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1 className="about-title">
            <FormattedMessage id="about.title" />
          </h1>
          <h2 className="about-subtitle">
            <FormattedMessage id="about.subtitle" />
          </h2>
          <p className="about-description">
            <FormattedMessage id="about.description" />
          </p>
        </div>
        <div className="scroll-indicator" onClick={scrollToTech}>
          ↓
        </div>
      </div>
      
      <div className="tech-section">
        <h3 className="tech-title">
          <FormattedMessage id="about.techTitle" />
        </h3>
        <div className="tech-grid">
          <div className="tech-category">
            <h4>Frontend</h4>
            <div className="tech-items">
              <span>React</span>
              <span>JavaScript</span>
              <span>TypeScript</span>
              <span>HTML5</span>
              <span>CSS3</span>
            </div>
          </div>
          <div className="tech-category">
            <h4>Backend</h4>
            <div className="tech-items">
              <span>Node.js</span>
              <span>Express</span>
              <span>Python</span>
              <span>Java</span>
            </div>
          </div>
          <div className="tech-category">
            <h4>Database</h4>
            <div className="tech-items">
              <span>MongoDB</span>
              <span>PostgreSQL</span>
              <span>MySQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
