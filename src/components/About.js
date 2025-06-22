import React from 'react';
import { useIntl } from 'react-intl';

const About = () => {
  const intl = useIntl();

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-title">{intl.formatMessage({ id: 'about.title' })}</h2>
          <p className="about-description">{intl.formatMessage({ id: 'about.description' })}</p>
          <div className="about-skills">
            <h3>{intl.formatMessage({ id: 'about.skills.title' })}</h3>
            <ul>
              <li>{intl.formatMessage({ id: 'about.skills.skill1' })}</li>
              <li>{intl.formatMessage({ id: 'about.skills.skill2' })}</li>
              <li>{intl.formatMessage({ id: 'about.skills.skill3' })}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 