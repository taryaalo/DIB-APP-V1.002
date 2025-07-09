import React from 'react';
import { LOGO_COLOR } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const ReviewWorkInfoPage_EN = ({ onNavigate, state }) => {
  const { language } = useLanguage();
  const work = state?.workInfo || {};

  const renderList = (obj) => (
    <ul className="confirmation-list">
      {Object.entries(obj).map(([k, v]) => (
        v ? (
          <li key={k}>
            <strong>{t(k, language)}:</strong> {v}
          </li>
        ) : null
      ))}
    </ul>
  );

  return (
    <div className="form-page">
      <header className="header docs-header">
        <img src={LOGO_COLOR} alt="Bank Logo" className="logo" />
        <div className="header-switchers">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <button onClick={() => onNavigate('reviewDocs', state)} className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>{t('back', language)}</span>
        </button>
      </header>
      <main className="form-main">
        <h2 className="form-title">{t('workInfoTitle', language)}</h2>
        {renderList(work)}
        <div className="form-actions">
          <button className="btn-next" onClick={() => onNavigate('landing')}>
            {t('next', language)}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewWorkInfoPage_EN;
