
// --- src/components/english/LegalRepInfoPage_EN.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { CalendarIcon } from '../common/Icons';

const LegalRepInfoPage_EN = ({ onNavigate, backPage, nextPage }) => {
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
                        <h3>Legal Representative Information</h3>
                        <p style={{marginTop: "-15px", marginBottom: "20px"}}>This data is for the person responsible for opening the account in the company's name.</p>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Full Name" />
                        </div>
                        <div className="form-group">
                            <label>National ID</label>
                            <div className="national-id-group">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <input key={index} type="text" maxLength="1" className="national-id-input" />
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Passport Number" />
                        </div>
                        <div className="form-group">
                            <select className="form-input">
                                <option value="">Legal Representative's Capacity</option>
                                <option value="owner">Owner</option>
                                <option value="ceo">CEO</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="phone-input-group">
                               <span className="phone-prefix">+218</span>
                               <input type="tel" className="form-input" placeholder="Mobile Phone Number" />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-input" placeholder="Personal Email" />
                        </div>
                    </div>
                </form>
                <div className="form-actions">
                    <button className="btn-next" onClick={() => onNavigate(nextPage)}>Next</button>
                </div>
            </main>
        </div>
    );
};
export default LegalRepInfoPage_EN;
