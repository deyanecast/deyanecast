import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../style.css';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_oavekzn', 'template_zw6n3q7', form.current, 'ZBWKdGjMxrXSwkUA9')
      .then((result) => {
          console.log(result.text);
          window.alert("Mensaje enviado con éxito!");
          form.current.reset();
      }, (error) => {
          console.log(error.text);
          window.alert("Hubo un error al enviar el mensaje. Por favor, intente nuevamente.");
      });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <h2 className="contact-subtitle">We'd love to hear from you!</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label className="contact-form-label">Name</label>
            <input type="text" name="name" className="contact-form-input" />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label">Email</label>
            <input type="email" name="user_email" className="contact-form-input" />
          </div>
        </div>
        <div className="contact-form-field">
          <label className="contact-form-label">Message</label>
          <textarea name="message" className="contact-form-textarea" />
        </div>
        <input type="submit" value="Send" className="contact-form-submit" />
      </form>
    </div>
  );
}

export default Contact;
