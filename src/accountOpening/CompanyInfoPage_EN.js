
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const CompanyInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
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
                <form className="form-container">
                    <div className="form-section">
                        <h3>Basic Company Information</h3>
                        <div className="company-form-grid">
                            <div className="form-group"><input type="text" className="form-input" placeholder="Full Company Name" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="Country" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="Trade Name" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="City" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="Commercial Registration No." /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="Head Office Address" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="Activity License No." /></div>
                             <div className="form-group"><input type="text" className="form-input" placeholder="Postal Code" /></div>
                            <div className="form-group date-input-container"><input type="text" className="form-input" placeholder="Company Registration Date" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'}/><CalendarIcon/></div>
                             <div className="form-group"></div>
                             <div className="form-group"><select className="form-input"><option value="">Company Type</option><option value="limited">Limited Liability</option><option value="joint">Joint Stock</option></select></div>
                             <div className="form-group"></div>
                             <div className="form-group"><select className="form-input"><option value="">Business Activity</option><option value="trade">Trade</option><option value="services">Services</option><option value="industry">Industry</option></select></div>
                        </div>
                    </div>
                </form>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', language)}</button></div>
            </main>
            <Footer />
        </div>
    );
};
export default CompanyInfoPage_EN;
