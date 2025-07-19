import React from 'react';
import { useIntl } from 'react-intl';
import { useTheme } from '../context/ThemeContext';
import './Projects.css';

const Projects = () => {
  const intl = useIntl();
  const { theme } = useTheme();

  // Estilos inline para prueba
  const containerStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: theme === 'dark' ? '#121212' : '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '48px',
    color: theme === 'dark' ? '#f5f5f5' : '#333333',
    textAlign: 'center',
    width: '100%'
  };

  const cardStyle = {
    border: `1px solid ${theme === 'dark' ? '#757575' : '#666666'}`,
    padding: '32px',
    background: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
    width: '320px',
    boxSizing: 'border-box',
    color: theme === 'dark' ? '#f5f5f5' : '#333333',
    transition: 'all 0.3s ease',
    borderRadius: '8px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>My Projects</h1>
      <div className="projects-grid">
        <div style={cardStyle}>
          <h2 style={{color: theme === 'dark' ? '#f5f5f5' : '#333333', marginBottom: '16px', fontSize: '1.5rem', fontWeight: '600'}}>
            {intl.formatMessage({ id: 'projects.project1.title' })}
          </h2>
          <p style={{color: theme === 'dark' ? '#bdbdbd' : '#666666', lineHeight: '1.6'}}>
            {intl.formatMessage({ id: 'projects.project1.description' })}
          </p>
        </div>
        <div style={cardStyle}>
          <h2 style={{color: theme === 'dark' ? '#f5f5f5' : '#333333', marginBottom: '16px', fontSize: '1.5rem', fontWeight: '600'}}>
            {intl.formatMessage({ id: 'projects.project2.title' })}
          </h2>
          <p style={{color: theme === 'dark' ? '#bdbdbd' : '#666666', lineHeight: '1.6'}}>
            {intl.formatMessage({ id: 'projects.project2.description' })}
          </p>
        </div>
        <div style={cardStyle} className="gallery-link">
            <h2 style={{color: theme === 'dark' ? '#f5f5f5' : '#333333', marginBottom: '16px', fontSize: '1.5rem', fontWeight: '600'}}>
              {intl.formatMessage({ id: 'projects.gallery.title' })}
            </h2>
            <p style={{color: theme === 'dark' ? '#bdbdbd' : '#666666', lineHeight: '1.6'}}>
              {intl.formatMessage({ id: 'projects.gallery.description' })}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Projects; 