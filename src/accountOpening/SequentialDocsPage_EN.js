import React, { useState, useRef } from 'react';
import { extractDocumentData } from '../utils/docExtractor';
import { t } from '../i18n';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { LOGO_WHITE } from '../assets/imagePaths';
import { useLanguage } from '../contexts/LanguageContext';

const DOCS = [
  { key: 'passport', labelKey: 'passportPhoto' },
  { key: 'nationalId', labelKey: 'approvedNationalId' },
  { key: 'letter', labelKey: 'accountOpeningLetter' },
  { key: 'photo', labelKey: 'recentPersonalPhoto' },
];

const SequentialDocsPage_EN = ({ onNavigate, backPage, nextPage }) => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setIsLoading(true);
    setError('');
    try {
      const result = await extractDocumentData(file, DOCS[current].key);
      setData((d) => ({ ...d, [DOCS[current].key]: result }));
    } catch (e) {
      console.error(e);
      setError('Failed to extract data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setCurrent((c) => c + 1);
  };

  const allDone = current >= DOCS.length;
  const doc = DOCS[current];

  return (
    <div className="form-page">
      <header className="header docs-header">
        <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
        <div style={{ display: 'flex', gap: '30px' }}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <button onClick={() => onNavigate(backPage)} className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>{t('back', language)}</span>
        </button>
      </header>
      <main className="form-main" style={{ textAlign: 'center' }}>
        {allDone ? (
          <>
            <h2 className="form-title">{t('confirmData', language)}</h2>
            <pre style={{ textAlign: 'left' }}>{JSON.stringify(data, null, 2)}</pre>
            <div className="form-actions">
              <button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', language)}</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="form-title">{t(doc.labelKey, language)}</h2>
            <div className="upload-box" onClick={() => fileInputRef.current.click()}>
              <div className="upload-placeholder">
                <input type="file" ref={fileInputRef} onChange={(e) => handleUpload(e.target.files[0])} accept="image/*" style={{ display: 'none' }} />
                <span style={{ cursor: 'pointer' }}>{t('upload_prompt', language)}</span>
              </div>
            </div>
            {isLoading && <p>{t('extracting_data', language)}</p>}
            {error && <p className="error-message">{error}</p>}
            {data[doc.key] && !isLoading && (
              <div className="status-dialog" style={{ textAlign: 'left' }}>
                <pre>{JSON.stringify(data[doc.key], null, 2)}</pre>
                <button className="btn-next" onClick={handleConfirm}>{t('confirm', language)}</button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SequentialDocsPage_EN;
