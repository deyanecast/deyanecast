import React, { createContext, useState, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../translations/en.json';
import esMessages from '../translations/es.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const messages = {
    en: enMessages,
    es: esMessages
  };

  const switchLanguage = () => {
    setLocale(prevLocale => prevLocale === 'en' ? 'es' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider messages={messages[locale]} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export { LanguageContext }; 