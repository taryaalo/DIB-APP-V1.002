
import React, { useState, useEffect } from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const WorkInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
    const { language } = useLanguage();
    const { formData, setFormData } = useFormData();
    const [form, setForm] = useState({
        employmentStatus: '',
        jobTitle: '',
        employer: '',
        employerAddress: '',
        employerPhone: '',
        sourceOfIncome: '',
        monthlyIncome: '',
        ...(formData.workInfo || {})
    });

    useEffect(() => {
        const reference = formData.personalInfo?.referenceNumber;
        if (!reference) return;
        async function load() {
            try {
                const resp = await fetch(`${API_BASE_URL}/api/work-info?reference=${encodeURIComponent(reference)}`);
                if (resp.ok) {
                    const data = await resp.json();
                    if (data) {
                        setForm(f => ({ ...f, ...data }));
                        setFormData(d => ({ ...d, workInfo: data }));
                    }
                }
            } catch (e) { console.error(e); }
        }
        load();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async () => {
        setFormData(d => ({ ...d, workInfo: form }));
        const nid = (formData.personalInfo?.nidDigits || []).join('');
        const reference = formData.personalInfo?.referenceNumber;
        try {
            if (nid || reference) {
                await fetch(`${API_BASE_URL}/api/work-info`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        reference,
                        nid,
                        ...form
                    })
                });
            }
        } catch (e) { console.error(e); }
        onNavigate(nextPage);
    };
    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
                <div className="header-switchers">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
                 <button onClick={() => onNavigate(backPage)} className="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span>{t('back', language)}</span>
                </button>
            </header>
            <main className="form-main">
                 <form className="form-container" onSubmit={e => {e.preventDefault(); handleSubmit();}} noValidate>
                    <div className="form-section">
                        <h3>{t('workInfoTitle', language)}</h3>
                        <div className="form-group"><input name="employmentStatus" value={form.employmentStatus} onChange={handleChange} type="text" required className="form-input" placeholder={t('employmentStatus', language)} /></div>
                        <div className="form-group"><select name="jobTitle" value={form.jobTitle} onChange={handleChange} className="form-input" required><option value="">{t('jobTitle', language)}</option><option value="manager">Manager</option><option value="employee">Employee</option><option value="specialist">Specialist</option></select></div>
                        <div className="form-group"><input name="employer" value={form.employer} onChange={handleChange} type="text" required className="form-input" placeholder={t('employer', language)} /></div>
                        <div className="form-group"><input name="employerAddress" value={form.employerAddress} onChange={handleChange} type="text" required className="form-input" placeholder={t('employerAddress', language)} /></div>
                        <div className="form-group"><input name="employerPhone" value={form.employerPhone} onChange={handleChange} type="tel" required className="form-input" placeholder={t('employerPhone', language)} /></div>
                        <div className="form-group"><select name="sourceOfIncome" value={form.sourceOfIncome} onChange={handleChange} className="form-input" required><option value="">{t('sourceOfIncome', language)}</option><option value="salary">Salary</option><option value="business">Freelance</option><option value="investment">Investment</option></select></div>
                        <div className="form-group"><select name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} className="form-input" required><option value="">{t('monthlyIncome', language)}</option><option value="low">Less than 2000</option><option value="medium">2000 - 5000</option><option value="high">More than 5000</option></select></div>
                    </div>
                    <div className="form-actions"><button type="submit" className="btn-next">{t('next', language)}</button></div>
                </form>
            </main>
            <Footer />
        </div>
    );
}
export default WorkInfoPage_EN;

