
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const WorkInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
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
                        <h3>Work and Income Information</h3>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Employment Status" /></div>
                        <div className="form-group"><select className="form-input"><option value="">Job Title</option><option value="manager">Manager</option><option value="employee">Employee</option><option value="specialist">Specialist</option></select></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Employer" /></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Employer's Address" /></div>
                        <div className="form-group"><input type="tel" className="form-input" placeholder="Employer's Phone" /></div>
                        <div className="form-group"><select className="form-input"><option value="">Main Source of Income</option><option value="salary">Salary</option><option value="business">Freelance</option><option value="investment">Investment</option></select></div>
                        <div className="form-group"><select className="form-input"><option value="">Average Monthly Income</option><option value="low">Less than 2000</option><option value="medium">2000 - 5000</option><option value="high">More than 5000</option></select></div>
                    </div>
                </form>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', lang)}</button></div>
            </main>
        </div>
    );
}
export default WorkInfoPage_EN;

