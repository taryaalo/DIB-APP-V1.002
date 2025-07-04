import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';

const ContactInfoPage_AR = ({ onNavigate, backPage, nextPage }) => {
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
                        <h3>معلومات العنوان</h3>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="الدولة" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="المدينة" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="المنطقة" />
                        </div>
                    </div>
                    
                    <div className="form-section">
                        <h3>معلومات الإتصال</h3>
                         <div className="form-group">
                            <div className="phone-input-group">
                               <input type="tel" className="form-input" placeholder="رقم الهاتف" />
                               <span className="phone-prefix">+218</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-input" placeholder="البريد الإلكتروني" />
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

export default ContactInfoPage_AR;
