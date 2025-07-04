import React from 'react';
import { SuccessIcon } from './common/Icons';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const SuccessPage_EN = ({ onNavigate }) => {
    const { lang } = useLanguage();
    return (
        <div className="success-page">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LanguageSwitcher />
            </div>
            <SuccessIcon />
            <h1 className="success-title">Success!</h1>
            <p className="success-message">Your request has been submitted successfully. We will contact you shortly.</p>
            <button className="btn-next" onClick={() => onNavigate('languageSelection')}>{t('back', lang)}</button>
        </div>
    );
};

export default SuccessPage_EN;
