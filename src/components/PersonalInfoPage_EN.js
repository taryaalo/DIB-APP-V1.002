
import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { CalendarIcon } from './common/Icons';

const PersonalInfoPage_EN = ({ onNavigate, backPage }) => {
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
                        <h3>Personal Information</h3>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Full Name" /></div>
                        <div className="form-group date-input-container"><input type="text" className="form-input" placeholder="Date of Birth" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'}/><CalendarIcon/></div>
                        <div className="form-group"><select className="form-input"><option value="">Gender</option><option value="male">Male</option><option value="female">Female</option></select></div>
                        <div className="form-group"><select className="form-input"><option value="">Nationality</option><option value="libyan">Libyan</option><option value="other">Other</option></select></div>
                        <div className="form-group"><div className="national-id-group">{Array.from({ length: 12 }).map((_, index) => (<input key={index} type="text" maxLength="1" className="national-id-input" />))}</div></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="Family Record Number" /></div>
                        <div className="form-group"><select className="form-input"><option value="">ID Type</option><option value="passport">Passport</option><option value="id">National ID</option></select></div>
                        <div className="form-group"><input type="text" className="form-input" placeholder="ID Number" /></div>
                        <div className="form-group date-input-container"><input type="text" className="form-input" placeholder="ID Expiry Date" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'}/><CalendarIcon/></div>
                    </div>
                </form>
                <div className="form-actions">
                    <div className="agreements">
                        <label className="agreement-item"><div className="custom-checkbox"><input type="checkbox" defaultChecked/><span className="checkmark"></span></div><span>I certify that all data entered is correct.</span></label>
                        <label className="agreement-item"><div className="custom-checkbox"><input type="checkbox" /><span className="checkmark"></span></div><span>I agree to the <a href="#">Terms and Conditions</a>.</span></label>
                    </div>
                    <button className="btn-next" onClick={() => onNavigate('success')}>Submit Request</button>
                </div>
            </main>
        </div>
    );
};
export default PersonalInfoPage_EN;

