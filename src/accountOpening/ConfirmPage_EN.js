import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const ConfirmPage_EN = ({ onNavigate, state }) => {
    const { language } = useLanguage();
    const form = state?.form || {};

    const handleConfirm = () => {
        const phoneOtp = Math.floor(1000 + Math.random() * 9000).toString();
        const enteredPhone = prompt(`Enter OTP sent to phone (${phoneOtp})`);
        if (enteredPhone !== phoneOtp) { alert('Incorrect OTP'); return; }
        if (form.email) {
            const emailOtp = Math.floor(1000 + Math.random() * 9000).toString();
            const enteredEmail = prompt(`Enter OTP sent to email (${emailOtp})`);
            if (enteredEmail !== emailOtp) { alert('Incorrect email OTP'); return; }
        }
        onNavigate('success');
    };

    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
                <div style={{ display: 'flex', gap: '30px' }}>
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </header>
            <main className="form-main">
                <div className="form-section">
                    <h3>{t('confirmData', language)}</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><strong>{t('fullName', language)}:</strong> {form.fullName}</li>
                        <li><strong>{t('firstNameEn', language)}:</strong> {form.firstNameEn}</li>
                        <li><strong>{t('middleNameEn', language)}:</strong> {form.middleNameEn}</li>
                        <li><strong>{t('lastNameEn', language)}:</strong> {form.lastNameEn}</li>
                        <li><strong>{t('dateOfBirth', language)}:</strong> {form.dob}</li>
                        <li><strong>{t('gender', language)}:</strong> {form.gender}</li>
                        <li><strong>{t('nationality', language)}:</strong> {form.nationality}</li>
                        {form.nidDigits && (
                            <li><strong>{t('nid', language)}:</strong> {form.nidDigits.join('')}</li>
                        )}
                        {form.residenceExpiry && (
                            <li><strong>{t('residenceExpiry', language)}:</strong> {form.residenceExpiry}</li>
                        )}
                        {form.censusCardNumber && (
                            <li><strong>{t('censusCardNumber', language)}:</strong> {form.censusCardNumber}</li>
                        )}
                        <li><strong>{t('phoneNumber', language)}:</strong> {form.phone}</li>
                        {form.enableEmail && (
                            <li><strong>{t('email', language)}:</strong> {form.email}</li>
                        )}
                    </ul>
                </div>
                <div className="form-actions">
                    <button className="btn-next" onClick={handleConfirm}>{t('confirm', language)}</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ConfirmPage_EN;
