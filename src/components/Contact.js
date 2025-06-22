import React from 'react';
import { useIntl } from 'react-intl';

const Contact = () => {
  const intl = useIntl();

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-text">
          <h2 className="contact-title">{intl.formatMessage({ id: 'contact.title' })}</h2>
          <p className="contact-subtitle">{intl.formatMessage({ id: 'contact.subtitle' })}</p>
      

          <div className="contact-alternative">
            <h3>{intl.formatMessage({ id: 'contact.findMe' })}</h3>
            <div className="social-links">
            <a href="https://mail.google.com/mail/u/1/#inbox" target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({ id: 'contact.email' })}
              </a>
              <a href="https://linkedin.com/in/deyanecast" target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({ id: 'contact.linkedin' })}
              </a>
              <a href="https://github.com/deyanecast" target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({ id: 'contact.github' })}
              </a>
              <a href="https://twitter.com/deyanecast" target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({ id: 'contact.twitter' })}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
