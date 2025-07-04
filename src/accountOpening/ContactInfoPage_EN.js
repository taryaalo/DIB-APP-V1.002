
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const ContactInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
    const { language } = useLanguage();
    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
                <button onClick={() => onNavigate(backPage)} className="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span>{t('back', language)}</span>
                </button>
            </header>
            <main className="form-main">
                <form className="form-container">
                    <div className="form-section">
                        <h3>Address Information</h3>
                        <div className="form-group">
                            <select className="form-input">
                                <option value="">Country</option>
                                <option value="libya">Libya</option>
                                <option value="tunisia">Tunisia</option>
                                <option value="egypt">Egypt</option>
                            </select>
                        </div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="City" /></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Area" /></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Residential Address" /></div>
                    </div>
                </form>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', language)}</button></div>
            </main>
        </div>
    );
}
export default ContactInfoPage_EN;

