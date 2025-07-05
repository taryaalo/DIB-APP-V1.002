import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { OpenAccountIcon, CompleteAccountIcon } from '../common/Icons';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../common/ThemeSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const LandingPage_EN = ({ onNavigate }) => {
  const { language } = useLanguage();
  return (
    <div className="landing-container">
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '30px' }}>
        <ThemeSwitcher />
                    <LanguageSwitcher />
      </div>
      <div className="content-wrapper">
        <img src={LOGO_WHITE} alt="Bank Logo" className="landing-logo" />
        <h1 className="landing-title">{t('welcomeTitle', language)}</h1>
        <p className="landing-subtitle">{t('welcomeSub', language)}</p>
        <div className="landing-buttons-container">
          <button onClick={() => onNavigate('selectUser')}>
            <OpenAccountIcon />
            <span>{t('openAccount', language)}</span>
          </button>
          <button onClick={() => onNavigate('selectUser')} className="btn-secondary">
            <CompleteAccountIcon />
            <span>{t('completeAccount', language)}</span>
          </button>
          <button onClick={() => onNavigate('eServices')} className="btn-secondary">
            <CompleteAccountIcon />
            <span>{language === 'ar' ? 'تسجيل في خدمات الكترونية' : 'Register for E-Services'}</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default LandingPage_EN;