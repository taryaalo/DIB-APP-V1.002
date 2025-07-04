import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';

// Import Page Components
import LanguageSelectionPage from './components/LanguageSelectionPage';
// Arabic Pages
import LandingPage_AR from './components/arabic/LandingPage_AR';
import SelectUserPage_AR from './components/arabic/SelectUserPage_AR';
import SimpleDocsPage_AR from './components/arabic/SimpleDocsPage_AR';
import GuaranteedDocsPage_AR from './components/arabic/GuaranteedDocsPage_AR';
import CompaniesDocsPage_AR from './components/arabic/CompaniesDocsPage_AR';
import ContactInfoPage_AR from './components/arabic/ContactInfoPage_AR';
import WorkInfoPage_AR from './components/arabic/WorkInfoPage_AR';
import PersonalInfoPage_AR from './components/arabic/PersonalInfoPage_AR';
import CompanyInfoPage_AR from './components/arabic/CompanyInfoPage_AR';
import CompanyContactPage_AR from './components/arabic/CompanyContactPage_AR';
import LegalRepInfoPage_AR from './components/arabic/LegalRepInfoPage_AR';
import FinancialInfoPage_AR from './components/arabic/FinancialInfoPage_AR';
import SuccessPage_AR from './components/arabic/SuccessPage_AR';
// English Pages
import LandingPage_EN from './components/english/LandingPage_EN';
import SelectUserPage_EN from './components/english/SelectUserPage_EN';
import SimpleDocsPage_EN from './components/english/SimpleDocsPage_EN';
import CompaniesDocsPage_EN from './components/english/CompaniesDocsPage_EN';
import ContactInfoPage_EN from './components/english/ContactInfoPage_EN';
import WorkInfoPage_EN from './components/english/WorkInfoPage_EN';
import PersonalInfoPage_EN from './components/english/PersonalInfoPage_EN';
import CompanyInfoPage_EN from './components/english/CompanyInfoPage_EN';
import CompanyContactPage_EN from './components/english/CompanyContactPage_EN';
import LegalRepInfoPage_EN from './components/english/LegalRepInfoPage_EN';
import FinancialInfoPage_EN from './components/english/FinancialInfoPage_EN';
import SuccessPage_EN from './components/english/SuccessPage_EN';


// ---=== Main App Component ===---
const AppContent = () => {
  const [navigation, setNavigation] = useState({ page: 'languageSelection', flow: null, lang: 'ar' });
  const { theme } = useTheme();

  useEffect(() => {
    document.body.dir = navigation.lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('data-theme', theme);
  }, [navigation.lang, theme]);

  const handleNavigation = (page, lang) => {
    let currentFlow = navigation.flow;
    let currentLang = lang || navigation.lang;

    if (page.startsWith('personal')) currentFlow = 'personal';
    else if (page.startsWith('guaranteed')) currentFlow = 'guaranteed';
    else if (page.startsWith('businessmen')) currentFlow = 'businessmen';
    else if (page.startsWith('companies')) currentFlow = 'companies';
    else if (page === 'selectUser' || page === 'landing' || page === 'languageSelection' || page === 'success') currentFlow = null;
    
    setNavigation({ page, flow: currentFlow, lang: currentLang });
  };

  const renderPage = () => {
      const { page, flow, lang } = navigation;
      
      if (page === 'languageSelection') {
          return <LanguageSelectionPage onNavigate={handleNavigation} />;
      }
      
      if (lang === 'en') {
        switch(page) {
            case 'landing': return <LandingPage_EN onNavigate={handleNavigation} />;
            case 'selectUser': return <SelectUserPage_EN onNavigate={handleNavigation} />;
            
            case 'personalDocs': return <SimpleDocsPage_EN title="Personal" onNavigate={handleNavigation} backPage="selectUser" nextPage="contactInfo" />;
            case 'businessmenDocs': return <SimpleDocsPage_EN title="Businessmen" onNavigate={handleNavigation} backPage="selectUser" nextPage="contactInfo" />;
            case 'guaranteedDocs': return <SimpleDocsPage_EN title="Guaranteed" onNavigate={handleNavigation} backPage="selectUser" nextPage="contactInfo" />;

            case 'companiesDocs': return <CompaniesDocsPage_EN onNavigate={handleNavigation} backPage="selectUser" nextPage="companyInfo" />;
            case 'companyInfo': return <CompanyInfoPage_EN onNavigate={handleNavigation} backPage="companiesDocs" nextPage="companyContact" />;
            case 'companyContact': return <CompanyContactPage_EN onNavigate={handleNavigation} backPage="companyInfo" nextPage="legalRepInfo" />;
            case 'legalRepInfo': return <LegalRepInfoPage_EN onNavigate={handleNavigation} backPage="companyContact" nextPage="financialInfo" />;
            case 'financialInfo': return <FinancialInfoPage_EN onNavigate={handleNavigation} backPage="legalRepInfo" />;

            case 'contactInfo': {
                let backPage = 'selectUser';
                if (flow === 'personal') backPage = 'personalDocs';
                if (flow === 'guaranteed') backPage = 'guaranteedDocs';
                if (flow === 'businessmen') backPage = 'businessmenDocs';
                return <ContactInfoPage_EN onNavigate={handleNavigation} backPage={backPage} nextPage="workInfo" />;
            }
            case 'workInfo': return <WorkInfoPage_EN onNavigate={handleNavigation} backPage="contactInfo" nextPage="personalInfo" />;
            case 'personalInfo': return <PersonalInfoPage_EN onNavigate={handleNavigation} backPage="workInfo" />;
            
            case 'success': return <SuccessPage_EN onNavigate={handleNavigation} />;
            default: return <LanguageSelectionPage onNavigate={handleNavigation} />;
        }
      }

      // --- ARABIC FLOW ---
      switch(page) {
          case 'landing': return <LandingPage_AR onNavigate={handleNavigation} />;
          case 'selectUser': return <SelectUserPage_AR onNavigate={handleNavigation} />;
              
          case 'personalDocs': return <SimpleDocsPage_AR title="شخصي" onNavigate={handleNavigation} backPage="selectUser" nextPage="contactInfo" />;
          case 'businessmenDocs': return <SimpleDocsPage_AR title="رجال أعمال" onNavigate={handleNavigation} backPage="selectUser" nextPage="contactInfo" />;
          case 'guaranteedDocs': return <GuaranteedDocsPage_AR onNavigate={handleNavigation} backPage="selectUser" nextPage="contactInfo" />;
              
          case 'companiesDocs': return <CompaniesDocsPage_AR onNavigate={handleNavigation} backPage="selectUser" nextPage="companyInfo" />;
          case 'companyInfo': return <CompanyInfoPage_AR onNavigate={handleNavigation} backPage="companiesDocs" nextPage="companyContact" />;
          case 'companyContact': return <CompanyContactPage_AR onNavigate={handleNavigation} backPage="companyInfo" nextPage="legalRepInfo" />;
          case 'legalRepInfo': return <LegalRepInfoPage_AR onNavigate={handleNavigation} backPage="companyContact" nextPage="financialInfo" />;
          case 'financialInfo': return <FinancialInfoPage_AR onNavigate={handleNavigation} backPage="legalRepInfo" />;

          case 'contactInfo': {
              let backPage = 'selectUser';
              if (flow === 'personal') backPage = 'personalDocs';
              if (flow === 'guaranteed') backPage = 'guaranteedDocs';
              if (flow === 'businessmen') backPage = 'businessmenDocs';
              return <ContactInfoPage_AR onNavigate={handleNavigation} backPage={backPage} nextPage="workInfo" />;
          }
          case 'workInfo': return <WorkInfoPage_AR onNavigate={handleNavigation} backPage="contactInfo" nextPage="personalInfo" />;
          case 'personalInfo': return <PersonalInfoPage_AR onNavigate={handleNavigation} backPage="workInfo" />;
          
          case 'success': return <SuccessPage_AR onNavigate={handleNavigation} />;
          default: return <LanguageSelectionPage onNavigate={handleNavigation} />;
      }
  }

  return <>{renderPage()}</>;
}


export default function App() {
    return (
        <ThemeProvider>
            <GlobalStyles />
            <AppContent />
        </ThemeProvider>
    );
}
