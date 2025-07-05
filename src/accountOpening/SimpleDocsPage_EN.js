
import React, { useState } from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';
import { uploadPassport } from '../utils/ocr';

const SimpleDocsPage_EN = ({ onNavigate, backPage, nextPage, title }) => {
    const { language } = useLanguage();
    const { setFormData } = useFormData();
    const [uploaded, setUploaded] = useState({
        nationalId: false,
        passport: false,
        letter: false,
        photo: false
    });
    const [passportInfo, setPassportInfo] = useState(null);
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePassportUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setVerifying(true);
        setProgress(0);
        try {
            const resp = await uploadPassport(file, p => setProgress(p));
            if (resp && resp.fields) {
                const info = resp.fields;
                setPassportInfo(info);
                setFormData(data => ({
                    ...data,
                    personalInfo: {
                        ...data.personalInfo,
                        ...info
                    }
                }));
                setUploaded(u => ({ ...u, passport: true }));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setVerifying(false);
        }
    };

    const handleUpload = (key) => (e) => {
        if (e.target.files[0]) {
            setUploaded(u => ({ ...u, [key]: true }));
        }
    };

    const allUploaded = passportInfo && Object.values(uploaded).every(Boolean);
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
                    <div className="upload-box"><p>{t('approvedNationalId', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" onChange={handleUpload('nationalId')} disabled={verifying} /></div></div>
                    <div className="upload-box"><p>{t('passportPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required onChange={handlePassportUpload} capture="environment" disabled={verifying} /></div></div>
                    <div className="upload-box"><p>{t('accountOpeningLetter', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" onChange={handleUpload('letter')} disabled={verifying} /></div></div>
                    <div className="upload-box"><p>{t('recentPersonalPhoto', language)}</p><div className="upload-placeholder"><input type="file" accept="image/*" required capture="environment" onChange={handleUpload('photo')} disabled={verifying} /></div></div>
                </div>
                <ul className="upload-checklist">
                    <li><input type="checkbox" readOnly checked={uploaded.nationalId} /> {t('approvedNationalId', language)}</li>
                    <li><input type="checkbox" readOnly checked={uploaded.passport} /> {t('passportPhoto', language)}</li>
                    <li><input type="checkbox" readOnly checked={uploaded.letter} /> {t('accountOpeningLetter', language)}</li>
                    <li><input type="checkbox" readOnly checked={uploaded.photo} /> {t('recentPersonalPhoto', language)}</li>
                </ul>
                {verifying && (
                    <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${Math.round(progress * 100)}%` }}></div></div>
                )}
                {passportInfo && (
                    <div className="status-dialog">
                        <p>Name: {passportInfo.fullName}</p>
                        <p>Birth Date: {passportInfo.dob}</p>
                        <p>Expiry Date: {passportInfo.passportExpiry}</p>
                    </div>
                )}
                <div className="form-actions">
                    <button className="btn-next" onClick={() => setVerified(true)} disabled={!allUploaded || verifying}>Upload</button>
                    <button className="btn-next" onClick={() => onNavigate(nextPage)} disabled={!verified || verifying}>{t('next', language)}</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default SimpleDocsPage_EN;
