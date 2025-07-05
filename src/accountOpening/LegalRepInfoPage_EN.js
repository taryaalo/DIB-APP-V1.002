
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const LegalRepInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
    const { language } = useLanguage();
    const handleNIDKeyDown = (e) => {
        if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };
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
                <form className="form-container" onSubmit={e => {e.preventDefault(); onNavigate(nextPage);}}>
                    <div className="form-section">
                        <h3>Legal Representative Information</h3>
                        <p style={{marginTop: "-15px", marginBottom: "20px"}}>This data is for the person responsible for opening the account in the company's name.</p>
                        <div className="form-group">
                            <input type="text" required className="form-input" placeholder="Full Name" />
                        </div>
                        <div className="form-group">
                            <label>National ID</label>
                            <div className="national-id-group">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <input key={index} type="text" maxLength="1" onKeyDown={handleNIDKeyDown} className="national-id-input" required />
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" required className="form-input" placeholder="Passport Number" />
                        </div>
                        <div className="form-group">
                            <select className="form-input" required>
                                <option value="">Legal Representative's Capacity</option>
                                <option value="owner">Owner</option>
                                <option value="ceo">CEO</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="phone-input-group">
                               <span className="phone-prefix">+218</span>
                               <input type="tel" required className="form-input" placeholder="Mobile Phone Number" />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" required className="form-input" placeholder="Personal Email" />
                        </div>
                    </div>
                    <div className="form-actions">
                    <button type="submit" className="btn-next">{t('next', language)}</button>
                </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};
export default LegalRepInfoPage_EN;
