import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const ExpatDocsPage_EN = ({ onNavigate, backPage, nextPage }) => {
    const { language } = useLanguage();
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
            <main className="form-main">
                <h2 className="form-title">{t('requiredDocs', language)}</h2>
                <div className="docs-grid">
                    <div className="upload-box"><p>Passport Photo</p><div className="upload-placeholder"><input type="file" accept="image/*" capture="environment" /></div></div>
                    <div className="upload-box"><p>Account Opening Letter from Employer</p><div className="upload-placeholder"><input type="file" accept="image/*" capture="environment" /></div></div>
                    <div className="upload-box"><p>Recent Personal Photo</p><div className="upload-placeholder"><input type="file" accept="image/*" capture="environment" /></div></div>
                    <div className="upload-box"><p>{t('censusCardPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" capture="environment" /></div></div>
                </div>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', language)}</button></div>
            </main>
            <Footer />
        </div>
    );
};
export default ExpatDocsPage_EN;
