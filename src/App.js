import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { FormProvider } from './contexts/FormContext';
import GlobalStyles from './styles/GlobalStyles';

// Import Page Components
import LanguageSelectionPage from './components/LanguageSelectionPage';
// English Pages - Account Opening flow
import LandingPage_EN from './accountOpening/LandingPage_EN';
import SelectUserPage_EN from './accountOpening/SelectUserPage_EN';
import CompaniesDocsPage_EN from './accountOpening/CompaniesDocsPage_EN';
import ContactInfoPage_EN from './accountOpening/ContactInfoPage_EN';
import WorkInfoPage_EN from './accountOpening/WorkInfoPage_EN';
import PersonalInfoPage_EN from './accountOpening/PersonalInfoPage_EN';
import CompanyInfoPage_EN from './accountOpening/CompanyInfoPage_EN';
import CompanyContactPage_EN from './accountOpening/CompanyContactPage_EN';
import LegalRepInfoPage_EN from './accountOpening/LegalRepInfoPage_EN';
import FinancialInfoPage_EN from './accountOpening/FinancialInfoPage_EN';
import SuccessPage_EN from './accountOpening/SuccessPage_EN';
import ConfirmPage_EN from './accountOpening/ConfirmPage_EN';
import EServicesLanding from './eServices/EServicesLandingPage';
import SequentialDocsPage_EN from './accountOpening/SequentialDocsPage_EN';
import LookupPage_EN from './completeAccount/LookupPage_EN';


// ---=== Main App Component ===---
const AppContent = () => {
  const [navigation, setNavigation] = useState({ page: 'languageSelection', flow: null, state: null });
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('data-theme', theme);
  }, [theme, language]);

  const handleNavigation = (page, state = null) => {
    let currentFlow = navigation.flow;

    if (page.startsWith('personal')) currentFlow = 'personal';
    else if (page.startsWith('guaranteed')) currentFlow = 'guaranteed';
    else if (page.startsWith('expat')) currentFlow = 'expat';
    else if (page.startsWith('businessmen')) currentFlow = 'businessmen';
    else if (page.startsWith('companies')) currentFlow = 'companies';
    else if (page === 'selectUser' || page === 'landing' || page === 'languageSelection' || page === 'success') currentFlow = null;

    setNavigation({ page, flow: currentFlow, state });
  };

  const renderPage = () => {
      const { page, flow, state } = navigation;

      if (page === 'languageSelection') {
          return <LanguageSelectionPage onNavigate={handleNavigation} />;
      }

      switch(page) {
            case 'landing': return <LandingPage_EN onNavigate={handleNavigation} />;
            case 'eServices': return <EServicesLanding onNavigate={handleNavigation} />;
            case 'selectUser': return <SelectUserPage_EN onNavigate={handleNavigation} />;
            case 'completeAccount': return <LookupPage_EN onNavigate={handleNavigation} />;
            
            case 'personalDocs':
            case 'businessmenDocs':
            case 'guaranteedDocs':
            case 'expatDocs':
              return <SequentialDocsPage_EN onNavigate={handleNavigation} backPage="selectUser" nextPage="contactInfo" />;

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
                if (flow === 'expat') backPage = 'expatDocs';
                return <ContactInfoPage_EN onNavigate={handleNavigation} backPage={backPage} nextPage="workInfo" />;
            }
            case 'workInfo': return <WorkInfoPage_EN onNavigate={handleNavigation} backPage="contactInfo" nextPage="personalInfo" />;
            case 'personalInfo': return <PersonalInfoPage_EN onNavigate={handleNavigation} backPage="workInfo" flow={flow} state={state} />;
            case 'confirm': return <ConfirmPage_EN onNavigate={handleNavigation} state={state} />;
            
            case 'success': return <SuccessPage_EN onNavigate={handleNavigation} state={state} />;
            default: return <LanguageSelectionPage onNavigate={handleNavigation} />;
        }
  }

  return <>{renderPage()}</>;
}


export default function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <FormProvider>
                    <GlobalStyles />
                    <AppContent />
                </FormProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
}
