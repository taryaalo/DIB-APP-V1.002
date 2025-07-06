import React, { useState, useRef } from 'react';
import { extractDocumentData } from '../utils/docExtractor';
import { extractPassportData, extractNIDData } from '../utils/passportNidExtractors';
import { uploadDocument } from '../utils/fileUploader';
import { t } from '../i18n';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';
import { UploadIcon } from '../common/Icons';
import { LOGO_WHITE } from '../assets/imagePaths';
import { useLanguage } from '../contexts/LanguageContext';
import { useFormData } from '../contexts/FormContext';

const DOCS = [
  { key: 'passport', labelKey: 'passportPhoto' },
  { key: 'nationalId', labelKey: 'approvedNationalId' },
  { key: 'letter', labelKey: 'accountOpeningLetter' },
  { key: 'photo', labelKey: 'recentPersonalPhoto' },
];

const SequentialDocsPage_EN = ({ onNavigate, backPage, nextPage }) => {
  const { language } = useLanguage();
  const { setFormData } = useFormData();
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
    setIsLoading(true);
    setError('');
    try {
      let result;
      if (DOCS[current].key === 'passport') {
        result = await extractPassportData(file);
        if (result) {
          setFormData((d) => ({
            ...d,
            personalInfo: {
              ...(d.personalInfo || {}),
              fullName: result.fullNameArabic || (d.personalInfo?.fullName || ''),
              firstNameEn: result.firstNameEng || (d.personalInfo?.firstNameEn || ''),
              middleNameEn: result.midNameEng || (d.personalInfo?.middleNameEn || ''),
              lastNameEn: result.surnameEng || (d.personalInfo?.lastNameEn || ''),
              dob: result.dateOfBirth || (d.personalInfo?.dob || ''),
              gender: result.sex || (d.personalInfo?.gender || ''),
              nationality: result.nationality || (d.personalInfo?.nationality || ''),
              passportNumber: result.passportNo || (d.personalInfo?.passportNumber || ''),
              passportIssueDate: result.dateOfIssue || (d.personalInfo?.passportIssueDate || ''),
              passportExpiryDate: result.expiryDate || (d.personalInfo?.passportExpiryDate || ''),
              birthPlace: result.placeOfBirth || (d.personalInfo?.birthPlace || ''),
            },
            passportData: result,
          }));
        }
      } else if (DOCS[current].key === 'nationalId') {
        result = await extractNIDData(file);
      } else {
        await uploadDocument(file, DOCS[current].key);
        result = { uploaded: true };
      }
      setData((d) => ({ ...d, [DOCS[current].key]: result }));
    } catch (e) {
      console.error(e);
      setError('Failed to extract data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!data[DOCS[current].key]) return;
    const text = JSON.stringify(data[DOCS[current].key], null, 2);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleConfirm = () => {
    setCurrent((c) => c + 1);
    setImage(null);
    setIsCopied(false);
    setError('');
  };

  const allDone = current >= DOCS.length;
  const doc = DOCS[current];

  return (
    <div className="form-page">
      <header className="header docs-header">
        <img src={LOGO_WHITE} alt="Bank Logo" className="logo" />
        <div style={{ display: 'flex', gap: '30px' }}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <button onClick={() => onNavigate(backPage)} className="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>{t('back', language)}</span>
        </button>
        <button onClick={() => window.location.reload()} className="btn-refresh">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0114.13-3.36L23 10"></path><path d="M20.49 15a9 9 0 01-14.13 3.36L1 14"></path></svg>
          <span>{t('refresh', language)}</span>
        </button>
      </header>
      <main className="form-main" style={{ textAlign: 'center' }}>
        {allDone ? (
          <>
            <h2 className="form-title">{t('confirmData', language)}</h2>
            <pre style={{ textAlign: 'left' }}>{JSON.stringify(data, null, 2)}</pre>
            <div className="form-actions">
              <button className="btn-next" onClick={() => onNavigate(nextPage)}>{t('next', language)}</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="form-title">{t(doc.labelKey, language)}</h2>
            {!image && (
              <div
                className={`upload-area ${isDragging ? 'drag-over' : ''}`}
                onClick={() => fileInputRef.current.click()}
                onDragEnter={handleDragEvents}
                onDragOver={handleDragEvents}
                onDragLeave={handleDragEvents}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleUpload(e.target.files[0])}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div className="upload-icon"><UploadIcon /></div>
                <h2>{t('upload_prompt', language)}</h2>
              </div>
            )}
            {image && (
              <div className="result-container">
                <div className="image-preview-box">
                  <img src={image} alt="preview" />
                </div>
                {doc.key !== 'letter' && (
                  <div className="data-result-box">
                    <div className="data-result-header">
                      <h3>Extracted Data</h3>
                      {data[doc.key] && !isLoading && (
                        <button onClick={handleCopy} className="copy-btn">
                          {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                      )}
                    </div>
                    {isLoading && (
                      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}}>
                        <div className="loading-spinner"></div>
                        <p style={{marginTop:'20px'}}>{t('extracting_data', language)}</p>
                      </div>
                    )}
                    {!isLoading && data[doc.key] && (
                      <div className="data-result-content">
                        {Object.keys(data[doc.key]).map((k) => (
                          <div className="data-item" key={k}>
                            <span className="data-label">{k}</span>
                            <span className="data-value">{data[doc.key][k] || 'N/A'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {error && <p className="error-message">{error}</p>}
            {!isLoading && (
              <div className="form-actions">
                <button className="btn-next" onClick={handleConfirm}>{t('next', language)}</button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SequentialDocsPage_EN;
