import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';
import Tesseract from 'tesseract.js';
import { parse } from 'mrz';

const ExpatDocsPage_EN = ({ onNavigate, backPage, nextPage }) => {
    const { language } = useLanguage();
    const { setFormData } = useFormData();

    const handlePassportUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const { data: { text } } = await Tesseract.recognize(file, 'eng');
            const lines = text.split('\n').map(l => l.trim()).filter(Boolean).slice(-2).join('');
            const result = parse(lines);
            const fields = result.fields;
            setFormData(data => ({
                ...data,
                personalInfo: {
                    ...data.personalInfo,
                    fullName: `${fields.lastName.replace(/</g,' ')} ${fields.firstName.replace(/</g,' ')}`.trim(),
                    firstNameEn: fields.firstName.replace(/</g,' '),
                    lastNameEn: fields.lastName.replace(/</g,' '),
                    dob: formatDate(fields.dateOfBirth),
                    passportExpiry: formatDate(fields.expirationDate)
                }
            }));
        } catch(err) { console.error(err); }
    };

    const formatDate = (val) => {
        if (!val) return '';
        const year = val.slice(0,2);
        const month = val.slice(2,4);
        const day = val.slice(4,6);
        return `20${year}-${month}-${day}`;
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
                <h2 className="form-title">{t('requiredDocs', language)}</h2>
                <div className="docs-grid">
                    <div className="upload-box"><p>{t('passportPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required onChange={handlePassportUpload} capture="environment" /></div></div>
                    <div className="upload-box"><p>{t('accountOpeningLetter', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" /></div></div>
                    <div className="upload-box"><p>{t('recentPersonalPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" /></div></div>
                    <div className="upload-box"><p>{t('censusCardPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" /></div></div>
                </div>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', language)}</button></div>
            </main>
            <Footer />
        </div>
    );
};
export default ExpatDocsPage_EN;
