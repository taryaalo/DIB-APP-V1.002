import React, { useEffect, useState } from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';
import jsPDF from 'jspdf';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const ConfirmPage_EN = ({ onNavigate, state }) => {
    const { language } = useLanguage();
    const { formData } = useFormData();
    const initialForm = state?.form || {
        ...(formData.personalInfo || {}),
        addressInfo: formData.addressInfo || {},
        workInfo: formData.workInfo || {},
        serviceType: formData.serviceType || ''
    };
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

    const handleConfirm = async () => {
        try {
            const resp = await fetch(`${API_BASE_URL}/api/submit-form`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, aiModel: formData.provider })
            });
            if (resp.ok) {
                const data = await resp.json();
                onNavigate('success', { referenceNumber: data.referenceNumber, createdAt: data.createdAt, aiModel: formData.provider });
            } else {
                onNavigate('success', { referenceNumber: null });
            }
        } catch (e) {
            console.error(e);
            onNavigate('success', { referenceNumber: null });
        }
    };

    const handleExport = async () => {
        const doc = new jsPDF();
        // Using the built-in Helvetica font avoids issues with missing
        // font metrics in some environments.
        doc.setFont('helvetica');
        doc.setFontSize(18);
        doc.text(t('confirmData', language), 105, 20, { align: 'center', lang: 'ar' });

        const ref = form.referenceNumber || 'N/A';
        doc.setDrawColor(0, 150, 0);
        doc.setFillColor(200, 255, 200);
        doc.roundedRect(40, 30, 130, 15, 3, 3, 'FD');
        doc.setTextColor(0, 0, 0);
        doc.text(`${t('referenceLabel', language)}: ${ref}`, 45, 40, { lang: 'ar' });

        doc.setFontSize(12);
        let y = 55;
        Object.entries(form).forEach(([k, v]) => {
            if (!v || typeof v === 'object') return;
            const value = Array.isArray(v) ? v.join('') : v;
            doc.text(`${k}: ${value}`, 10, y, { lang: 'ar' });
            y += 8;
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
                        {form.addressInfo && (
                            <>
                                <li><strong>{t('country', language)}:</strong> {form.addressInfo.country}</li>
                                <li><strong>{t('city', language)}:</strong> {form.addressInfo.city}</li>
                                <li><strong>{t('area', language)}:</strong> {form.addressInfo.area}</li>
                                <li><strong>{t('residentialAddress', language)}:</strong> {form.addressInfo.residentialAddress}</li>
                            </>
                        )}
                        {form.workInfo && (
                            <>
                                <li><strong>{t('employmentStatus', language)}:</strong> {form.workInfo.employmentStatus}</li>
                                <li><strong>{t('jobTitle', language)}:</strong> {form.workInfo.jobTitle}</li>
                                <li><strong>{t('employer', language)}:</strong> {form.workInfo.employer}</li>
                                <li><strong>{t('employerAddress', language)}:</strong> {form.workInfo.employerAddress}</li>
                                <li><strong>{t('employerPhone', language)}:</strong> {form.workInfo.employerPhone}</li>
                                <li><strong>{t('sourceOfIncome', language)}:</strong> {form.workInfo.sourceOfIncome}</li>
                                <li><strong>{t('monthlyIncome', language)}:</strong> {form.workInfo.monthlyIncome}</li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="form-actions">
                    <button className="btn-export" onClick={handleExport} style={{marginRight:'10px'}}>{t('exportPdf', language)}</button>
                    <button className="btn-next" onClick={handleConfirm}>{t('confirm', language)}</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ConfirmPage_EN;
