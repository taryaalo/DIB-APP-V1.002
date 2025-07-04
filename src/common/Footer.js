import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className="footer">
      {t('copyRight', language)}
    </footer>
  );
};

export default Footer;
