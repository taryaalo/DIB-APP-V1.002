// --- src/components/arabic/LegalRepInfoPage_AR.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';

const LegalRepInfoPage_AR = ({ onNavigate, backPage, nextPage }) => {
    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="شعار المصرف" className="logo" />
                 <button onClick={() => onNavigate(backPage)} className="btn-back">
                    <span>العودة</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </header>
            <main className="form-main">
                <form className="form-container">
                    <div className="form-section">
                        <h3>معلومات الممثل القانوني</h3>
                        <p style={{marginTop: "-15px", marginBottom: "20px"}}>هذه البيانات خاصة بالشخص المسؤول عن فتح الحساب باسم الشركة</p>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="الاسم الكامل" />
                        </div>
                        <div className="form-group">
                            <label>الرقم الوطني</label>
                            <div className="national-id-group">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <input key={index} type="text" maxLength="1" className="national-id-input" />
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="رقم جواز السفر" />
                        </div>
                        <div className="form-group">
                            <select className="form-input">
                                <option value="">صفة الممثل القانوني</option>
                                <option value="owner">مالك</option>
                                <option value="ceo">مدير تنفيذي</option>
                                <option value="manager">مدير</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="phone-input-group">
                               <input type="tel" className="form-input" placeholder="رقم الهاتف المحمول" />
                               <span className="phone-prefix">+218</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-input" placeholder="البريد الإلكتروني الشخصي" />
                        </div>
                    </div>
                </form>
                <div className="form-actions">
                    <button className="btn-next" onClick={() => onNavigate(nextPage)}>التالي</button>
                </div>
            </main>
        </div>
    );
};
export default LegalRepInfoPage_AR;
