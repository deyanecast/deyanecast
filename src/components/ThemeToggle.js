import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme" style={{marginRight: '10px'}}>
      {theme === 'dark' ? (
        <span role="img" aria-label="Día" style={{fontSize: '1.3rem'}}>🌞</span>
      ) : (
        <span role="img" aria-label="Noche" style={{fontSize: '1.3rem'}}>🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle; 