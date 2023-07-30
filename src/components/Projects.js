// Projects.js
import React from 'react';
import '../style.css';

const Projects = () => {
  return (
    <div className="projects-container"> 
      <div className="frame-container">
        <iframe src="https://fectumpage2.vercel.app/" title="Proyecto 1" className="project-frame"></iframe>
        <iframe src="https://reactjs-nine-kohl.vercel.app/" title="Proyecto 2" className="project-frame"></iframe>
      </div>
    </div>
  );
};

export default Projects;
