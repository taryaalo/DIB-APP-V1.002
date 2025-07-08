import React, { useEffect, useState } from 'react';
import { LOGO_COLOR } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const DOC_LABELS = {
  passport: 'passportPhoto',
  nationalId: 'approvedNationalId',
  letter: 'accountOpeningLetter',
  photo: 'recentPersonalPhoto'
};

const ReviewDocsPage_EN = ({ onNavigate, state }) => {
  const { language } = useLanguage();
  const [docs, setDocs] = useState([]);
  const [valid, setValid] = useState({});

  useEffect(() => {
    const uploaded = state?.uploadedDocuments || [];
    const sorted = [...uploaded].sort((a, b) => a.doc_type.localeCompare(b.doc_type));
    setDocs(sorted);
  }, [state]);

  const toggleValid = (id) => {
    setValid(v => ({ ...v, [id]: !v[id] }));
  };

  return (
    <div className="form-page">
      <header className="header docs-header">
        <img src={LOGO_COLOR} alt="Bank Logo" className="logo" />
        <div className="header-switchers">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <button onClick={() => onNavigate('completeAccount')} className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>{t('back', language)}</span>
        </button>
      </header>
      <main className="form-main">
        <h2 className="form-title">{t('reviewDocuments', language)}</h2>
        <div className="docs-grid">
          {docs.map(doc => (
            <div key={doc.reference_number} className="image-preview-box" style={{alignItems:'center'}}>
              <img src={`${API_BASE_URL}/${doc.file_name}`} alt={doc.doc_type} />
              <div style={{marginTop:'10px', fontWeight:'600'}}>{t(DOC_LABELS[doc.doc_type] || doc.doc_type, language)}</div>
              <label style={{marginTop:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
                <input type="checkbox" checked={!!valid[doc.reference_number]} onChange={() => toggleValid(doc.reference_number)} />
                {t('valid', language)}
              </label>
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button className="btn-next" onClick={() => onNavigate('landing')}>{t('next', language)}</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewDocsPage_EN;
