import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, toggleLanguage } = useLanguage();
  return (
    <button className="language-switcher" onClick={toggleLanguage}>
      {lang === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
