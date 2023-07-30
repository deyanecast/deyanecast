import React from 'react';
import '../style.css';
import myPhoto from '../portafolio.jpeg';
import Career from './Career'; // Asegúrate de que la ruta sea correcta

const About = () => {
  return (
    <div>
      <div id="about" className="about">
        <div className="about-text">
          <h3>HEY THERE!</h3>
          <h2 className="about-text-title">I'm Deyane</h2>
          <p className="about-text-text">I am Deyane, a young mother from Guatemala with a great interest in life, science and technology. I am passionate about learning about new developments in these fields and am committed to using my knowledge and skills to make a positive difference in my community and the world. My goal is to build something that can help future generations to prosper and have a better future.</p> 
        </div>
        <div className="about-photo">
          <img src={myPhoto} alt="Yo" /> {/* Coloca aquí tu imagen */}
        </div>
      </div>
      <Career /> 
    </div>
  );
}

export default About;
