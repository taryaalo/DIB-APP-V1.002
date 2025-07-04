import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { UploadIcon } from '../common/Icons';

const SimpleDocsPage_AR = ({ onNavigate, backPage, nextPage, title }) => {
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
                <h2 className="form-title">{title}</h2>
                <div className="docs-grid">
                    <div className="upload-box">
                        <p>الرقم الوطني المعتمد</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                    <div className="upload-box">
                        <p>صورة جواز السفر</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                    <div className="upload-box">
                        <p>رسالة فتح حساب من جهة العمل</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                    <div className="upload-box">
                        <p>صورة شخصية حديثة</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn-next" onClick={() => onNavigate(nextPage)}>التالي</button>
                </div>
            </main>
        </div>
    );
}

export default SimpleDocsPage_AR;
