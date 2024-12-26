import React, { useRef, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const intl = useIntl();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2qkwzxg', 'template_8zk5w3q', form.current, 'user_your_user_id')
      .then((result) => {
          console.log(result.text);
          form.current.reset();
          alert(intl.formatMessage({ id: 'contact.success' }));
      }, (error) => {
          console.log(error.text);
          alert(intl.formatMessage({ id: 'contact.error' }));
      });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">
        <FormattedMessage id="contact.title" />
      </h2>
      <p className="contact-subtitle">
        <FormattedMessage id="contact.subtitle" />
      </p>
      
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="contact-form-row">
          <input
            type="text"
            name="user_name"
            placeholder={intl.formatMessage({ id: 'contact.name' })}
            required
            className="contact-form-field"
          />
          <input
            type="email"
            name="user_email"
            placeholder={intl.formatMessage({ id: 'contact.email' })}
            required
            className="contact-form-field"
          />
        </div>
        <textarea
          name="message"
          placeholder={intl.formatMessage({ id: 'contact.message' })}
          required
          className="contact-form-textarea"
        />
        <button type="submit" className="contact-form-submit">
          <FormattedMessage id="contact.submit" />
        </button>
      </form>
      
      <div className="contact-alternative">
        <p><FormattedMessage id="contact.findMe" /></p>
        <div className="social-links">
          <a href="https://github.com/deyanecast" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/deyanecast" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
