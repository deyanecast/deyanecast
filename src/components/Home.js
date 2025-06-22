import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import Jellyfish from './Jellyfish';

const Home = () => {
  const intl = useIntl();

  // Contador de visitas en sessionStorage
  const [visitCount] = useState(() => {
    const saved = sessionStorage.getItem('visitCount');
    if (saved) return parseInt(saved, 10);
    const base = Math.floor(Math.random() * 50) + 250;
    sessionStorage.setItem('visitCount', base.toString());
    return base;
  });

  const [displayText, setDisplayText] = useState('');
  const fullText = 'GUATEMALA';

  // Un solo AudioContext para toda la app
  const audioCtxRef = useRef(null);
  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  // Sonido de “clic” de máquina de escribir
  const playTypewriterSound = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const duration = 0.04; // 40 ms

    // Ruido blanco + filtro bandpass para el “clic” percusivo
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1000, now);
    bandpass.Q.setValueAtTime(1, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noise.connect(bandpass).connect(noiseGain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);
  };

  // Efecto de tipeo con cleanup: se detiene al desmontar el componente
  useEffect(() => {
    let intervalId;
    let timeoutId;

    const typeText = () => {
      let idx = 0;
      intervalId = setInterval(() => {
        if (idx <= fullText.length) {
          setDisplayText(fullText.slice(0, idx));
          if (idx > 0) playTypewriterSound();
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
  }, []);

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
