
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';
import { extractPassportData } from '../utils/Passport_Data_Extractor';
import { extractNIDData } from '../utils/NID_Data_Extractor';

const SimpleDocsPage_EN = ({ onNavigate, backPage, nextPage, title }) => {
    const { language } = useLanguage();
    const { setFormData } = useFormData();

    const handlePassportUpload = async (e) => {
        const file = e.target.files[0];
        const data = await extractPassportData(file);
        if (!data) return;
        setFormData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                ...data
            }
        }));
    };

    const handleNIDUpload = async (e) => {
        const file = e.target.files[0];
        const data = await extractNIDData(file);
        if (!data) return;
        setFormData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                ...data
            }
        }));
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
                <h2 className="form-title">{t(title.toLowerCase(), language)}</h2>
                <div className="docs-grid">
                    <div className="upload-box"><p>{t('approvedNationalId', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required onChange={handleNIDUpload} capture="environment" /></div></div>
                    <div className="upload-box"><p>{t('passportPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required onChange={handlePassportUpload} capture="environment" /></div></div>
                    <div className="upload-box"><p>{t('accountOpeningLetter', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" /></div></div>
                    <div className="upload-box"><p>{t('recentPersonalPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" /></div></div>
                </div>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', language)}</button></div>
            </main>
            <Footer />
        </div>
    );
}
export default SimpleDocsPage_EN;
