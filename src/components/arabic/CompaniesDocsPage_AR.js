import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { UploadIcon } from '../common/Icons';

const CompaniesDocsPage_AR = ({ onNavigate, backPage, nextPage }) => {
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
                <h2 className="form-title">المستندات المطلوبة</h2>
                <div className="docs-grid">
                    <div className="upload-box">
                        <p>كشف حساب مصرفي لآخر أشهر (إن وجد)</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                    <div className="upload-box">
                        <p>البطاقة أو الشهادة الضريبية</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                    <div className="upload-box">
                        <p>شهادة القيد بالغرفة التجارية</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                    <div className="upload-box">
                        <p>تفويض رسمي للممثل القانوني</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                     <div className="upload-box">
                        <p>نسخة من السجل التجاري</p>
                        <div className="upload-placeholder"><UploadIcon /></div>
                    </div>
                    <div className="upload-box">
                        <p>صور من الرقم الوطني أو جواز السفر للمخولين بالتوقيع</p>
                        <div className="multi-upload-placeholders">
                            <div className="upload-placeholder"><UploadIcon /></div>
                            <div className="upload-placeholder"><UploadIcon /></div>
                            <div className="upload-placeholder"><UploadIcon /></div>
                        </div>
                    </div>
                    <div className="upload-box">
                        <p>صور شخصية حديثة للمخولين بالتوقيع</p>
                         <div className="multi-upload-placeholders">
                            <div className="upload-placeholder"><UploadIcon /></div>
                            <div className="upload-placeholder"><UploadIcon /></div>
                            <div className="upload-placeholder"><UploadIcon /></div>
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn-next" onClick={() => onNavigate(nextPage)}>التالي</button>
                </div>
            </main>
        </div>
    );
}

export default CompaniesDocsPage_AR;
