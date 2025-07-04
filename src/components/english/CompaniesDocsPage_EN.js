// --- src/components/english/CompaniesDocsPage_EN.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { UploadIcon } from '../common/Icons';

const CompaniesDocsPage_EN = ({ onNavigate, backPage, nextPage }) => {
    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
                 <button onClick={() => onNavigate(backPage)} className="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span>Back</span>
                </button>
            </header>
            <main className="form-main">
                <h2 className="form-title">Required Documents</h2>
                <div className="docs-grid">
                    <div className="upload-box"><p>Bank statement for the last months (if any)</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Tax Card or Certificate</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Commercial Chamber Registration Certificate</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Official authorization for the legal representative</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Copy of the Commercial Register</p><div className="upload-placeholder"><UploadIcon /></div></div>
                    <div className="upload-box"><p>Photos of National ID or Passport for authorized signatories</p><div className="multi-upload-placeholders"><div className="upload-placeholder"><UploadIcon /></div><div className="upload-placeholder"><UploadIcon /></div><div className="upload-placeholder"><UploadIcon /></div></div></div>
                    <div className="upload-box"><p>Recent personal photos for authorized signatories</p><div className="multi-upload-placeholders"><div className="upload-placeholder"><UploadIcon /></div><div className="upload-placeholder"><UploadIcon /></div><div className="upload-placeholder"><UploadIcon /></div></div></div>
                </div>
                <div className="form-actions"><button className="btn-next" onClick={() => onNavigate(nextPage)}>Next</button></div>
            </main>
        </div>
    );
}
export default CompaniesDocsPage_EN;

