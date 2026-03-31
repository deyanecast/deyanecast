import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 24 });
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    gsap.killTweensOf(el);
    gsap.to(el, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo(
      el.querySelectorAll('.contact-title, .contact-subtitle, .contact-alternative h3, .social-links a'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.45 }
    );
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-content" ref={contentRef}>
        <div className="contact-text">
          <h2 className="contact-title">Contact</h2>
          <p className="contact-subtitle">
            Do you have an amazing idea? Want to collaborate on a project? Or just want to chat
            about technology? I'd love to hear from you.
          </p>
      

          <div className="contact-alternative">
            <h3>You can also find me on:</h3>
            <div className="social-links">
            <a href="https://mail.google.com/mail/u/1/#inbox" target="_blank" rel="noopener noreferrer">
                Email
              </a>
              <a href="https://linkedin.com/in/deyanecast" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/deyanecast" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://twitter.com/deyanecast" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
