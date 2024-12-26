// Projects.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-container">
      <h2 className="gradient-text">
        <FormattedMessage id="projects.title" />
      </h2>
      <div className="coming-soon-card">
        <div className="pulse-animation"></div>
        <h3><FormattedMessage id="projects.comingSoon" /></h3>
        <p><FormattedMessage id="projects.description" /></p>
        <div className="tech-stack">
          <p><FormattedMessage id="projects.tech" /></p>
          <span>React</span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>TypeScript</span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
