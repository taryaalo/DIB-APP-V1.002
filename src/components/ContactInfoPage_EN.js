
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const ContactInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
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
                <form className="form-container">
                    <div className="form-section">
                        <h3>Address Information</h3>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Country" /></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="City" /></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Area" /></div>
                    </div>
                    <div className="form-section">
                        <h3>Contact Information</h3>
                         <div className="form-group"><div className="phone-input-group"><span className="phone-prefix">+218</span><input type="tel" className="form-input" placeholder="Phone Number" /></div></div>
                        <div className="form-group"><input type="email" className="form-input" placeholder="Email Address" /></div>
                    </div>
                </form>
                 <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', lang)}</button></div>
             </main>
         </div>
     );
}
export default ContactInfoPage_EN;

