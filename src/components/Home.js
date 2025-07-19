import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

const Home = () => {
  const intl = useIntl();

  const [displayText, setDisplayText] = useState('');
  const fullText = intl.formatMessage({ id: 'home.welcome' });

  // Efecto de tipeo con cleanup: se detiene al desmontar el componente
  useEffect(() => {
    let intervalId;
    let timeoutId;

    const typeText = () => {
      let idx = 0;
      intervalId = setInterval(() => {
        if (idx <= fullText.length) {
          setDisplayText(fullText.slice(0, idx));
          idx++;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            setDisplayText('');
            typeText();
          }, 3000);
        }
      }, 150);
    };

    typeText();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [fullText]);

  return (
    <div className="home-container">
      <div className="quadrant-content">
        <div className="info-block">
          <div className="info-line">{displayText}</div>
          <div className="info-line">2021 - present</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
