const translations = {
  back: { en: 'Back', ar: 'العودة' },
  next: { en: 'Next', ar: 'التالي' },
  requiredDocs: { en: 'Required Documents', ar: 'المستندات المطلوبة' },
  selectService: { en: 'Select Service Type', ar: 'اختر نوع الخدمة' },
  personal: { en: 'Personal', ar: 'شخصي' },
  guaranteed: { en: 'Guaranteed', ar: 'مضمونين' },
  businessmen: { en: 'Businessmen', ar: 'رجال أعمال' },
  companies: { en: 'Companies', ar: 'شركات' },
  expat: { en: 'Expat', ar: 'وافد' },
  openAccount: { en: 'Open a New Account', ar: 'فتح حساب جديد' },
  completeAccount: { en: 'Complete Account Opening', ar: 'إتمام عملية فتح الحساب' },
  welcomeSub: { en: 'Your gateway to modern banking services', ar: 'بوابتكم للخدمات المصرفية الحديثة' },
  welcomeTitle: { en: 'Daman Islamic Bank', ar: 'مصرف الضمان الإسلامي' },
  submitRequest: { en: 'Submit Application', ar: 'إرسال الطلب' },
  successTitle: { en: 'Success!', ar: 'تم بنجاح!' },
  successMsg: {
    en: 'Your request has been submitted successfully. We will contact you shortly.',
    ar: 'تم تقديم طلبك بنجاح. سوف نتواصل معك قريباً.'
  },
  backToHome: { en: 'Back to Home', ar: 'العودة للرئيسية' },
  eservicesTitle: { en: 'E-Services Registration', ar: 'التسجيل في الخدمات الإلكترونية' },
  eservicesSub: { en: 'This service is under construction.', ar: 'هذه الخدمة قيد التطوير' },
  english: { en: 'English', ar: 'الإنجليزية' },
  arabic: { en: 'Arabic', ar: 'العربية' }
};

export const t = (key, lang = 'en') => {
  return translations[key] ? translations[key][lang] : key;
};

export default translations;
