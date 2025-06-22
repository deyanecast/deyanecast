import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const intl = useIntl();

  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      <div className="projects-grid">
        <div className="project-card">
          <h2>{intl.formatMessage({ id: 'projects.project1.title' })}</h2>
          <p>{intl.formatMessage({ id: 'projects.project1.description' })}</p>
        </div>
        <div className="project-card">
          <h2>{intl.formatMessage({ id: 'projects.project2.title' })}</h2>
          <p>{intl.formatMessage({ id: 'projects.project2.description' })}</p>
        </div>
        <div className="project-card gallery-link">
            <h2>{intl.formatMessage({ id: 'projects.gallery.title' })}</h2>
            <p>{intl.formatMessage({ id: 'projects.gallery.description' })}</p>
        </div>
      </div>
    </div>
  );
};

export default Projects; 