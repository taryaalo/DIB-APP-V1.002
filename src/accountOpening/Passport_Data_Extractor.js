import React, { useState, useEffect, createContext, useContext, useRef } from 'react';

// =======================================================================
// 0. MOCK LIBRARIES (for standalone preview)
// =======================================================================
const MOCK_ROUTER = {
    RouterContext: createContext(null),
    useNavigate: () => {
        const { setPath } = useContext(MOCK_ROUTER.RouterContext);
        return (newPath) => setPath(newPath);
    },
    Link: ({ to, children, ...props }) => {
        const { setPath } = useContext(MOCK_ROUTER.RouterContext);
        return <a href="#" {...props} onClick={(e) => { e.preventDefault(); setPath(to); }}>{children}</a>;
    },
    Route: ({ path, element }) => {
        const { currentPath } = useContext(MOCK_ROUTER.RouterContext);
        return currentPath === path ? element : null;
    },
    Routes: ({ children }) => <>{children}</>,
    BrowserRouter: ({ children }) => {
        const [path, setPath] = useState('/');
        return (
            <MOCK_ROUTER.RouterContext.Provider value={{ currentPath: path, setPath }}>
                {children}
            </MOCK_ROUTER.RouterContext.Provider>
        );
    },
};

const MOCK_I18NEXT = {
    I18nContext: createContext(null),
    useTranslation: () => useContext(MOCK_I18NEXT.I18nContext),
    I18nextProvider: ({ i18n, children }) => {
        const [lang, setLang] = useState(i18n.lng);
        const t = (key, options) => {
            const keys = key.split('.');
            let value = i18n.resources[lang].translation;
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return key;
                }
            }
            return value || key;
        };
        const changeLanguage = (newLang) => {
            i18n.lng = newLang;
            setLang(newLang);
        };
        useEffect(() => {
            document.body.dir = i18n.dir(lang);
        }, [lang]);
        return (
            <MOCK_I18NEXT.I18nContext.Provider value={{ t, i18n: { ...i18n, changeLanguage } }}>
                {children}
            </MOCK_I18NEXT.I18nContext.Provider>
        );
    }
};

const { BrowserRouter, Routes, Route, Link, useNavigate } = MOCK_ROUTER;
const { I18nextProvider, useTranslation } = MOCK_I18NEXT;

// =======================================================================
// 1. I18N CONFIGURATION
// =======================================================================
const translations = {
  en: {
    translation: {
      "app_title": "Passport Data Extractor",
      "language_select_prompt": "Select Your Language",
      "upload_prompt": "Upload a passport image",
      "upload_sub_prompt": "Click or drag an image file here.",
      "upload_button": "Select Image",
      "extracting_data": "Extracting data, please wait...",
      "extracted_data_header": "Extracted Data",
      "copy_button": "Copy Data",
      "copied_message": "Copied!",
      "error_unsupported": "Unsupported file type. Please upload a JPG, PNG, or WEBP image.",
      "error_api": "Could not extract data. Please try again.",
      "no_data_found": "No structured data could be extracted from this image.",
      "passport_data": {
          "fullNameArabic": "Full Name (Arabic)",
          "firstNameEng": "First Name (English)",
          "midNameEng": "Middle Name (English)",
          "surnameEng": "Surname (English)",
          "passportNo": "Passport No.",
          "dateOfBirth": "Date of Birth",
          "placeOfBirth": "Place of Birth",
          "dateOfIssue": "Date of Issue",
          "issuingPlace": "Issuing Place",
          "sex": "Sex",
          "nationality": "Nationality",
          "expiryDate": "Expiry Date"
      }
    }
  },
  ar: {
    translation: {
      "app_title": "مستخرج بيانات جواز السفر",
      "language_select_prompt": "اختر لغتك",
      "upload_prompt": "ارفع صورة جواز السفر",
      "upload_sub_prompt": "انقر أو اسحب ملف الصورة هنا.",
      "upload_button": "اختر صورة",
      "extracting_data": "جاري استخراج البيانات، يرجى الانتظار...",
      "extracted_data_header": "البيانات المستخرجة",
      "copy_button": "نسخ البيانات",
      "copied_message": "تم النسخ!",
      "error_unsupported": "نوع الملف غير مدعوم. يرجى رفع صورة.",
      "error_api": "تعذر استخراج البيانات. يرجى المحاولة مرة أخرى.",
      "no_data_found": "لم يتم العثور على بيانات منظمة في هذه الصورة.",
      "passport_data": {
          "fullNameArabic": "الاسم الكامل (عربي)",
          "firstNameEng": "الاسم الأول (إنجليزي)",
          "midNameEng": "الاسم الأوسط (إنجليزي)",
          "surnameEng": "اللقب (إنجليزي)",
          "passportNo": "رقم الجواز",
          "dateOfBirth": "تاريخ الميلاد",
          "placeOfBirth": "مكان الميلاد",
          "dateOfIssue": "تاريخ الإصدار",
          "issuingPlace": "مكان الإصدار",
          "sex": "الجنس",
          "nationality": "الجنسية",
          "expiryDate": "تاريخ الانتهاء"
      }
    }
  }
};

const i18nConfig = {
    resources: translations,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    dir: (lng) => (lng === 'ar' ? 'rtl' : 'ltr'),
};

// =======================================================================
// 2. ASSETS & ICONS
// =======================================================================
const LANG_SELECT_BG = "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2942&auto=format&fit=crop";

const SunIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> );
const MoonIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> );
const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> );
const CopyIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> );

// =======================================================================
// 3. CONTEXT & STYLES
// =======================================================================
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);
    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    :root {
        --font-primary-ar: 'Cairo', 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif;
        --font-primary-en: 'Poppins', sans-serif;
        --primary-color-light: #3E8A96; --primary-dark-light: #2E6B76; --accent-color-light: #D4A03C; --secondary-color-light: #f0f2f5; --text-color-dark-light: #1a202c; --text-color-light-light: #f7fafc; --docs-bg-light: #ECF5F6; --header-bg-light: #fff; --form-input-bg-light: #fff; --form-input-text-light: #1a202c; --shadow-color-light: rgba(0, 0, 0, 0.1);
        --primary-color-dark: #4FB3C4; --primary-dark-dark: #3E8A96; --accent-color-dark: #E6B357; --secondary-color-dark: #1A202C; --text-color-dark-dark: #EDF2F7; --text-color-light-dark: #1A202C; --docs-bg-dark: #2D3748; --header-bg-dark: #2D3748; --form-input-bg-dark: #4A5568; --form-input-text-dark: #EDF2F7; --shadow-color-dark: rgba(0, 0, 0, 0.4);
    }
    body { margin: 0; overflow-x: hidden; transition: background-color 0.3s ease, color 0.3s ease; }
    body[data-theme='light'] { --primary-color: var(--primary-color-light); --primary-dark: var(--primary-dark-light); --accent-color: var(--accent-color-light); --secondary-color: var(--secondary-color-light); --text-color-dark: var(--text-color-dark-light); --text-color-light: var(--text-color-light-light); --docs-bg: var(--docs-bg-light); --header-bg: var(--header-bg-light); --form-input-bg: var(--form-input-bg-light); --form-input-text: var(--form-input-text-light); --shadow-color: var(--shadow-color-light); background-color: var(--secondary-color); color: var(--text-color-dark); }
    body[data-theme='dark'] { --primary-color: var(--primary-color-dark); --primary-dark: var(--primary-dark-dark); --accent-color: var(--accent-color-dark); --secondary-color: var(--secondary-color-dark); --text-color-dark: var(--text-color-dark-dark); --text-color-light: var(--text-color-light-dark); --docs-bg: var(--docs-bg-dark); --header-bg: var(--header-bg-dark); --form-input-bg: var(--form-input-bg-dark); --form-input-text: var(--form-input-text-dark); --shadow-color: var(--shadow-color-dark); background-color: var(--secondary-color); color: var(--text-color-dark); }
    body[dir="rtl"] { font-family: var(--font-primary-ar); }
    body[dir="ltr"] { font-family: var(--font-primary-en); }
    #root, .app-root-container { width: 100%; height: 100vh; }
    .theme-switcher { display: flex; align-items: center; background-color: rgba(0,0,0,0.1); border-radius: 99px; padding: 4px; cursor: pointer; }
    .theme-switcher-button { width: 30px; height: 30px; border-radius: 50%; background-color: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: transform 0.3s ease; display: flex; align-items: center; justify-content: center; }
    .theme-switcher-button svg { color: var(--primary-color); }
    body[data-theme='dark'] .theme-switcher-button { transform: translateX(30px); background-color: #4A5568; }
    body[data-theme='dark'] .theme-switcher-button svg { color: var(--accent-color); }
    .lang-selection-page { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; text-align: center; background-color: #3E8A96; background-image: url(${LANG_SELECT_BG}); background-size: cover; background-position: center; gap: 20px; }
    .lang-selection-title { font-size: 2rem; font-weight: 700; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    .lang-buttons-container { display: flex; gap: 20px; }
    .lang-btn { padding: 15px 30px; font-size: 1.2rem; font-weight: 700; border-radius: 12px; border: 2px solid white; cursor: pointer; transition: all 0.3s ease; background-color: transparent; color: white; }
    .lang-btn:hover { background-color: white; color: var(--primary-dark-light); transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
    .extractor-page { display: flex; flex-direction: column; height: 100vh; background-color: var(--docs-bg); }
    .extractor-header { background-color: var(--header-bg); padding: 15px 40px; box-shadow: 0 4px 15px var(--shadow-color); z-index: 10; display: flex; justify-content: space-between; align-items: center; transition: background-color 0.3s ease; }
    .extractor-title { font-size: 1.5rem; font-weight: 600; color: var(--text-color-dark); margin: 0; }
    .extractor-main { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; gap: 30px; }
    .upload-area { width: 100%; max-width: 600px; background-color: var(--form-input-bg); border-radius: 15px; padding: 40px; text-align: center; border: 2px dashed #ccc; transition: all 0.3s ease; box-shadow: 0 5px 20px var(--shadow-color); }
    .upload-area.drag-over { border-color: var(--primary-color); transform: scale(1.02); }
    .upload-area .upload-icon { color: #ccc; margin-bottom: 20px; }
    .upload-area h2 { margin: 0 0 10px 0; color: var(--text-color-dark); }
    .upload-area p { margin: 0 0 20px 0; color: #888; }
    .upload-btn { background-color: var(--primary-color); color: white; border: none; padding: 12px 30px; font-size: 1rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; }
    .upload-btn:hover { background-color: var(--primary-dark); }
    .result-container { display: flex; gap: 30px; width: 100%; max-width: 1200px; flex-grow: 1; min-height: 0; }
    .image-preview-box, .data-result-box { background-color: var(--form-input-bg); border-radius: 15px; padding: 30px; box-shadow: 0 5px 20px var(--shadow-color); flex: 1; display: flex; flex-direction: column; }
    .image-preview-box img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; }
    .data-result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .data-result-header h3 { margin: 0; color: var(--text-color-dark); }
    .copy-btn { background-color: var(--secondary-color); color: var(--text-color-dark); border: 1px solid #ccc; padding: 8px 12px; font-size: 0.9rem; font-weight: 600; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
    .data-result-content { flex-grow: 1; overflow-y: auto; }
    .data-item { display: flex; justify-content: space-between; padding: 12px 8px; border-bottom: 1px solid var(--secondary-color); }
    .data-item:last-child { border-bottom: none; }
    .data-label { font-weight: 600; color: var(--text-color-dark); }
    .data-value { color: var(--primary-dark); font-family: var(--font-primary-en); }
    body[dir="rtl"] .data-value { font-family: var(--font-primary-ar); }
    .loading-spinner { border: 4px solid #f3f3f3; border-top: 4px solid var(--primary-color); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .error-message { color: #e53e3e; font-weight: 600; background-color: rgba(229, 62, 62, 0.1); padding: 15px; border-radius: 8px; text-align: center; }
  `}</style>
);

// =======================================================================
// 4. COMPONENTS
// =======================================================================

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="theme-switcher" onClick={toggleTheme}>
            <div className="theme-switcher-button">
                 {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </div>
        </div>
    );
};

const LanguageSelectionPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const handleLanguageSelect = (lang) => {
        i18n.changeLanguage(lang);
        navigate('/extractor');
    };

    return (
        <div className="lang-selection-page">
            <h1 className="lang-selection-title">{t('language_select_prompt')}</h1>
            <div className="lang-buttons-container">
                <button className="lang-btn" onClick={() => handleLanguageSelect('ar')}>العربية</button>
                <button className="lang-btn" onClick={() => handleLanguageSelect('en')}>English</button>
            </div>
        </div>
    );
};

const ExtractorPage = () => {
    const { t } = useTranslation();
    const [image, setImage] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const passportSchema = {
        type: "OBJECT",
        properties: {
            "fullNameArabic": { "type": "STRING" },
            "firstNameEng": { "type": "STRING" },
            "midNameEng": { "type": "STRING" },
            "surnameEng": { "type": "STRING" },
            "passportNo": { "type": "STRING" },
            "dateOfBirth": { "type": "STRING" },
            "placeOfBirth": { "type": "STRING" },
            "dateOfIssue": { "type": "STRING" },
            "issuingPlace": { "type": "STRING" },
            "sex": { "type": "STRING" },
            "nationality": { "type": "STRING" },
            "expiryDate": { "type": "STRING" },
        }
    };

    const handleImageUpload = (file) => {
        if (!file) return;
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError(t('error_unsupported'));
            return;
        }
        setError('');
        setExtractedData(null);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            extractDataFromImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const extractDataFromImage = async (base64ImageData) => {
        setIsLoading(true);
        setExtractedData(null);
        const base64Data = base64ImageData.split(',')[1];

        const payload = {
            contents: [{
                parts: [
                    { text: "Extract the following fields from the passport image: Full Name (Arabic), First Name (English), Mid Name (English), Surname (English), Passport No, Date of Birth, Place of Birth, Date of Issue, Issuing Place, Sex, Nationality, and Expiry Date. Return the data in the specified JSON format." },
                    { inlineData: { mimeType: "image/png", data: base64Data } }
                ]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: passportSchema,
            }
        };
        
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            if (result.candidates && result.candidates[0].content.parts[0].text) {
                const parsedData = JSON.parse(result.candidates[0].content.parts[0].text);
                setExtractedData(parsedData);
            } else {
                setError(t('no_data_found'));
            }
        } catch (err) {
            setError(t('error_api'));
            console.error("API Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        const dataString = JSON.stringify(extractedData, null, 2);
        const textarea = document.createElement('textarea');
        textarea.value = dataString;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    const handleDragEvents = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="extractor-page">
            <header className="extractor-header">
                <h1 className="extractor-title">{t('app_title')}</h1>
                <ThemeSwitcher />
            </header>
            <main className="extractor-main">
                {!image && (
                    <div 
                        className={`upload-area ${isDragging ? 'drag-over' : ''}`}
                        onClick={() => fileInputRef.current.click()}
                        onDragEnter={handleDragEvents}
                        onDragOver={handleDragEvents}
                        onDragLeave={handleDragEvents}
                        onDrop={handleDrop}
                    >
                        <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e.target.files[0])} accept="image/png, image/jpeg, image/webp" style={{ display: 'none' }} />
                        <div className="upload-icon"><UploadIcon /></div>
                        <h2>{t('upload_prompt')}</h2>
                        <p>{t('upload_sub_prompt')}</p>
                        <button className="upload-btn">{t('upload_button')}</button>
                    </div>
                )}

                {image && (
                    <div className="result-container">
                        <div className="image-preview-box">
                            <img src={image} alt="Upload preview" />
                        </div>
                        <div className="data-result-box">
                            <div className="data-result-header">
                                <h3>{t('extracted_data_header')}</h3>
                                {extractedData && !isLoading && (
                                    <button onClick={handleCopy} className="copy-btn">
                                        <CopyIcon />
                                        {isCopied ? t('copied_message') : t('copy_button')}
                                    </button>
                                )}
                            </div>
                             {isLoading && (
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                    <div className="loading-spinner"></div>
                                    <p style={{marginTop: '20px'}}>{t('extracting_data')}</p>
                                </div>
                            )}
                            {!isLoading && extractedData && (
                                <div className="data-result-content">
                                    {Object.keys(extractedData).map(key => (
                                        <div className="data-item" key={key}>
                                            <span className="data-label">{t(`passport_data.${key}`)}</span>
                                            <span className="data-value">{extractedData[key] || 'N/A'}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                 {error && <p className="error-message">{error}</p>}
            </main>
        </div>
    );
};

// =======================================================================
// 5. MAIN APP COMPONENT
// =======================================================================
export default function App() {
    return (
        <div className="app-root-container">
            <ThemeProvider>
                <I18nextProvider i18n={i18nConfig}>
                    <GlobalStyles />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<LanguageSelectionPage />} />
                            <Route path="/extractor" element={<ExtractorPage />} />
                        </Routes>
                    </BrowserRouter>
                </I18nextProvider>
            </ThemeProvider>
        </div>
    );
}
