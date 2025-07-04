
// --- src/components/arabic/SuccessPage_AR.js ---
import React from 'react';
import { SuccessIcon } from '../common/Icons';

const SuccessPage_AR = ({ onNavigate }) => {
    return (
        <div className="success-page">
            <SuccessIcon />
            <h1 className="success-title">تم بنجاح!</h1>
            <p className="success-message">تم إرسال طلبك بنجاح. سنتواصل معك قريباً.</p>
            <button className="btn-next" onClick={() => onNavigate('languageSelection')}>العودة إلى الرئيسية</button>
        </div>
    );
};
export default SuccessPage_AR;
