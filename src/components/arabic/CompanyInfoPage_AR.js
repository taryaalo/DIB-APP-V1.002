
// --- src/components/arabic/CompanyInfoPage_AR.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';

const CompanyInfoPage_AR = ({ onNavigate, backPage, nextPage }) => {
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
                        <h3>معلومات الشركة الأساسية</h3>
                        <div className="company-form-grid">
                            <div className="form-group"><input type="text" className="form-input" placeholder="اسم الشركة بالكامل" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="الدولة" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="الاسم التجاري" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="المدينة" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="رقم السجل التجاري" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="عنوان المكتب الرئيسي" /></div>
                            <div className="form-group"><input type="text" className="form-input" placeholder="رقم رخصة مزاولة النشاط" /></div>
                             <div className="form-group"><input type="text" className="form-input" placeholder="الرمز البريدي" /></div>
                            <div className="form-group date-input-container"><input type="text" className="form-input" placeholder="تاريخ تسجيل الشركة" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'}/><CalendarIcon/></div>
                             <div className="form-group"></div>
                             <div className="form-group"><select className="form-input"><option value="">نوع الشركة</option><option value="limited">ذات مسؤولية محدودة</option><option value="joint">مساهمة</option></select></div>
                             <div className="form-group"></div>
                             <div className="form-group"><select className="form-input"><option value="">النشاط التجاري</option><option value="trade">تجارة</option><option value="services">خدمات</option><option value="industry">صناعة</option></select></div>
                        </div>
                    </div>
                </form>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>التالي</button></div>
            </main>
        </div>
    );
};
export default CompanyInfoPage_AR;

