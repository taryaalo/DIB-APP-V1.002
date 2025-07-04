import React, { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
