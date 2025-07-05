
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const FinancialInfoPage_EN = ({ onNavigate, backPage }) => {
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
                <form className="form-container" onSubmit={e => {e.preventDefault(); onNavigate('success');}}>
                    <div className="form-section">
                        <h3>Financial Information</h3>
                        <div className="form-group">
                            <input type="text" required className="form-input" placeholder="Average Monthly Income for the Company" />
                        </div>
                        <div className="form-group">
                            <input type="text" required className="form-input" placeholder="Primary Account Currency" />
                        </div>
                        <div className="form-group">
                            <input type="text" required className="form-input" placeholder="Main Source of Revenue" />
                        </div>
                        <div className="form-group">
                            <input type="text" required className="form-input" placeholder="Purpose of Opening the Account" />
                        </div>
                    </div>
                    <div className="form-actions">
                    <div className="agreements">
                        <label className="agreement-item">
                            <div className="custom-checkbox">
                                <input type="checkbox" defaultChecked required/>
                                <span className="checkmark"></span>
                            </div>
                            <span>{t('certifyCorrect', language)}</span>
                        </label>
                         <label className="agreement-item">
                            <div className="custom-checkbox">
                                <input type="checkbox" required/>
                                <span className="checkmark"></span>
                            </div>
                            <span>{t('agreeTerms', language)}</span>
                        </label>
                    </div>
                    <button type="submit" className="btn-next">{t('submitRequest', language)}</button>
                </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};
export default FinancialInfoPage_EN;
