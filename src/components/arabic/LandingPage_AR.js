import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { OpenAccountIcon, CompleteAccountIcon } from '../common/Icons';

const LandingPage_AR = ({ onNavigate }) => {
  return (
    <div className="landing-container">
      <div className="content-wrapper">
        <img src={LOGO_WHITE} alt="شعار المصرف" className="landing-logo" />
        <h1 className="landing-title">مصرف الضمان الإسلامي</h1>
        <p className="landing-subtitle">بوابتكم للخدمات المصرفية الحديثة</p>
        <div className="landing-buttons-container">
          <button onClick={() => onNavigate('selectUser')}>
            <OpenAccountIcon />
            <span>فتح حساب جديد</span>
          </button>
          <button onClick={() => onNavigate('selectUser')} className="btn-secondary">
            <CompleteAccountIcon />
            <span>إتمام عملية فتح الحساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage_AR;