
import React, { useState } from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const PersonalInfoPage_EN = ({ onNavigate, backPage }) => {
    const { language } = useLanguage();
    const [form, setForm] = useState({
        fullName: '',
        nameEn: '',
        dob: '',
        gender: '',
        nationality: '',
        nid: '',
        phone: '',
        email: ''
    });

    const [agreements, setAgreements] = useState({ agree1: false, agree2: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('agree')) {
            setAgreements(a => ({ ...a, [name]: checked }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const validateNID = () => {
        if (form.nid.length !== 12) return false;
        if (!form.dob || !form.gender) return false;
        const year = new Date(form.dob).getFullYear() % 100;
        if (parseInt(form.nid.slice(0,2)) !== year) return false;
        const genderDigit = parseInt(form.nid[9]);
        if ((form.gender === 'male' && genderDigit % 2 === 0) || (form.gender === 'female' && genderDigit % 2 !== 0)) return false;
        return true;
    };

    const handleSubmit = () => {
        if (!validateNID()) { alert('Invalid National ID'); return; }
        if (!agreements.agree1 || !agreements.agree2) { alert('You must agree to proceed'); return; }
        const phoneOtp = Math.floor(1000 + Math.random()*9000).toString();
        const enteredPhone = prompt(`Enter OTP sent to phone (${phoneOtp})`);
        if (enteredPhone !== phoneOtp) { alert('Incorrect OTP'); return; }
        if (form.email) {
            const emailOtp = Math.floor(1000 + Math.random()*9000).toString();
            const enteredEmail = prompt(`Enter OTP sent to email (${emailOtp})`);
            if (enteredEmail !== emailOtp) { alert('Incorrect email OTP'); return; }
        }
        onNavigate('success');
    };

    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
                 <button onClick={() => onNavigate(backPage)} className="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span>{t('back', language)}</span>
                </button>
            </header>
            <main className="form-main">
                <form className="form-container" onSubmit={e => {e.preventDefault(); handleSubmit();}}>
                    <div className="form-section">
                        <h3>Personal Information</h3>
                        <div className="form-group"><input name="fullName" value={form.fullName} onChange={handleChange} required type="text" className="form-input" placeholder="Full Name" /></div>
                        <div className="form-group"><input name="nameEn" value={form.nameEn} onChange={handleChange} required type="text" className="form-input" placeholder="Full Name (English)" /></div>
                        <div className="form-group date-input-container"><input name="dob" value={form.dob} required type="text" className="form-input" placeholder="Date of Birth" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} onChange={handleChange}/><CalendarIcon/></div>
                        <div className="form-group"><select name="gender" value={form.gender} onChange={handleChange} required className="form-input"><option value="">Gender</option><option value="male">Male</option><option value="female">Female</option></select></div>
                        <div className="form-group"><select name="nationality" value={form.nationality} onChange={handleChange} className="form-input"><option value="">Nationality</option><option value="libyan">Libyan</option><option value="other">Other</option></select></div>
                        <div className="form-group"><input name="nid" value={form.nid} onChange={handleChange} required type="text" maxLength="12" className="form-input" placeholder="National ID" /></div>
                        <div className="form-group"><input name="phone" value={form.phone} onChange={handleChange} required type="tel" className="form-input" placeholder="Phone Number" /></div>
                        <div className="form-group"><input name="email" value={form.email} onChange={handleChange} type="email" className="form-input" placeholder="Email (optional)" /></div>
                    </div>
                    <div className="form-actions">
                        <div className="agreements">
                            <label className="agreement-item"><div className="custom-checkbox"><input name="agree1" type="checkbox" checked={agreements.agree1} onChange={handleChange} required/><span className="checkmark"></span></div><span>I certify that all data entered is correct.</span></label>
                            <label className="agreement-item"><div className="custom-checkbox"><input name="agree2" type="checkbox" checked={agreements.agree2} onChange={handleChange} required/><span className="checkmark"></span></div><span>I agree to the <a href="#">Terms and Conditions</a>.</span></label>
                        </div>
                        <button className="btn-next" type="submit">{t('submitRequest', language)}</button>
                    </div>
                </form>
            </main>
        </div>
    );
};
export default PersonalInfoPage_EN;

