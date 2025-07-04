import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';

const WorkInfoPage_AR = ({ onNavigate, backPage, nextPage }) => {
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
                        <h3>معلومات العمل والدخل</h3>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="الحالة الوظيفية" />
                        </div>
                        <div className="form-group">
                             <select className="form-input">
                                <option value="">المسمى الوظيفي</option>
                                <option value="manager">مدير</option>
                                <option value="employee">موظف</option>
                                <option value="specialist">أخصائي</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="جهة العمل" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="عنوان جهة العمل" />
                        </div>
                         <div className="form-group">
                            <input type="tel" className="form-input" placeholder="هاتف جهة العمل" />
                        </div>
                         <div className="form-group">
                             <select className="form-input">
                                <option value="">مصدر الدخل الرئيسي</option>
                                <option value="salary">راتب</option>
                                <option value="business">أعمال حرة</option>
                                <option value="investment">استثمار</option>
                            </select>
                        </div>
                         <div className="form-group">
                             <select className="form-input">
                                <option value="">متوسط الدخل الشهري</option>
                                <option value="low">أقل من 2000</option>
                                <option value="medium">2000 - 5000</option>
                                <option value="high">أكثر من 5000</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div className="form-actions">
                    <button className="btn-next" onClick={() => onNavigate(nextPage)}>التالي</button>
                </div>
            </main>
        </div>
    );
}

export default WorkInfoPage_AR;
