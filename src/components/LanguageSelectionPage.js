import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelectionPage = ({ onNavigate }) => {
    const { setLang } = useLanguage();
    return (
        <div className="lang-selection-page">
            <div className="lang-selection-box">
                <img src={LOGO_WHITE} alt="Daman Islamic Bank" className="lang-logo" />
                <div className="lang-buttons-container">
                    <button className="lang-btn" onClick={() => { setLang('en'); onNavigate('landing'); }}>English</button>
                    <button className="lang-btn" onClick={() => { setLang('ar'); onNavigate('landing'); }}>العربية</button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionPage;
