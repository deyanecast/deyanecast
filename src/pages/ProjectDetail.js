import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SnakeGame from '../components/SnakeGame';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { projectId } = useParams();

  const renderProject = () => {
    switch (projectId) {
      case 'snake-game':
        return <SnakeGame />;
      default:
        return (
          <div className="project-detail-content">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <Link to="/projects" className="back-to-projects">
              Back to Projects
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="project-detail-container">
      <div className="project-detail-header">
        <Link to="/projects" className="back-button">
          ← Back to Projects
        </Link>
      </div>
      {renderProject()}
    </div>
  );
};

export default ProjectDetail; 