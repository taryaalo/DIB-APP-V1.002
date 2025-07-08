import React, { useState } from 'react';
import { LOGO_COLOR } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const LookupPage_EN = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [identifier, setIdentifier] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleLookup = async () => {
    setError('');
    setData(null);
    const query = identifier.trim();
    if (!query) {
      setError('missing_identifier');
      return;
    }
    const params = new URLSearchParams();
    if (/^\d{12}$/.test(query)) params.append('nid', query);
    else params.append('reference', query);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/customer?${params.toString()}`);
      if (resp.ok) {
        const json = await resp.json();
        setData(json);
      } else {
        const json = await resp.json().catch(() => ({}));
        setError(json.error || 'server_error');
      }
    } catch (e) {
      console.error(e);
      setError('server_error');
    }
  };

  const renderList = (obj) => (
    <ul className="confirmation-list">
      {Object.entries(obj || {}).map(([k, v]) => (
        v !== null && v !== undefined && (
          <li key={k}><strong>{t(k, language) || k}:</strong> {String(v)}</li>
        )
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
        <button onClick={() => onNavigate('landing')} className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>{t('back', language)}</span>
        </button>
      </header>
      <main className="form-main">
        <div className="form-container">
          <div className="form-group">
            <input
              className="form-input"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder={t('referenceOrNid', language)}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-next" onClick={handleLookup}>{t('search', language)}</button>
          </div>
          {error && <div className="status-dialog">{t(error, language) || error}</div>}
          {data && (
            <div className="confirmation-document">
              {data.personalInfo && (
                <>
                  <div className="confirmation-header">{t('personalInfo', language)}</div>
                  {renderList(data.personalInfo)}
                </>
              )}
              {data.addressInfo && (
                <>
                  <div className="confirmation-header">{t('addressInfoTitle', language)}</div>
                  {renderList(data.addressInfo)}
                </>
              )}
              {data.workInfo && (
                <>
                  <div className="confirmation-header">{t('workInfoTitle', language)}</div>
                  {renderList(data.workInfo)}
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LookupPage_EN;
