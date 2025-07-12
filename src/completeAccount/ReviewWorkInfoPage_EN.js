import React, { useEffect, useState } from 'react';
import { LOGO_COLOR } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const ReviewWorkInfoPage_EN = ({ onNavigate, state }) => {
  const { language } = useLanguage();
  const [work, setWork] = useState({});
  const [valid, setValid] = useState({});

  useEffect(() => {
    const load = async () => {
      const ref = state?.personalInfo?.reference_number;
      if (!ref) return;
      try {
        const resp = await fetch(`${API_BASE_URL}/api/work-info?reference=${encodeURIComponent(ref)}`);
        if (resp.ok) {
          const data = await resp.json();
          if (data) setWork(data);
        }
      } catch (e) { console.error(e); }
    };
    load();
  }, [state]);

  useEffect(() => {
    const init = {};
    Object.keys(work || {}).forEach(k => {
      if (work[k]) init[k] = false;
    });
    setValid(init);
  }, [work]);

  const toggleValid = (key) => {
    setValid(v => ({ ...v, [key]: !v[key] }));
  };

  const renderList = (obj) => (
    <ul className="confirmation-list">
      {Object.entries(obj).map(([k, v]) => (
        v ? (
          <li key={k} style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <label style={{display:'flex',alignItems:'center',gap:'5px'}}>
              <input type="checkbox" checked={!!valid[k]} onChange={() => toggleValid(k)} />
              <span>
                <strong>{t(k, language)}:</strong> {v}
              </span>
            </label>
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
          <button
            className="btn-next"
            disabled={Object.keys(valid).length === 0 || !Object.values(valid).every(Boolean)}
            onClick={() => onNavigate('reviewAddressInfo', state)}
          >
            {t('next', language)}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewWorkInfoPage_EN;
