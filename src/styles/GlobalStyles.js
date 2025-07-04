import React from 'react';
import { LANG_SELECT_BG } from '../assets/imagePaths';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

    :root {
        --font-primary-ar: 'Cairo', 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif;
        --font-primary-en: 'Poppins', sans-serif;
        
        /* Light Theme */
        --primary-color-light: #3E8A96;
        --primary-dark-light: #2E6B76;
        --accent-color-light: #D4A03C;
        --secondary-color-light: #f0f2f5;
        --text-color-dark-light: #1a202c;
        --text-color-light-light: #f7fafc;
        --docs-bg-light: #ECF5F6;
        --header-bg-light: #fff;
        --form-input-bg-light: #fff;
        --form-input-text-light: #1a202c;
        --glass-bg-light: rgba(255, 255, 255, 0.15);
        --glass-border-light: rgba(255, 255, 255, 0.25);
        --shadow-color-light: rgba(0, 0, 0, 0.15);
        --success-color-light: #4caf50;
        
        /* Dark Theme */
        --primary-color-dark: #4FB3C4;
        --primary-dark-dark: #3E8A96;
        --accent-color-dark: #E6B357;
        --secondary-color-dark: #1A202C;
        --text-color-dark-dark: #EDF2F7;
        --text-color-light-dark: #1A202C;
        --docs-bg-dark: #2D3748;
        --header-bg-dark: #2D3748;
        --form-input-bg-dark: #4A5568;
        --form-input-text-dark: #EDF2F7;
        --glass-bg-dark: rgba(0, 0, 0, 0.25);
        --glass-border-dark: rgba(255, 255, 255, 0.1);
        --shadow-color-dark: rgba(0, 0, 0, 0.5);
        --success-color-dark: #68D391;
    }

    body {
        margin: 0;
        overflow-x: hidden;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    body[data-theme='light'] {
        --primary-color: var(--primary-color-light);
        --primary-dark: var(--primary-dark-light);
        --accent-color: var(--accent-color-light);
        --secondary-color: var(--secondary-color-light);
        --text-color-dark: var(--text-color-dark-light);
        --text-color-light: var(--text-color-light-light);
        --docs-bg: var(--docs-bg-light);
        --header-bg: var(--header-bg-light);
        --form-input-bg: var(--form-input-bg-light);
        --form-input-text: var(--form-input-text-light);
        --glass-bg: var(--glass-bg-light);
        --glass-border: var(--glass-border-light);
        --shadow-color: var(--shadow-color-light);
        --success-color: var(--success-color-light);
        background-color: var(--secondary-color);
        color: var(--text-color-dark);
    }

    body[data-theme='dark'] {
        --primary-color: var(--primary-color-dark);
        --primary-dark: var(--primary-dark-dark);
        --accent-color: var(--accent-color-dark);
        --secondary-color: var(--secondary-color-dark);
        --text-color-dark: var(--text-color-dark-dark);
        --text-color-light: var(--text-color-light-dark);
        --docs-bg: var(--docs-bg-dark);
        --header-bg: var(--header-bg-dark);
        --form-input-bg: var(--form-input-bg-dark);
        --form-input-text: var(--form-input-text-dark);
        --glass-bg: var(--glass-bg-dark);
        --glass-border: var(--glass-border-dark);
        --shadow-color: var(--shadow-color-dark);
        --success-color: var(--success-color-dark);
        background-color: var(--secondary-color);
        color: var(--text-color-dark);
    }
    
    body[dir="rtl"] { font-family: var(--font-primary-ar); }
    body[dir="ltr"] { font-family: var(--font-primary-en); }
    
    #root { width: 100%; height: 100%; }

    @keyframes fadeInSlideUp {
        from { opacity: 0; transform: translateY(25px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* --- Theme Switcher --- */
    .theme-switcher {
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,0.1);
        border-radius: 99px;
        padding: 4px;
        cursor: pointer;
    }
    .theme-switcher-button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .theme-switcher-button svg {
        color: var(--primary-color);
    }
    body[data-theme='dark'] .theme-switcher-button {
        transform: translateX(30px);
        background-color: #4A5568;
    }
    body[data-theme='dark'] .theme-switcher-button svg {
        color: var(--accent-color);
    }
    .theme-switcher-icons {
        display: flex;
        gap: 8px;
        padding: 0 6px;
    }
    .theme-switcher-icons svg {
        color: #fff;
    }

    /* --- Language Switcher --- */
    .language-switcher {
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,0.1);
        border-radius: 99px;
        cursor: pointer;
        font-size: 0.9rem;
    }
    .language-switcher span {
        padding: 6px 12px;
        color: var(--text-color-dark);
        user-select: none;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    body[data-theme='dark'] .language-switcher span {
        color: var(--text-color-dark-dark);
    }
    .language-switcher span.active {
        background-color: var(--primary-color);
        color: var(--text-color-light);
        border-radius: 99px;
    }


    /* --- Language Selection --- */
    .lang-selection-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        text-align: center;
        background-color: #3E8A96;
        background-image: url(${LANG_SELECT_BG});
        background-size: cover;
        background-position: center;
    }

    .lang-selection-box { animation: fadeInSlideUp 1s ease-out forwards; }
    .lang-logo { height: 120px; margin-bottom: 40px; }
    .lang-buttons-container { display: flex; flex-direction: column; gap: 20px; width: 100%; max-width: 300px; }
    .lang-btn {
        padding: 15px 20px;
        font-size: 1.2rem;
        font-weight: 700;
        border-radius: 12px;
        border: 2px solid var(--text-color-light);
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: transparent;
        color: var(--text-color-light);
    }
    .lang-btn:hover {
        background-color: var(--text-color-light);
        color: var(--primary-dark);
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    /* --- Landing Page --- */
    .landing-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        text-align: center;
        background: linear-gradient(-45deg, var(--accent-color), var(--primary-color), #5f9ea0, #2E6B76);
        background-size: 400% 400%;
        animation: gradient-animation 15s ease infinite;
        color: var(--text-color-light);
    }
    .content-wrapper { display: flex; flex-direction: column; align-items: center; max-width: 500px; animation: fadeInSlideUp 1s ease-out forwards; }
    .landing-logo { height: 140px; margin-bottom: 20px; filter: drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.3)); }
    .landing-title { font-size: 3rem; font-weight: 700; margin: 0 0 10px 0; letter-spacing: 1px; }
    .landing-subtitle { font-size: 1.25rem; font-weight: 400; opacity: 0.9; margin-bottom: 40px; }
    .landing-buttons-container { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 320px; }
    .landing-buttons-container button { width: 100%; padding: 15px 20px; font-size: 1.1rem; font-weight: 600; border-radius: 12px; border: none; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 10px; }
    body[dir="rtl"] .landing-buttons-container button { font-family: var(--font-primary-ar); }
    body[dir="ltr"] .landing-buttons-container button { font-family: var(--font-primary-en); }
    .landing-buttons-container button.btn-secondary { background-color: transparent; border: 2px solid var(--text-color-light); color: var(--text-color-light); }
    .landing-buttons-container button:not(.btn-secondary) { background-color: var(--text-color-light); color: var(--primary-dark); }
    .landing-buttons-container button:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
    .landing-buttons-container button.btn-secondary:hover { background-color: var(--text-color-light); color: var(--primary-dark); }

    .app-container { height: 100vh; width: 100vw; display: flex; flex-direction: column; }
    .header {
        background-color: var(--header-bg);
        padding: 15px 40px;
        box-shadow: 0 4px 15px var(--shadow-color);
        z-index: 1000;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.3s ease;
    }
    .header.docs-header { background-color: var(--primary-color); }
    .logo { height: 60px; transition: transform 0.3s ease-out; }
    .logo:hover { transform: scale(1.05); }

    .main { position: relative; flex-grow: 1; display: flex; align-items: center; padding: 0 80px; overflow: hidden; }
    body[dir="rtl"] .main { justify-content: flex-start; }
    body[dir="ltr"] .main { justify-content: flex-end; }
    .background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
    .background img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6); transform: scale(1.05); transition: transform 6s ease-in-out; }
    .main:hover .background img { transform: scale(1); }
    .overlay { position: absolute; inset: 0; }
    body[dir="rtl"] .overlay { background: linear-gradient(to right, transparent 0%, var(--glass-bg) 50%, var(--glass-bg) 100%); }
    body[dir="ltr"] .overlay { background: linear-gradient(to left, transparent 0%, var(--glass-bg) 50%, var(--glass-bg) 100%); }

    .menu-card {
        z-index: 1;
        background: var(--glass-bg);
        padding: 50px 40px;
        border-radius: 25px;
        box-shadow: 0 20px 50px var(--shadow-color);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        max-width: 380px;
        text-align: center;
        animation: fadeInSlideUp 0.8s ease-out 0.2s forwards;
        opacity: 0;
        will-change: transform;
        transition: all 0.2s ease-out;
    }
    .menu-card h2 { color: var(--text-color-dark); }
    body[data-theme='dark'] .menu-card h2 { color: var(--text-color-dark-dark); }
    .menu-card:hover { transform: scale(1.03); }
    .menu-card h2 { margin-bottom: 35px; font-size: 2rem; font-weight: 700; }
    .menu-card button { width: 100%; background: linear-gradient(45deg, var(--primary-dark), var(--primary-color)); color: var(--text-color-light); border: none; font-size: 1.2rem; padding: 16px; border-radius: 12px; margin-bottom: 18px; box-shadow: 0 8px 20px rgba(62, 138, 150, 0.3); cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 12px; }
    body[dir="rtl"] .menu-card button { font-family: var(--font-primary-ar); }
    body[dir="ltr"] .menu-card button { font-family: var(--font-primary-en); }
    .menu-card button:last-child { margin-bottom: 0; }
    .menu-card button:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 14px 28px rgba(62, 138, 150, 0.4); }
    .menu-card button:focus { outline: none; box-shadow: 0 0 0 4px rgba(62, 138, 150, 0.5); }
    
    /* ---=== Form Page Styles ===--- */
    .form-page { background-color: var(--docs-bg); min-height: 100vh; display: flex; flex-direction: column; transition: background-color 0.3s ease; }
    .form-main { padding: 40px; display: flex; flex-direction: column; align-items: center; flex-grow: 1; }
    .form-title { font-size: 2.5rem; font-weight: 700; color: var(--text-color-dark); margin-bottom: 40px; align-self: flex-start; }
    .docs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; width: 100%; max-width: 900px; margin-bottom: 50px; }
    .upload-box { background-color: var(--form-input-bg); border-radius: 15px; padding: 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 5px 15px var(--shadow-color); transition: all 0.3s ease; gap: 15px; }
    .upload-box p { color: var(--text-color-dark); }
    .upload-box:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
    .upload-box p { font-size: 1.1rem; font-weight: 600; margin: 0; flex-grow: 1; }
    .upload-placeholder { width: 100px; height: 100px; border: 2px dashed #ccc; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #aaa; cursor: pointer; flex-shrink: 0; }
    .multi-upload-placeholders { display: flex; gap: 10px; }
    .multi-upload-placeholders .upload-placeholder { width: 60px; height: 60px; }
    .multi-upload-placeholders .upload-icon { width: 32px; height: 32px; }
    .upload-placeholder .upload-icon { color: #ccc; }
    .form-actions { display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%; margin-top: auto; padding-top: 20px; }
    .btn-next { background-color: var(--primary-color); color: var(--text-color-light); border: none; padding: 15px 50px; font-size: 1.2rem; font-weight: 700; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; width: 100%; max-width: 400px; }
    .btn-next:hover { background-color: var(--primary-dark); box-shadow: 0 8px 20px rgba(62, 138, 150, 0.4); }
    .btn-back { background: none; border: none; color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; }
    
    /* ---=== Form Styles ===--- */
    .form-container { width: 100%; max-width: 600px; }
    .form-section { margin-bottom: 40px; }
    .form-section h3 { font-size: 1.8rem; font-weight: 700; margin-bottom: 20px; border-bottom: 2px solid var(--primary-color); padding-bottom: 10px; color: var(--text-color-dark); }
    .form-group { margin-bottom: 20px; position: relative; }
    .form-input { width: 100%; padding: 15px; font-size: 1rem; border: 1px solid #ccc; border-radius: 8px; background-color: var(--form-input-bg); color: var(--form-input-text); transition: all 0.3s ease; box-sizing: border-box; }
    body[dir="rtl"] .form-input { font-family: var(--font-primary-ar); }
    body[dir="ltr"] .form-input { font-family: var(--font-primary-en); }
    .form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(62, 138, 150, 0.3); }
    .phone-input-group { display: flex; }
    .phone-prefix { padding: 15px; background-color: #e9ecef; border: 1px solid #ccc; font-size: 1rem; }
    body[data-theme='dark'] .phone-prefix { background-color: #2D3748; border-color: #4A5568; }
    body[dir="rtl"] .phone-prefix { border-left: none; border-radius: 0 8px 8px 0; }
    body[dir="ltr"] .phone-prefix { border-right: none; border-radius: 8px 0 0 8px; }
    body[dir="rtl"] .phone-input-group .form-input { border-radius: 8px 0 0 8px; }
    body[dir="ltr"] .phone-input-group .form-input { border-radius: 0 8px 8px 0; }
    .date-input-container { position: relative; display: flex; align-items: center; }
    .date-input-container .form-input { padding-left: 45px; padding-right: 45px; }
    .date-input-container svg { position: absolute; color: #999; }
    body[dir="rtl"] .date-input-container svg { left: 15px; }
    body[dir="ltr"] .date-input-container svg { right: 15px; }
    .national-id-group { display: flex; gap: 10px; justify-content: space-between; }
    .national-id-input { width: 40px; height: 50px; text-align: center; font-size: 1.5rem; border: 1px solid #ccc; border-radius: 8px; background-color: var(--form-input-bg); color: var(--form-input-text); }
    .agreements { width: 100%; max-width: 600px; margin-bottom: 20px; }
    .agreement-item { display: flex; align-items: center; gap: 15px; font-size: 1.1rem; font-weight: 600; color: var(--text-color-dark); }
    .agreement-item:first-child { margin-bottom: 15px; }
    .agreement-item a { color: var(--primary-dark); text-decoration: none; font-weight: 700; }
    .agreement-item a:hover { text-decoration: underline; }
    .custom-checkbox { display: inline-block; width: 28px; height: 28px; background: var(--form-input-bg); border: 2px solid #ccc; border-radius: 6px; position: relative; cursor: pointer; flex-shrink: 0; }
    .custom-checkbox input { opacity: 0; width: 0; height: 0; }
    .checkmark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; background-color: #4caf50; border-radius: 4px; opacity: 0; transition: opacity 0.2s ease; }
    .checkmark:after { content: ""; position: absolute; display: block; left: 7px; top: 3px; width: 5px; height: 10px; border: solid white; border-width: 0 3px 3px 0; transform: rotate(45deg); }
    .custom-checkbox input:checked ~ .checkmark { opacity: 1; }
    .custom-checkbox input:checked ~ .custom-checkbox-box { border-color: #4caf50; }
    .custom-checkbox-box { width: 28px; height: 28px; background: var(--form-input-bg); border: 2px solid #ccc; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s ease; }
    .company-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 40px; }
    
    /* ---=== Success Page ===--- */
    .success-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        text-align: center;
        background-color: var(--docs-bg);
    }
    .success-icon {
        color: var(--success-color);
        width: 100px;
        height: 100px;
        margin-bottom: 30px;
    }
    .success-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-color-dark);
        margin-bottom: 15px;
    }
    .success-message {
        font-size: 1.2rem;
        color: var(--text-color-dark);
        opacity: 0.8;
        margin-bottom: 40px;
    }

    /* ---=== RESPONSIVE ADJUSTMENTS ===--- */
    @media (max-width: 768px) {
        .header { padding: 10px 20px; }
        .logo { height: 50px; }
        .main { flex-direction: column; justify-content: center; padding: 20px; height: auto; min-height: calc(100vh - 70px); }
        .menu-card { width: 90%; max-width: none; padding: 30px 25px; }
        .landing-title { font-size: 2.5rem; }
        .docs-grid { grid-template-columns: 1fr; }
        .form-title { font-size: 2rem; align-self: center; text-align: center; }
        .form-section h3 { font-size: 1.5rem; }
        .company-form-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
        .landing-title { font-size: 2rem; }
        .landing-subtitle { font-size: 1rem; }
        .landing-logo { height: 100px; }
        .landing-buttons-container button { font-size: 1rem; padding: 12px; }
        .menu-card h2 { font-size: 1.5rem; }
        .menu-card button { font-size: 1rem; padding: 14px; }
        .upload-box { flex-direction: column; text-align: center; }
        .national-id-group { flex-wrap: wrap; gap: 5px; }
        .national-id-input { width: calc(25% - 10px); }
    }
  `}</style>
);

export default GlobalStyles;
