import React from 'react';
import { SuccessIcon } from '../common/Icons';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const SuccessPage_EN = ({ onNavigate }) => {
    const { language } = useLanguage();
    return (
        <div className="success-page">
            <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '30px' }}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
            <SuccessIcon />
            <h1 className="success-title">{t('successTitle', language)}</h1>
            <p className="success-message">{t('successMsg', language)}</p>
            <button className="btn-next" onClick={() => onNavigate('languageSelection')}>{t('backToHome', language)}</button>
            <Footer />
        </div>
    );
};

export default SuccessPage_EN;
