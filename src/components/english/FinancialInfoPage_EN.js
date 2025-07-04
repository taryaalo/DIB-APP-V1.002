
// --- src/components/english/FinancialInfoPage_EN.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';

const FinancialInfoPage_EN = ({ onNavigate, backPage }) => {
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
                <form className="form-container">
                    <div className="form-section">
                        <h3>Financial Information</h3>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Average Monthly Income for the Company" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Primary Account Currency" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Main Source of Revenue" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Purpose of Opening the Account" />
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
                            <span>I certify that all data entered is correct.</span>
                        </label>
                         <label className="agreement-item">
                            <div className="custom-checkbox">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                            </div>
                            <span>I agree to the <a href="#">Terms and Conditions</a>.</span>
                        </label>
                    </div>
                    <button className="btn-next" onClick={() => onNavigate('success')}>Submit Request</button>
                </div>
            </main>
        </div>
    );
};
export default FinancialInfoPage_EN;
