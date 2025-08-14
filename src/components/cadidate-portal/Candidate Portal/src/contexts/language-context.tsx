import React from 'react';

// Define language types
export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

// Create language context types
interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

// Define translations
interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Translation strings
const translations: Translations = {
  // Common
  'app.title': {
    en: 'Wise Recruitment',
    ar: 'وايز للتوظيف'
  },
  'common.loading': {
    en: 'Loading...',
    ar: 'جاري التحميل...'
  },
  'common.search': {
    en: 'Search',
    ar: 'بحث'
  },
  'common.cancel': {
    en: 'Cancel',
    ar: 'إلغاء'
  },
  'common.save': {
    en: 'Save',
    ar: 'حفظ'
  },
  'common.submit': {
    en: 'Submit',
    ar: 'إرسال'
  },
  'common.apply': {
    en: 'Apply',
    ar: 'تقديم'
  },
  'common.delete': {
    en: 'Delete',
    ar: 'حذف'
  },
  'common.edit': {
    en: 'Edit',
    ar: 'تعديل'
  },
  'common.view': {
    en: 'View',
    ar: 'عرض'
  },
  'common.upload': {
    en: 'Upload',
    ar: 'تحميل'
  },
  'common.download': {
    en: 'Download',
    ar: 'تنزيل'
  },
  'common.success': {
    en: 'Success',
    ar: 'تم بنجاح'
  },
  'common.error': {
    en: 'Error',
    ar: 'خطأ'
  },
  'common.retry': {
    en: 'Retry',
    ar: 'إعادة المحاولة'
  },

  // Navigation
  'nav.home': {
    en: 'Home',
    ar: 'الرئيسية'
  },
  'nav.jobs': {
    en: 'Jobs',
    ar: 'الوظائف'
  },
  'nav.applications': {
    en: 'Applications',
    ar: 'الطلبات'
  },
  'nav.profile': {
    en: 'Profile',
    ar: 'الملف الشخصي'
  },
  'nav.interviews': {
    en: 'Interviews',
    ar: 'المقابلات'
  },
  'nav.logout': {
    en: 'Logout',
    ar: 'تسجيل الخروج'
  },

  // Auth
  'auth.login': {
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'auth.register': {
    en: 'Register',
    ar: 'تسجيل'
  },
  'auth.email': {
    en: 'Email',
    ar: 'البريد الإلكتروني'
  },
  'auth.password': {
    en: 'Password',
    ar: 'كلمة المرور'
  },
  'auth.confirmPassword': {
    en: 'Confirm Password',
    ar: 'تأكيد كلمة المرور'
  },
  'auth.fullName': {
    en: 'Full Name',
    ar: 'الاسم الكامل'
  },
  'auth.country': {
    en: 'Country',
    ar: 'الدولة'
  },
  'auth.mobile': {
    en: 'Mobile Number',
    ar: 'رقم الهاتف المحمول'
  },
  'auth.resumeUpload': {
    en: 'Resume Upload',
    ar: 'تحميل السيرة الذاتية'
  },
  'auth.termsAndConditions': {
    en: 'I accept the Terms and Conditions',
    ar: 'أوافق على الشروط والأحكام'
  },
  'auth.forgotPassword': {
    en: 'Forgot Password?',
    ar: 'نسيت كلمة المرور؟'
  },
  'auth.noAccount': {
    en: 'Don\'t have an account?',
    ar: 'ليس لديك حساب؟'
  },
  'auth.haveAccount': {
    en: 'Already have an account?',
    ar: 'لديك حساب بالفعل؟'
  },
  'auth.continueWithGoogle': {
    en: 'Continue with Google',
    ar: 'المتابعة باستخدام جوجل'
  },
  'auth.continueWithLinkedIn': {
    en: 'Continue with LinkedIn',
    ar: 'المتابعة باستخدام لينكد إن'
  },
  'auth.continueWithApple': {
    en: 'Continue with Apple',
    ar: 'المتابعة باستخدام آبل'
  },
  'auth.or': {
    en: 'OR',
    ar: 'أو'
  },
  'auth.welcomeBack': {
    en: 'Welcome back',
    ar: 'مرحبًا بعودتك'
  },
  'auth.createAccount': {
    en: 'Create your account',
    ar: 'إنشاء حسابك'
  },

  // Profile
  'profile.title': {
    en: 'Profile',
    ar: 'الملف الشخصي'
  },
  'profile.personalInfo': {
    en: 'Personal Information',
    ar: 'المعلومات الشخصية'
  },
  'profile.resume': {
    en: 'Resume',
    ar: 'السيرة الذاتية'
  },
  'profile.profilePicture': {
    en: 'Profile Picture',
    ar: 'الصورة الشخصية'
  },
  'profile.jobPreferences': {
    en: 'Job Preferences',
    ar: 'تفضيلات الوظائف'
  },
  'profile.education': {
    en: 'Education',
    ar: 'التعليم'
  },
  'profile.workExperience': {
    en: 'Work Experience',
    ar: 'الخبرة العملية'
  },
  'profile.skills': {
    en: 'Skills',
    ar: 'المهارات'
  },
  'profile.certifications': {
    en: 'Certifications',
    ar: 'الشهادات'
  },
  'profile.languages': {
    en: 'Languages',
    ar: 'اللغات'
  },
  'profile.socialMedia': {
    en: 'Social Media',
    ar: 'وسائل التواصل الاجتماعي'
  },
  'profile.exportResume': {
    en: 'Export Resume',
    ar: 'تصدير السيرة الذاتية'
  },
  'profile.completionStatus': {
    en: 'Profile Completion',
    ar: 'اكتمال الملف الشخصي'
  },
  'profile.suggestedFields': {
    en: 'AI Suggested Fields',
    ar: 'حقول مقترحة بالذكاء الاصطناعي'
  },

  // Jobs
  'jobs.search': {
    en: 'Search Jobs',
    ar: 'البحث عن وظائف'
  },
  'jobs.filters': {
    en: 'Filters',
    ar: 'التصفية'
  },
  'jobs.keyword': {
    en: 'Keyword',
    ar: 'الكلمة المفتاحية'
  },
  'jobs.jobType': {
    en: 'Job Type',
    ar: 'نوع الوظيفة'
  },
  'jobs.department': {
    en: 'Department',
    ar: 'القسم'
  },
  'jobs.country': {
    en: 'Country',
    ar: 'الدولة'
  },
  'jobs.recommended': {
    en: 'Recommended for You',
    ar: 'موصى به لك'
  },
  'jobs.matchScore': {
    en: 'Match Score',
    ar: 'درجة التطابق'
  },
  'jobs.similarJobs': {
    en: 'Similar Jobs',
    ar: 'وظائف مشابهة'
  },
  'jobs.apply': {
    en: 'Apply Now',
    ar: 'تقديم الآن'
  },
  'jobs.applyWithProfile': {
    en: 'Apply with Profile',
    ar: 'التقديم بالملف الشخصي'
  },
  'jobs.uploadResume': {
    en: 'Upload New Resume',
    ar: 'تحميل سيرة ذاتية جديدة'
  },
  'jobs.coverLetter': {
    en: 'Cover Letter',
    ar: 'خطاب تعريفي'
  },
  'jobs.generateCoverLetter': {
    en: 'Generate with AI',
    ar: 'توليد بالذكاء الاصطناعي'
  },
  'jobs.applicationSubmitted': {
    en: 'Application Submitted',
    ar: 'تم تقديم الطلب'
  },

  // Applications
  'applications.title': {
    en: 'My Applications',
    ar: 'طلباتي'
  },
  'applications.jobTitle': {
    en: 'Job Title',
    ar: 'المسمى الوظيفي'
  },
  'applications.appliedDate': {
    en: 'Applied Date',
    ar: 'تاريخ التقديم'
  },
  'applications.status': {
    en: 'Status',
    ar: 'الحالة'
  },
  'applications.recruiterNotes': {
    en: 'Recruiter Notes',
    ar: 'ملاحظات المسؤول'
  },
  'applications.withdraw': {
    en: 'Withdraw',
    ar: 'سحب الطلب'
  },
  'applications.fitScore': {
    en: 'AI Fit Score',
    ar: 'درجة التوافق'
  },

  // Interviews
  'interviews.title': {
    en: 'Interviews',
    ar: 'المقابلات'
  },
  'interviews.upcoming': {
    en: 'Upcoming',
    ar: 'القادمة'
  },
  'interviews.past': {
    en: 'Past',
    ar: 'السابقة'
  },
  'interviews.status': {
    en: 'Status',
    ar: 'الحالة'
  },
  'interviews.type': {
    en: 'Interview Type',
    ar: 'نوع المقابلة'
  },
  'interviews.schedule': {
    en: 'Schedule',
    ar: 'الجدول الزمني'
  },
  'interviews.reschedule': {
    en: 'Reschedule',
    ar: 'إعادة الجدولة'
  },
  'interviews.location': {
    en: 'Location',
    ar: 'الموقع'
  },
  'interviews.instructions': {
    en: 'Instructions',
    ar: 'التعليمات'
  },
  'interviews.preparation': {
    en: 'Interview Preparation',
    ar: 'الإعداد للمقابلة'
  },
  'interviews.sampleQuestions': {
    en: 'Sample Questions',
    ar: 'أسئلة نموذجية'
  },
  'interviews.suggestedAnswers': {
    en: 'Suggested Answers',
    ar: 'إجابات مقترحة'
  },

  // Notifications
  'notifications.title': {
    en: 'Notifications',
    ar: 'الإشعارات'
  },
  'notifications.markAllRead': {
    en: 'Mark All as Read',
    ar: 'تعيين الكل كمقروء'
  },
  'notifications.clearAll': {
    en: 'Clear All',
    ar: 'مسح الكل'
  },
  'notifications.new': {
    en: 'New',
    ar: 'جديد'
  },
  'notifications.earlier': {
    en: 'Earlier',
    ar: 'سابقًا'
  },
  'notifications.noNotifications': {
    en: 'No notifications',
    ar: 'لا توجد إشعارات'
  },

  // AI Features
  'ai.processing': {
    en: 'AI Processing',
    ar: 'المعالجة بالذكاء الاصطناعي'
  },
  'ai.confidenceLevel': {
    en: 'Confidence Level',
    ar: 'مستوى الثقة'
  },
  'ai.suggestions': {
    en: 'AI Suggestions',
    ar: 'اقتراحات الذكاء الاصطناعي'
  },
  'ai.parsed': {
    en: 'Parsed from Resume',
    ar: 'تم استخراجه من السيرة الذاتية'
  },
};

// Create the context
export const LanguageContext = React.createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  setLanguage: () => {},
  translate: () => '',
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = React.useState<Language>(
    localStorage.getItem('language') as Language || 'en'
  );
  
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  // Set language and store it in localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Function to translate keys
  const translate = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key; // fallback to key if translation is missing
    return translation[language] || key;
  };

  // Set initial direction
  React.useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => React.useContext(LanguageContext);
