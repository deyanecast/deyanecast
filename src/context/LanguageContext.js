import React, { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import englishMessages from '../translations/en.json';
import spanishMessages from '../translations/es.json';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState(englishMessages);

  const switchLanguage = () => {
    if (locale === 'es') {
      setLocale('en');
      setMessages(englishMessages);
    } else {
      setLocale('es');
      setMessages(spanishMessages);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}; 