import React from 'react';
import { SuccessIcon } from './common/Icons';

const SuccessPage_EN = ({ onNavigate }) => {
    return (
        <div className="success-page">
            <SuccessIcon />
            <h1 className="success-title">Success!</h1>
            <p className="success-message">Your request has been submitted successfully. We will contact you shortly.</p>
            <button className="btn-next" onClick={() => onNavigate('languageSelection')}>Back to Home</button>
        </div>
    );
};

export default SuccessPage_EN;
