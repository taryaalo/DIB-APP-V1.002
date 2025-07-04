
import React, { useState } from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const PersonalInfoPage_EN = ({ onNavigate, backPage, flow }) => {
    const { language } = useLanguage();
    const [form, setForm] = useState({
        fullName: '',
        firstNameEn: '',
        middleNameEn: '',
        lastNameEn: '',
        dob: '',
        gender: '',
        nationality: '',
        nidDigits: Array(12).fill(''),
        phone: '',
        enableEmail: false,
        email: '',
        residenceExpiry: '',
        censusCardNumber: ''
    });

    const [agreements, setAgreements] = useState({ agree1: false, agree2: false });

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('agree')) {
            setAgreements(a => ({ ...a, [name]: checked }));
        } else if (name === 'enableEmail') {
            setForm(f => ({ ...f, enableEmail: checked }));
        } else if (name.startsWith('nidDigit')) {
            const digits = [...form.nidDigits];
            digits[index] = value.replace(/[^0-9]/g, '').slice(-1);
            setForm(f => ({ ...f, nidDigits: digits }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const validateNID = () => {
        const nid = form.nidDigits.join('');
        if (flow === 'expat') return true;
        if (nid.length !== 12) return false;
        const genderDigit = nid[0];
        if (genderDigit === "1" && form.gender !== "male") return false;
        if (genderDigit === "2" && form.gender !== "female") return false;
        const year = parseInt(nid.slice(1,5));
        if (isNaN(year)) return false;
        const age = new Date().getFullYear() - year;
        if (age < 18 || age > 120) return false;
        if (form.dob && new Date(form.dob).getFullYear() !== year) return false;
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
                <form className="form-container" onSubmit={e => {e.preventDefault(); handleSubmit();}}>
                    <div className="form-section">
                        <h3>{t('personalInfo', language)}</h3>
                        <div className="form-group"><input name="fullName" value={form.fullName} onChange={handleChange} required type="text" className="form-input" placeholder={t('fullName', language)} /></div>
                        <div className="form-group"><input name="firstNameEn" value={form.firstNameEn} onChange={handleChange} required type="text" className="form-input" placeholder={t('firstNameEn', language)} /></div>
                        <div className="form-group"><input name="middleNameEn" value={form.middleNameEn} onChange={handleChange} required type="text" className="form-input" placeholder={t('middleNameEn', language)} /></div>
                        <div className="form-group"><input name="lastNameEn" value={form.lastNameEn} onChange={handleChange} required type="text" className="form-input" placeholder={t('lastNameEn', language)} /></div>
                        <div className="form-group date-input-container"><input name="dob" value={form.dob} required type="text" className="form-input" placeholder={t('dateOfBirth', language)} onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} onChange={handleChange}/><CalendarIcon/></div>
                        <div className="form-group"><select name="gender" value={form.gender} onChange={handleChange} required className="form-input"><option value="">{t('gender', language)}</option><option value="male">{t('male', language)}</option><option value="female">{t('female', language)}</option></select></div>
                        <div className="form-group"><select name="nationality" value={form.nationality} onChange={handleChange} className="form-input"><option value="">{t('nationality', language)}</option><option value="libyan">{t('libyan', language)}</option><option value="other">{t('other', language)}</option></select></div>
                        {flow !== 'expat' && (
                            <div className="form-group" style={{display:'flex', gap:'5px'}}>
                                {form.nidDigits.map((d, idx) => (
                                    <input key={idx} name={`nidDigit${idx}`} value={d} onChange={(e)=>handleChange(e, idx)} required type="text" maxLength="1" className="form-input" style={{width:'30px', textAlign:'center'}} />
                                ))}
                            </div>
                        )}
                        {flow === 'expat' && (
                            <>
                                <div className="form-group date-input-container"><input name="residenceExpiry" value={form.residenceExpiry} onChange={handleChange} required type="text" className="form-input" placeholder={t('residenceExpiry', language)} onFocus={e=>e.target.type='date'} onBlur={e=>e.target.type='text'} /><CalendarIcon/></div>
                                <div className="form-group"><input name="censusCardNumber" value={form.censusCardNumber} onChange={handleChange} required type="text" className="form-input" placeholder={t('censusCardNumber', language)} /></div>
                            </>
                        )}
                        <div className="form-group"><input name="phone" value={form.phone} onChange={handleChange} required type="tel" className="form-input" placeholder={t('phoneNumber', language)} /></div>
                        <div className="form-group"><label><input type="checkbox" name="enableEmail" checked={form.enableEmail} onChange={handleChange} /> {t('enableEmail', language)}</label></div>
                        {form.enableEmail && <div className="form-group"><input name="email" value={form.email} onChange={handleChange} required type="email" className="form-input" placeholder={t('email', language)} /></div>}
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
            <Footer />
        </div>
    );
};
export default PersonalInfoPage_EN;

