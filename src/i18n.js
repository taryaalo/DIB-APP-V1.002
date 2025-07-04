const translations = {
  back: { en: 'Back', ar: 'العودة' },
  next: { en: 'Next', ar: 'التالي' },
  requiredDocs: { en: 'Required Documents', ar: 'المستندات المطلوبة' },
  selectService: { en: 'Select Service Type', ar: 'اختر نوع الخدمة' },
  personal: { en: 'Personal', ar: 'شخصي' },
  guaranteed: { en: 'Guaranteed', ar: 'مضمونين' },
  businessmen: { en: 'Businessmen', ar: 'رجال أعمال' },
  companies: { en: 'Companies', ar: 'شركات' },
  openAccount: { en: 'Open a New Account', ar: 'فتح حساب جديد' },
  completeAccount: { en: 'Complete Account Opening', ar: 'إتمام عملية فتح الحساب' },
  welcomeSub: { en: 'Your gateway to modern banking services', ar: 'بوابتكم للخدمات المصرفية الحديثة' },
  welcomeTitle: { en: 'Daman Islamic Bank', ar: 'مصرف الضمان الإسلامي' },
  submitRequest: { en: 'Submit Application', ar: 'إرسال الطلب' }
};

export const t = (key, lang = 'en') => {
  return translations[key] ? translations[key][lang] : key;
};

export default translations;
