// --- src/components/english/LandingPage_EN.js ---
import React from 'react';
import { LOGO_WHITE } from '../../assets/imagePaths';
import { OpenAccountIcon, CompleteAccountIcon } from '../common/Icons';

const LandingPage_EN = ({ onNavigate }) => {
  return (
    <div className="landing-container">
      <div className="content-wrapper">
        <img src={LOGO_WHITE} alt="Bank Logo" className="landing-logo" />
        <h1 className="landing-title">Daman Islamic Bank</h1>
        <p className="landing-subtitle">Your gateway to modern banking services</p>
        <div className="landing-buttons-container">
          <button onClick={() => onNavigate('selectUser')}>
            <OpenAccountIcon />
            <span>Open a New Account</span>
          </button>
          <button onClick={() => onNavigate('selectUser')} className="btn-secondary">
            <CompleteAccountIcon />
            <span>Complete Account Opening</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage_EN;