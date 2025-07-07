import React, { useEffect, useState } from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';
import jsPDF from 'jspdf';
import arabicFont from '../assets/NotoSansArabic-Regular.ttf';

const ConfirmPage_EN = ({ onNavigate, state }) => {
    const { language } = useLanguage();
    const { formData } = useFormData();
    const initialForm = state?.form || formData.personalInfo || {};
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        async function cacheAndLoad() {
            try {
                await fetch('/api/cache-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(initialForm)
                });
                const resp = await fetch('/api/cache-form');
                if (resp.ok) {
                    const data = await resp.json();
                    setForm(data);
                }
            } catch (e) {
                console.error(e);
            }
        }
        cacheAndLoad();
    }, []);

    const handleConfirm = () => {
        onNavigate('success');
    };

    const handleExport = async () => {
        const doc = new jsPDF();
        const fontResp = await fetch(arabicFont);
        const fontData = await fontResp.arrayBuffer();
        const fontBase64 = btoa(String.fromCharCode(...new Uint8Array(fontData)));
        doc.addFileToVFS('NotoSansArabic.ttf', fontBase64);
        doc.addFont('NotoSansArabic.ttf', 'NotoSansArabic', 'normal');
        doc.setFont('NotoSansArabic');
        doc.text('Account Confirmation', 10, 10, { lang: 'ar' });
        let y = 20;
        Object.entries(form).forEach(([k, v]) => {
            if (!v) return;
            const value = Array.isArray(v) ? v.join('') : v;
            doc.text(`${k}: ${value}`, 10, y, { lang: 'ar' });
            y += 10;
        });
        doc.save('confirmation.pdf');
    };

    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
                <div className="header-switchers">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </header>
            <main className="form-main">
                <div className="confirmation-document">
                    <div className="confirmation-header">{t('confirmData', language)}</div>
                    <ul className="confirmation-list">
                        <li><strong>{t('fullName', language)}:</strong> {form.fullName}</li>
                        <li><strong>{t('firstNameEn', language)}:</strong> {form.firstNameEn}</li>
                        <li><strong>{t('middleNameEn', language)}:</strong> {form.middleNameEn}</li>
                        <li><strong>{t('lastNameEn', language)}:</strong> {form.lastNameEn}</li>
                        <li><strong>{t('dateOfBirth', language)}:</strong> {form.dob}</li>
                        <li><strong>{t('gender', language)}:</strong> {form.gender}</li>
                        <li><strong>{t('nationality', language)}:</strong> {form.nationality}</li>
                        <li><strong>{t('passportNumber', language)}:</strong> {form.passportNumber}</li>
                        <li><strong>{t('passportIssueDate', language)}:</strong> {form.passportIssueDate}</li>
                        <li><strong>{t('passportExpiryDate', language)}:</strong> {form.passportExpiryDate}</li>
                        <li><strong>{t('birthPlace', language)}:</strong> {form.birthPlace}</li>
                        {form.documentType && (
                            <li><strong>{t('documentType', language)}:</strong> {form.documentType}</li>
                        )}
                        {form.familyRecordNumber && (
                            <li><strong>{t('familyRecordNumber', language)}:</strong> {form.familyRecordNumber}</li>
                        )}
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
                    <button className="btn-back" onClick={handleExport} style={{marginRight:'10px'}}>{t('exportPdf', language)}</button>
                    <button className="btn-next" onClick={handleConfirm}>{t('confirm', language)}</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ConfirmPage_EN;
