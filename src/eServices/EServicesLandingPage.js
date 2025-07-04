import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../common/ThemeSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const EServicesLanding = ({ onNavigate }) => {
  const { language } = useLanguage();
  return (
    <div className="landing-container">
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <div className="content-wrapper">
        <img src={LOGO_WHITE} alt="Bank Logo" className="landing-logo" />
        <h1 className="landing-title">{language === 'ar' ? 'التسجيل في الخدمات الإلكترونية' : 'E-Services Registration'}</h1>
        <p className="landing-subtitle">{language === 'ar' ? 'هذه الخدمة قيد التطوير' : 'This service is under construction.'}</p>
        <button className="btn-next" onClick={() => onNavigate('landing')}>
          {language === 'ar' ? 'العودة' : 'Back'}
        </button>
      </div>
    </div>
  );
};

export default EServicesLanding;
