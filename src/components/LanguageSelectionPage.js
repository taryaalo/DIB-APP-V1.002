import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';

const LanguageSelectionPage = ({ onNavigate }) => {
    return (
        <div className="lang-selection-page">
            <div className="lang-selection-box">
                <img src={LOGO_WHITE} alt="Daman Islamic Bank" className="lang-logo" />
                <div className="lang-buttons-container">
                    <button className="lang-btn" onClick={() => onNavigate('landing', 'ar')}>اللغة العربية</button>
                    <button className="lang-btn" onClick={() => onNavigate('landing', 'en')}>English</button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionPage;
