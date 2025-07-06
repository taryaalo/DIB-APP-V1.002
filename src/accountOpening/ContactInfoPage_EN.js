
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const ContactInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
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
                <form className="form-container" onSubmit={e => {e.preventDefault(); onNavigate(nextPage);}} noValidate>
                    <div className="form-section">
                        <h3>{t('addressInfoTitle', language)}</h3>
                        <div className="form-group">
                            <select className="form-input" required>
                                <option value="">{t('country', language)}</option>
                                <option value="libya">Libya</option>
                                <option value="tunisia">Tunisia</option>
                                <option value="egypt">Egypt</option>
                            </select>
                        </div>
                        <div className="form-group"><input type="text" required className="form-input" placeholder={t('city', language)} /></div>
                        <div className="form-group"><input type="text" required className="form-input" placeholder={t('area', language)} /></div>
                        <div className="form-group"><input type="text" required className="form-input" placeholder={t('residentialAddress', language)} /></div>
                    </div>
                    <div className="form-actions"><button type="submit" className="btn-next">{t('next', language)}</button></div>
                </form>
            </main>
            <Footer />
        </div>
    );
}
export default ContactInfoPage_EN;

