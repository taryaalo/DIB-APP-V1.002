
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { UploadIcon } from './common/Icons';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const SimpleDocsPage_EN = ({ onNavigate, backPage, nextPage, title }) => {
    const { lang } = useLanguage();
    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
                 <button onClick={() => onNavigate(backPage)} className="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span>{t('back', lang)}</span>
                </button>
                <LanguageSwitcher />
            </header>
            <main className="form-main">
                <h2 className="form-title">{title}</h2>
                <div className="docs-grid">
                    <div className="upload-box"><p>Approved National ID</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Passport Photo</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Account Opening Letter from Employer</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Recent Personal Photo</p><div className="upload-placeholder"><UploadIcon /></div></div>
                </div>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', lang)}</button></div>
            </main>
        </div>
    );
}
export default SimpleDocsPage_EN;
