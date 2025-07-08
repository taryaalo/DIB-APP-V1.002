import React from 'react';
import { SuccessIcon } from '../common/Icons';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const SuccessPage_EN = ({ onNavigate, state }) => {
    const { language } = useLanguage();
    const reference = state?.referenceNumber;
    return (
        <div className="success-page">
            <div className="header-switchers" style={{ position: 'absolute', top: 20, right: 20 }}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
            <SuccessIcon />
            <h1 className="success-title">{t('successTitle', language)}</h1>
            <p className="success-message">{t('successMsg', language)}</p>
            {reference && (
                <p className="reference-number">{t('referenceLabel', language)}: {reference}</p>
            )}
            <button className="btn-next" onClick={() => onNavigate('languageSelection')}>{t('backToHome', language)}</button>
            <Footer />
        </div>
    );
};

export default SuccessPage_EN;
