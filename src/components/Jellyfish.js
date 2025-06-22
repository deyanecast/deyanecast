import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const getJellyfishColors = (theme) => {
  if (theme === 'dark') {
    return {
      bodyMain: '#f06292', // rosa
      bodyShadow: '#ad1457',
      bodyHighlight: '#fff',
      tentacleMain: '#ad1457',
      tentacleLight: '#f8bbd0',
      tentacleDark: '#880e4f',
      detail: '#fff',
    };
  } else {
    return {
      bodyMain: '#4fc3f7', // azul
      bodyShadow: '#1976d2',
      bodyHighlight: '#fff',
      tentacleMain: '#1976d2',
      tentacleLight: '#b3e5fc',
      tentacleDark: '#0d47a1',
      detail: '#fff',
    };
  }
};

const Jellyfish = () => {
  const { theme } = useTheme();
  const colors = getJellyfishColors(theme);
  const bodyRef = useRef(null);
  // 4 tentáculos gruesos, 4 delgados, 2 muy finos
  const tentacleRefs = useMemo(() => Array(10).fill().map(() => React.createRef()), []);

  // Flotación de la cabeza
  useEffect(() => {
    gsap.to(bodyRef.current, {
      y: 18,
      repeat: -1,
      yoyo: true,
      duration: 3.2,
      ease: 'sine.inOut',
    });
    // Tentáculos: ondulación
    tentacleRefs.forEach((ref, i) => {
      gsap.to(ref.current, {
        rotation: i % 2 === 0 ? 12 : -12,
        transformOrigin: '50% 0%',
        repeat: -1,
        yoyo: true,
        duration: 2.2 + (i % 4) * 0.5,
        ease: 'sine.inOut',
        delay: i * 0.13,
      });
    });
  }, [tentacleRefs]);

  // SVG tentáculos variados
  const tentaclePaths = [
    // Gruesos
    { d: 'M70,120 Q60,180 80,210 Q100,250 60,260', color: colors.tentacleDark, width: 7, opacity: 0.7 },
    { d: 'M90,120 Q100,180 100,210 Q110,250 120,260', color: colors.tentacleMain, width: 8, opacity: 0.7 },
    { d: 'M110,120 Q120,180 120,210 Q130,250 140,260', color: colors.tentacleDark, width: 7, opacity: 0.7 },
    { d: 'M130,120 Q140,180 140,210 Q150,250 180,260', color: colors.tentacleMain, width: 8, opacity: 0.7 },
    // Delgados
    { d: 'M80,120 Q70,170 90,210 Q110,250 100,270', color: colors.tentacleLight, width: 3, opacity: 0.5 },
    { d: 'M100,120 Q110,170 110,210 Q120,250 130,270', color: colors.tentacleLight, width: 3, opacity: 0.5 },
    { d: 'M120,120 Q130,170 130,210 Q140,250 160,270', color: colors.tentacleLight, width: 3, opacity: 0.5 },
    { d: 'M140,120 Q150,170 150,210 Q160,250 180,270', color: colors.tentacleLight, width: 3, opacity: 0.5 },
    // Muy finos
    { d: 'M85,120 Q80,180 70,250', color: colors.tentacleLight, width: 1.5, opacity: 0.3 },
    { d: 'M125,120 Q130,180 140,250', color: colors.tentacleLight, width: 1.5, opacity: 0.3 },
  ];

  // SVG detalles internos de la cúpula
  const innerDetails = [
    <ellipse key="d1" cx="110" cy="80" rx="30" ry="12" fill="none" stroke={colors.bodyShadow} strokeWidth="2" opacity="0.18" />, 
    <ellipse key="d2" cx="110" cy="90" rx="22" ry="8" fill="none" stroke={colors.bodyShadow} strokeWidth="1.5" opacity="0.13" />,
    <ellipse key="d3" cx="110" cy="100" rx="15" ry="5" fill="none" stroke={colors.bodyShadow} strokeWidth="1" opacity="0.10" />,
    <ellipse key="d4" cx="110" cy="110" rx="8" ry="2.5" fill="none" stroke={colors.bodyShadow} strokeWidth="0.8" opacity="0.10" />,
    // Brillos
    <ellipse key="h1" cx="130" cy="70" rx="10" ry="4" fill={colors.bodyHighlight} opacity="0.18" />,
    <ellipse key="h2" cx="120" cy="60" rx="6" ry="2" fill={colors.bodyHighlight} opacity="0.13" />,
    <ellipse key="h3" cx="100" cy="65" rx="4" ry="1.5" fill={colors.bodyHighlight} opacity="0.10" />,
  ];

  // Medusa en la esquina inferior izquierda, fondo limpio
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '260px',
      height: '260px',
      zIndex: 1,
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      <svg
        width="260"
        height="260"
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Sombra */}
        <ellipse cx="110" cy="265" rx="60" ry="12" fill="#000" opacity="0.10" />
        {/* Medusa completa (cúpula + tentáculos) */}
        <g ref={bodyRef}>
          {/* Cúpula principal */}
          <defs>
            <radialGradient id="jellyBody" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor={colors.bodyHighlight} stopOpacity="0.7" />
              <stop offset="100%" stopColor={colors.bodyMain} />
            </radialGradient>
            <radialGradient id="jellyShadow" cx="60%" cy="80%" r="60%">
              <stop offset="0%" stopColor={colors.bodyShadow} stopOpacity="0.2" />
              <stop offset="100%" stopColor={colors.bodyMain} stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="110" cy="100" rx="70" ry="50" fill="url(#jellyBody)" />
          <ellipse cx="110" cy="120" rx="60" ry="35" fill="url(#jellyShadow)" opacity="0.5" />
          {/* Detalles internos */}
          {innerDetails}
          {/* Tentáculos */}
          {tentaclePaths.map((t, i) => (
            <path
              key={i}
              ref={tentacleRefs[i]}
              d={t.d}
              stroke={t.color}
              strokeWidth={t.width}
              fill="none"
              opacity={t.opacity}
              style={{ transition: 'stroke 0.3s' }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Jellyfish; 