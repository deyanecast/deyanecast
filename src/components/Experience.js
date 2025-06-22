import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../style.css';

const Experience = () => {
  return (
    <div className="experience">
      <h1 className="experience-title"><FormattedMessage id="experience.title" /></h1>
      <p className="experience-description"><FormattedMessage id="experience.description" /></p>

      <div className="experience-item">
        <div className="job-info">
          <h2><FormattedMessage id="experience.farasi" /></h2>
          <p><FormattedMessage id="experience.developer" /></p>
          <p><FormattedMessage id="experience.dec2020Feb2022" /></p>
        </div>
        <div className="job-info">
          <h2><FormattedMessage id="experience.farasi" /></h2>
          <p><FormattedMessage id="experience.scrumMaster" /></p>
          <p><FormattedMessage id="experience.mar2022May2022" /></p>
        </div>
        <div className="job-info">
          <h2><FormattedMessage id="experience.segurosGT" /></h2>
          <p><FormattedMessage id="experience.softwareEngineer" /></p>
          <p><FormattedMessage id="experience.jun2022Present" /></p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
