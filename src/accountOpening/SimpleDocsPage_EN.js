
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

const SimpleDocsPage_EN = ({ onNavigate, backPage, nextPage, title }) => {
    const { language } = useLanguage();
    const { setFormData } = useFormData();

    const handlePassportUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const { data: { text } } = await Tesseract.recognize(file, 'ara+eng');
            const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
            const mrz = lines.slice(-2).join('');
            const result = parse(mrz);
            const f = result.fields;

            const arabicLine = lines.find(l => /[\u0600-\u06FF]/.test(l)) || '';
            const issueMatch = text.match(/(?:issue|issuance)[^\d]*(\d{2,4}[\/-]\d{1,2}[\/-]\d{2,4})/i);
            const issueDate = issueMatch ? normalizeDate(issueMatch[1]) : '';

            setFormData(data => ({
                ...data,
                personalInfo: {
                    ...data.personalInfo,
                    documentType: 'Passport',
                    passportNumber: f.documentNumber,
                    passportIssueDate: issueDate,
                    passportExpiry: formatMRZDate(f.expirationDate),
                    fullName: arabicLine || `${f.lastName.replace(/</g,' ')} ${f.firstName.replace(/</g,' ')}`.trim(),
                    firstNameEn: f.firstName.replace(/</g,' '),
                    lastNameEn: f.lastName.replace(/</g,' '),
                    dob: formatMRZDate(f.birthDate)
                }
            }));
        } catch(err) {
            console.error(err);
        }
    };

    const formatMRZDate = (val) => {
        if (!val) return '';
        const year = val.slice(0,2);
        const month = val.slice(2,4);
        const day = val.slice(4,6);
        return `20${year}-${month}-${day}`;
    };

    const normalizeDate = (val) => {
        const digits = val.replace(/[^0-9]/g, '');
        if (digits.length === 6) return `20${digits.slice(0,2)}-${digits.slice(2,4)}-${digits.slice(4,6)}`;
        if (digits.length === 8) {
            if (digits.startsWith('20')) return `${digits.slice(0,4)}-${digits.slice(4,6)}-${digits.slice(6,8)}`;
            return `${digits.slice(4,8)}-${digits.slice(2,4)}-${digits.slice(0,2)}`;
        }
        return '';
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
                    <div className="upload-box"><p>{t('approvedNationalId', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" /></div></div>
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
