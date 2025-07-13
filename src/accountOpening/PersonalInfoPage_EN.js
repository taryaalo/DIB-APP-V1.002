
import React, { useState, useEffect } from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { CalendarIcon, LockIcon } from '../common/Icons';
import { logToServer } from '../utils/logger';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';
import { getCachedExtracted } from '../utils/dataCacher';
import { normalizeNationality } from '../utils/normalizeNationality';
import { mapExtractedFields } from '../utils/fieldMapper';

const PersonalInfoPage_EN = ({ onNavigate, backPage, flow, state }) => {
    const { language } = useLanguage();
    const { formData, setFormData } = useFormData();
    const [form, setForm] = useState({
        ...{
            fullName: '',
            firstNameEn: '',
            middleNameEn: '',
            lastNameEn: '',
            passportNumber: '',
            passportIssueDate: '',
            passportExpiryDate: '',
            birthPlace: '',
            dob: '',
            gender: '',
            nationality: '',
            familyRecordNumber: '',
            nidDigits: Array(12).fill(''),
            phone: '',
            enableEmail: false,
            email: '',
            residenceExpiry: '',
            censusCardNumber: '',
            documentType: ''
        },
        ...(formData.personalInfo || {}),
        ...(state?.form || {})
    });
    const [locked, setLocked] = useState(() => {
        const obj = {};
        Object.entries(form).forEach(([k, v]) => {
            if (typeof v !== 'object' && v) obj[k] = true;
        });
        return obj;
    });
    const [manualFields, setManualFields] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (formData.personalInfo) {
            setForm(f => ({ ...f, ...formData.personalInfo }));
        }
    }, [formData.personalInfo]);

    useEffect(() => {
        async function loadExtracted() {
            setLoading(true);
            setError('');
            try {
                const passportRaw = await getCachedExtracted('passport');
                const nidRaw = await getCachedExtracted('nationalId');
                const passportResp = mapExtractedFields('passport', passportRaw || {});
                const nidResp = mapExtractedFields('nationalId', nidRaw || {});
                let updated = { ...(formData.personalInfo || form) };
                if (passportResp && Object.keys(passportResp).length) {
                    const names = (passportResp.givenNameEng || '').trim().split(/\s+/);
                    const firstName = names[0] || '';
                    const middleName = names.slice(1).join(' ');
                    const genderVal = passportResp.sex === 'M' ? 'male' : passportResp.sex === 'F' ? 'female' : (passportResp.sex || '');
                    updated = {
                        ...updated,
                        fullName: passportResp.fullNameArabic || updated.fullName,
                        firstNameEn: firstName || updated.firstNameEn,
                        middleNameEn: middleName || updated.middleNameEn,
                        lastNameEn: passportResp.surnameEng || updated.lastNameEn,
                        dob: passportResp.dateOfBirth || updated.dob,
                        gender: genderVal || updated.gender,
                        nationality: normalizeNationality(passportResp.nationality) || updated.nationality,
                        passportNumber: passportResp.passportNo || updated.passportNumber,
                        passportIssueDate: passportResp.dateOfIssue || updated.passportIssueDate,
                        passportExpiryDate: passportResp.expiryDate || updated.passportExpiryDate,
                        birthPlace: passportResp.placeOfBirth || updated.birthPlace,
                    };
                }
                if (nidResp && Object.keys(nidResp).length) {
                    const nidDigits = nidResp.nationalId ? nidResp.nationalId.replace(/\D/g, '').slice(0, 12).split('') : [];
                    const genderVal = nidResp.sex === 'M' ? 'male' : nidResp.sex === 'F' ? 'female' : (nidResp.sex || '');
                    const dob = nidResp.birthYear && nidResp.birthMonth && nidResp.birthDay
                        ? `${nidResp.birthYear}-${nidResp.birthMonth.toString().padStart(2,'0')}-${nidResp.birthDay.toString().padStart(2,'0')}`
                        : updated.dob;
                    updated = {
                        ...updated,
                        familyRecordNumber: nidResp.familyId || updated.familyRecordNumber,
                        nidDigits: nidDigits.length ? nidDigits : updated.nidDigits,
                        gender: updated.gender || genderVal,
                        dob: updated.dob || dob,
                    };
                }
                setForm(updated);
                setFormData(d => ({ ...d, personalInfo: updated }));
            } catch (e) {
                console.error(e);
                setError(t('error_extracting_data', language));
            } finally {
                setLoading(false);
            }
        }
        loadExtracted();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [agreements, setAgreements] = useState({ agree1: false, agree2: false });
    const [agreeError, setAgreeError] = useState(false);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        if (locked[name]) return;
        if (name.startsWith('agree')) {
            setAgreements(a => ({ ...a, [name]: checked }));
        } else if (name === 'enableEmail') {
            setForm(f => ({ ...f, enableEmail: checked }));
        } else if (name.startsWith('nidDigit')) {
            const digits = [...form.nidDigits];
            digits[index] = value.replace(/[^0-9]/g, '').slice(-1);
            setForm(f => ({ ...f, nidDigits: digits }));
            if (value && e.target.nextSibling) e.target.nextSibling.focus();
        } else if (name === 'fullName') {
            const arabic = value.replace(/[^\u0600-\u06FF\s]/g, '');
            setForm(f => ({ ...f, fullName: arabic }));
        } else if (['firstNameEn', 'middleNameEn', 'lastNameEn'].includes(name)) {
            const eng = value.replace(/[^A-Za-z\s]/g, '');
            setForm(f => ({ ...f, [name]: eng }));
        } else if (name === 'phone') {
            const digits = value.replace(/[^0-9+]/g, '');
            setForm(f => ({ ...f, phone: digits }));
        } else if (name === 'familyRecordNumber') {
            const digits = value.replace(/[^0-9]/g, '');
            setForm(f => ({ ...f, familyRecordNumber: digits }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const handleNIDKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    const handleNIDPaste = (e, index) => {
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, form.nidDigits.length - index);
        if (!paste) return;
        e.preventDefault();
        const digits = [...form.nidDigits];
        for (let i = 0; i < paste.length; i++) {
            digits[index + i] = paste[i];
        }
        setForm(f => ({ ...f, nidDigits: digits }));
        const inputs = e.target.parentElement.querySelectorAll('input');
        const next = index + paste.length;
        if (inputs[next]) inputs[next].focus();
    };

    const unlockField = (name) => {
        setLocked(l => ({ ...l, [name]: false }));
        if (!manualFields.includes(name)) setManualFields(f => [...f, name]);
        logToServer(`manual_edit_${name}`);
    };
    const lockProps = (name) => ({
        readOnly: !!locked[name],
        className: `form-input${locked[name] ? ' locked' : ''}`,
        onDoubleClick: () => unlockField(name)
    });


    const handleSubmit = () => {
        if (!agreements.agree1 || !agreements.agree2) {
            setAgreeError(true);
            return;
        }
        setAgreeError(false);
        setFormData(data => ({ ...data, personalInfo: form }));
        onNavigate('confirm', { form, manualFields });
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
                {loading && (
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'20px'}}>
                        <div className="loading-spinner"></div>
                        <p style={{marginTop:'20px'}}>{t('extracting_data', language)}</p>
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
                <form className="form-container" onSubmit={e => {e.preventDefault(); handleSubmit();}} noValidate>
                    <div className="form-section">
                        <h3>{t('personalInfo', language)}</h3>
                        <p className="guide-message">{t('editHint', language)}</p>
                        <div className="form-group"><input name="fullName" value={form.fullName} onChange={handleChange} required type="text" {...lockProps('fullName')} placeholder={t('fullName', language)} /><LockIcon className="lock-icon" /></div>
                        <div className="form-group"><input name="firstNameEn" value={form.firstNameEn} onChange={handleChange} required type="text" {...lockProps('firstNameEn')} placeholder={t('firstNameEn', language)} /><LockIcon className="lock-icon" /></div>
                        <div className="form-group"><input name="middleNameEn" value={form.middleNameEn} onChange={handleChange} required type="text" {...lockProps('middleNameEn')} placeholder={t('middleNameEn', language)} /><LockIcon className="lock-icon" /></div>
                        <div className="form-group"><input name="lastNameEn" value={form.lastNameEn} onChange={handleChange} required type="text" {...lockProps('lastNameEn')} placeholder={t('lastNameEn', language)} /><LockIcon className="lock-icon" /></div>
                        <div className="form-group date-input-container"><input name="dob" value={form.dob} required type="text" {...lockProps('dob')} placeholder={t('dateOfBirth', language)} onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} onChange={handleChange}/><CalendarIcon/></div>
                        <div className="form-group" style={{position:'relative'}}>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                required
                                disabled={locked.gender}
                                className={`form-input${locked.gender ? ' locked' : ''}`}
                            >
                                <option value="">{t('gender', language)}</option>
                                <option value="male">{t('male', language)}</option>
                                <option value="female">{t('female', language)}</option>
                            </select>
                            {locked.gender && <div className="locked-overlay" onDoubleClick={() => setLocked(l => ({...l, gender: false}))}></div>}
                            <LockIcon className="lock-icon" />
                        </div>
                        <div className="form-group" style={{position:'relative'}}>
                            <select
                                name="nationality"
                                value={form.nationality}
                                onChange={handleChange}
                                className={`form-input${locked.nationality ? ' locked' : ''}`}
                                disabled={locked.nationality}
                            >
                                <option value="">{t('nationality', language)}</option>
                                <option value="libyan">{t('libyan', language)}</option>
                                <option value="other">{t('other', language)}</option>
                            </select>
                            {locked.nationality && <div className="locked-overlay" onDoubleClick={() => setLocked(l => ({...l, nationality: false}))}></div>}
                            <LockIcon className="lock-icon" />
                        </div>
                        <div className="form-group"><input name="passportNumber" value={form.passportNumber} onChange={handleChange} type="text" {...lockProps('passportNumber')} placeholder={t('passportNumber', language)} /><LockIcon className="lock-icon" /></div>
                        <div className="form-group date-input-container"><input name="passportIssueDate" value={form.passportIssueDate} onChange={handleChange} type="text" {...lockProps('passportIssueDate')} placeholder={t('passportIssueDate', language)} onFocus={e=>e.target.type='date'} onBlur={e=>e.target.type='text'} /><CalendarIcon/></div>
                        <div className="form-group date-input-container"><input name="passportExpiryDate" value={form.passportExpiryDate} onChange={handleChange} type="text" {...lockProps('passportExpiryDate')} placeholder={t('passportExpiryDate', language)} onFocus={e=>e.target.type='date'} onBlur={e=>e.target.type='text'} /><CalendarIcon/></div>
                        <div className="form-group"><input name="birthPlace" value={form.birthPlace} onChange={handleChange} type="text" {...lockProps('birthPlace')} placeholder={t('birthPlace', language)} /><LockIcon className="lock-icon" /></div>
                        <div className="form-group"><input name="familyRecordNumber" value={form.familyRecordNumber} onChange={handleChange} required type="text" {...lockProps('familyRecordNumber')} placeholder={t('familyRecordNumber', language)} /><LockIcon className="lock-icon" /></div>
                        {flow !== 'expat' && (
                            <div className="form-group national-id-group">
                                {form.nidDigits.map((d, idx) => (
                                    <input
                                        key={idx}
                                        name={`nidDigit${idx}`}
                                        value={d}
                                        onChange={(e)=>handleChange(e, idx)}
                                        onKeyDown={(e)=>handleNIDKeyDown(e, idx)}
                                        onPaste={(e)=>handleNIDPaste(e, idx)}
                                        required
                                        type="text"
                                        maxLength="1"
                                        className="national-id-input"
                                    />
                                ))}
                            </div>
                        )}
                        {flow === 'expat' && (
                            <>
                                <div className="form-group date-input-container"><input name="residenceExpiry" value={form.residenceExpiry} onChange={handleChange} required type="text" {...lockProps('residenceExpiry')} placeholder={t('residenceExpiry', language)} onFocus={e=>e.target.type='date'} onBlur={e=>e.target.type='text'} /><CalendarIcon/></div>
                                <div className="form-group"><input name="censusCardNumber" value={form.censusCardNumber} onChange={handleChange} required type="text" {...lockProps('censusCardNumber')} placeholder={t('censusCardNumber', language)} /><LockIcon className="lock-icon" /></div>
                            </>
                        )}
                        <div className="form-group"><input name="phone" value={form.phone} onChange={handleChange} required type="tel" {...lockProps('phone')} placeholder={t('phoneNumber', language)} /><LockIcon className="lock-icon" /></div>
                        <div className="form-group"><label><input type="checkbox" name="enableEmail" checked={form.enableEmail} onChange={handleChange} /> {t('enableEmail', language)}</label></div>
                        {form.enableEmail && (
                            <div className="form-group">
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    type="email"
                                    {...lockProps('email')}
                                    placeholder={t('email', language)}
                                />
                                <LockIcon className="lock-icon" />
                            </div>
                        )}
                    </div>
                    <div className="form-actions">
                        <div className="agreements">
                            <label className="agreement-item"><div className="custom-checkbox"><input name="agree1" type="checkbox" checked={agreements.agree1} onChange={handleChange} required/><span className="checkmark"></span></div><span>{t('certifyCorrect', language)}</span></label>
                            <label className="agreement-item"><div className="custom-checkbox"><input name="agree2" type="checkbox" checked={agreements.agree2} onChange={handleChange} required/><span className="checkmark"></span></div><span>{t('agreeTerms', language)}</span></label>
                        </div>
                        {agreeError && <p className="error-message">{t('agreeError', language)}</p>}
                        <button className="btn-next" type="submit" disabled={!agreements.agree1 || !agreements.agree2}>{t('submitRequest', language)}</button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};
export default PersonalInfoPage_EN;

