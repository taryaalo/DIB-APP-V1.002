
// --- src/components/arabic/FinancialInfoPage_AR.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';

const FinancialInfoPage_AR = ({ onNavigate, backPage }) => {
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
                        <h3>المعلومات المالية</h3>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="متوسط الدخل الشهري للشركة" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="العملة الأساسية للحساب" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="مصدر الإيرادات الرئيسي" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="الغرض من فتح الحساب" />
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
export default FinancialInfoPage_AR;
