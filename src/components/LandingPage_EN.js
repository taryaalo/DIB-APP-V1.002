import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { OpenAccountIcon, CompleteAccountIcon } from './common/Icons';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const LandingPage_EN = ({ onNavigate }) => {
  const { lang } = useLanguage();
  return (
    <div className="landing-container">
      <div className="content-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={LOGO_WHITE} alt="Bank Logo" className="landing-logo" />
          <LanguageSwitcher />
        </div>
        <h1 className="landing-title">{t('welcomeTitle', lang)}</h1>
        <p className="landing-subtitle">{t('welcomeSub', lang)}</p>
        <div className="landing-buttons-container">
          <button onClick={() => onNavigate('selectUser')}>
            <OpenAccountIcon />
            <span>{t('openAccount', lang)}</span>
          </button>
          <button onClick={() => onNavigate('selectUser')} className="btn-secondary">
            <CompleteAccountIcon />
            <span>{t('completeAccount', lang)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage_EN;