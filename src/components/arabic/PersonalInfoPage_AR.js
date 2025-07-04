// --- src/components/arabic/PersonalInfoPage_AR.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';

const PersonalInfoPage_AR = ({ onNavigate, backPage }) => {
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
                        <h3>المعلومات الشخصية</h3>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="الاسم الرباعي" />
                        </div>
                        <div className="form-group date-input-container">
                            <input type="text" className="form-input" placeholder="تاريخ الميلاد" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'}/>
                            <CalendarIcon/>
                        </div>
                        <div className="form-group">
                            <select className="form-input">
                                <option value="">الجنس</option>
                                <option value="male">ذكر</option>
                                <option value="female">أنثى</option>
                            </select>
                        </div>
                        <div className="form-group">
                             <select className="form-input">
                                <option value="">الجنسية</option>
                                <option value="libyan">ليبي</option>
                                <option value="other">أخرى</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="national-id-group">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <input key={index} type="text" maxLength="1" className="national-id-input" />
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="رقم قيد العائلة" />
                        </div>
                        <div className="form-group">
                            <select className="form-input">
                                <option value="">نوع الإثبات الشخصي</option>
                                <option value="passport">جواز سفر</option>
                                <option value="id">بطاقة شخصية</option>
                            </select>
                        </div>
                         <div className="form-group">
                            <input type="text" className="form-input" placeholder="رقم الإثبات الشخصي" />
                        </div>
                        <div className="form-group date-input-container">
                            <input type="text" className="form-input" placeholder="تاريخ انتهاء صلاحية الإثبات" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'}/>
                            <CalendarIcon/>
                        </div>
                    </div>
                </form>
                <div className="form-actions">
                    <div className="agreements">
                        <label className="agreement-item">
                            <div className="custom-checkbox">
                                <input type="checkbox" defaultChecked/>
                                <span className="checkmark"></span>
                            </div>
                            <span>أتعهد بأن جميع البيانات المدخلة صحيحة.</span>
                        </label>
                         <label className="agreement-item">
                            <div className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                            </div>
                            <span>أوافق على <a href="#">الشروط والأحكام</a>.</span>
                        </label>
                    </div>
                    <button className="btn-next" onClick={() => onNavigate('success')}>إرسال الطلب</button>
                </div>
            </main>
        </div>
    );
};
export default PersonalInfoPage_AR;
