import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../style.css';
import Footer from './Footer';

const Career = () => {
  return (
    <>
      <div id="career" className="career-container">
        <div className="career-text-container">
          <h1><FormattedMessage id="career.title" /></h1>
          <p><FormattedMessage id="career.description" /></p>
        </div>
        <div className="career-list-container">
          <ul className="list-container">
            <h2><FormattedMessage id="career.backend" /></h2>
            <li>SQL</li>
            <li>PHP</li>
            <li>XAMPP</li>
            <li>JavaSE</li>
            <li>Apache Kafka</li>
            <li>Spring Boot</li>
            <li>Docker</li>
            <li>Postman</li>
            <li>Git & Gitlab</li>
            <li>JasperSkills</li>
            <li>REST APIs</li>
            <li>Microservices</li>
          </ul>
          <ul className="list-container">
            <h2><FormattedMessage id="career.frontend" /></h2>
            <li>JavaScript</li>
            <li>Bootstrap</li>
            <li>TypeScript</li>
            <li>AngularJS</li>
            <li>AmazonWebService (AWS)</li>
            <li>Notion</li>
            <li>Slack</li>
            <li>Jira</li>
            <li>Microsoft Excel</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Career;
