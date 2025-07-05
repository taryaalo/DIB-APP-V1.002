import React from 'react';
import { LOGO_WHITE } from '../assets/imagePaths';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelectionPage = ({ onNavigate }) => {
    const { setLanguage, language } = useLanguage();
    return (
        <div className="lang-selection-page">
            <div className="lang-selection-box">
                <img src={LOGO_WHITE} alt="Daman Islamic Bank" className="lang-logo" />
                <div className="lang-buttons-container">
                    <button className="lang-btn" onClick={() => {setLanguage('en'); onNavigate('landing');}}>{t('english', language)}</button>
                    <button className="lang-btn" onClick={() => {setLanguage('ar'); onNavigate('landing');}}>{t('arabic', language)}</button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionPage;
