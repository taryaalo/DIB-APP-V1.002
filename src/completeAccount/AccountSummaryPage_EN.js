import React, { useEffect, useState } from 'react';
import { LOGO_COLOR } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';
import jsPDF from 'jspdf';

const mockFetchCustomerId = () =>
  new Promise(resolve => setTimeout(() => resolve('CUST-0001'), 500));

const AccountSummaryPage_EN = ({ onNavigate, state }) => {
  const { language } = useLanguage();
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    mockFetchCustomerId().then(setCustomerId);
  }, []);

  const renderList = (obj) => (
    <ul className="confirmation-list">
      {Object.entries(obj || {}).map(([k, v]) => (
        v ? (
          <li key={k}>
            <strong>{t(k, language)}:</strong> {v}
          </li>
        ) : null
      ))}
    </ul>
  );

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(18);
    doc.text(t('accountSummary', language), pageWidth / 2, 20, { align: 'center' });
    let y = 35;
    const addSection = (title, obj) => {
      doc.setFontSize(14);
      doc.text(title, 15, y);
      y += 8;
      doc.setFontSize(12);
      Object.entries(obj || {}).forEach(([k, v]) => {
        if (!v) return;
        const value = Array.isArray(v) ? v.join('') : v;
        doc.text(`${t(k, language)}: ${value}`, 20, y);
        y += 6;
      });
    };
    addSection(t('personalInfo', language), state.personalInfo || {});
    addSection(t('addressInfoTitle', language), state.addressInfo || {});
    addSection(t('workInfoTitle', language), state.workInfo || {});
    addSection(t('registerEServices', language), {
      mobileApp: state.eServices?.mobileApp ? t('yes', language) : t('no', language),
      sms: state.eServices?.sms ? t('yes', language) : t('no', language),
      localCard: state.eServices?.localCard ? t('yes', language) : t('no', language),
      internationalCard: state.eServices?.internationalCard ? t('yes', language) : t('no', language)
    });
    doc.text(`${t('customerId', language)}: ${customerId}`, 15, y);
    doc.save('account_summary.pdf');
  };

  return (
    <div className="form-page">
      <header className="header docs-header">
        <img src={LOGO_COLOR} alt="Bank Logo" className="logo" />
        <div className="header-switchers">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <button onClick={() => onNavigate('eServicesReg', state)} className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>{t('back', language)}</span>
        </button>
      </header>
      <main className="form-main">
        <h2 className="form-title">{t('accountSummary', language)}</h2>
        <div className="confirmation-document">
          <div className="confirmation-header">{t('personalInfo', language)}</div>
          {renderList(state.personalInfo)}
          <div className="confirmation-header">{t('addressInfoTitle', language)}</div>
          {renderList(state.addressInfo)}
          <div className="confirmation-header">{t('workInfoTitle', language)}</div>
          {renderList(state.workInfo)}
          <div className="confirmation-header">{t('registerEServices', language)}</div>
          <ul className="confirmation-list">
            <li><strong>{t('registerMobileApp', language)}:</strong> {state.eServices?.mobileApp ? t('yes', language) : t('no', language)}</li>
            <li><strong>{t('registerSmsService', language)}:</strong> {state.eServices?.sms ? t('yes', language) : t('no', language)}</li>
            <li><strong>{t('registerLocalCard', language)}:</strong> {state.eServices?.localCard ? t('yes', language) : t('no', language)}</li>
            <li><strong>{t('registerInternationalCard', language)}:</strong> {state.eServices?.internationalCard ? t('yes', language) : t('no', language)}</li>
          </ul>
          <div className="confirmation-header">{t('customerId', language)}</div>
          <p>{customerId || '...'}</p>
        </div>
        <div className="form-actions">
          <button className="btn-export" onClick={handleExport} style={{marginRight:'10px'}}>{t('exportPdf', language)}</button>
          <button className="btn-next" onClick={() => onNavigate('landing')}>{t('backToHome', language)}</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSummaryPage_EN;
