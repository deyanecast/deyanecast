import React from 'react';
import '../style.css';

const Experience = () => {
  return (
    <div className="experience">
      <h1 className="experience-title">My experience</h1>
      <p className="experience-description">For the past three years, I have been studying technology on my own, taking advantage of online courses and other tools available on the internet. Through this experience, I have developed skills in both backend and frontend development, and have had the opportunity to lead a small team and serve as a Scrum Master.However, my interest in technology and science goes beyond what I have learned so far. My goal is to continue to grow in these fields, and I'm excited to explore new areas and learn new skills. I would like to participate in projects that allow me to apply my knowledge and learn from other experts in the field. Ultimately, I am committed to continuing to learn and grow in the exciting world of technology and science.</p>

      <div className="experience-item">
        <div className="job-info">
          <h2>Farasi</h2>
          <p>Developer</p>
          <p>Dec. 2020 — Feb. 2022</p>
        </div>
        <div className="job-info">
          <h2>Farasi</h2>
          <p>Scrum Master</p>
          <p>Mar. 2022 — May. 2022</p>
        </div>
        <div className="job-info">
          <h2>Seguros G&T</h2>
          <p>Software Engineer</p>
          <p>Jun. 2022 - present</p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
