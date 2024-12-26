import React, { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { ENGLISH } from '../translations/en';
import { SPANISH } from '../translations/es';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState(ENGLISH);

  const switchLanguage = () => {
    if (locale === 'es') {
      setLocale('en');
      setMessages(ENGLISH);
    } else {
      setLocale('es');
      setMessages(SPANISH);
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