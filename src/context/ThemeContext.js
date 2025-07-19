import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    console.log('Aplicando tema:', theme);
    document.body.setAttribute('data-theme', theme);
    console.log('Atributo data-theme aplicado:', document.body.getAttribute('data-theme'));
  }, [theme]);

  const toggleTheme = () => {
    console.log('Cambiando tema de', theme, 'a', theme === 'light' ? 'dark' : 'light');
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 