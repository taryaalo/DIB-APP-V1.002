
import React, { useEffect } from 'react';
import { LOGO_COLOR } from '../assets/imagePaths';
import ThemeSwitcher from './common/ThemeSwitcher';
import LanguageSwitcher from './common/LanguageSwitcher';
import { PersonalIcon, GuaranteedIcon, BusinessmenIcon, CompaniesIcon } from './common/Icons';
import { t } from '../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const SelectUserPage_EN = ({ onNavigate }) => {
  useEffect(() => {
    const card = document.querySelector('.tilt-effect');
    if (!card) return;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = -1 * ((y - height / 2) / (height / 2)) * 10;
      const rotateY = ((x - width / 2) / (width / 2)) * 10;
      card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
    }
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const { language } = useLanguage();

  return (
    <div className="app-container">
      <header className="header">
        <img src={LOGO_COLOR} alt="Bank Logo" className="logo" />
        <div style={{ display: 'flex', gap: '10px' }}>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </header>
      <main className="main">
        <div className="background">
          <img src="https://images.unsplash.com/photo-1561816544-21ec6a585c13?q=80&w=2835&auto=format&fit=crop" alt="Bank Building" />
          <div className="overlay"></div>
        </div>
        <div className="menu-card tilt-effect">
          <h2>{t('selectService', language)}</h2>
          <button onClick={() => onNavigate('personalDocs')}><PersonalIcon /><span>{t('personal', language)}</span></button>
          <button onClick={() => onNavigate('guaranteedDocs')}><GuaranteedIcon /><span>{t('guaranteed', language)}</span></button>
          <button onClick={() => onNavigate('businessmenDocs')}><BusinessmenIcon /><span>{t('businessmen', language)}</span></button>
          <button onClick={() => onNavigate('companiesDocs')}><CompaniesIcon /><span>{t('companies', language)}</span></button>
        </div>
      </main>
    </div>
  );
};
export default SelectUserPage_EN;
