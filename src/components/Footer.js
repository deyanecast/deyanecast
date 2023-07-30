// Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import '../style.css';


const Footer = () => {
  return (
    <div className="footer">
      <a href="mailto:youremail@gmail.com" className="gmail social">
        <FontAwesomeIcon icon={faEnvelope} size="2x" />
      </a>
      <a href="https://www.github.com/yourusername" className="github social">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a href="https://www.twitter.com/yourusername" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a
        href="https://www.linkedin.com/in/yourusername"
        className="linkedin social"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a
        href="https://www.instagram.com/yourusername"
        className="instagram social"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
};

export default Footer;
