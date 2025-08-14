export const translations = {
  en: {
    recruitment: "Recruitment",
    dashboard: "Dashboard",
    jobRequisition: "Job Requisition",
    candidate: "Candidate",
    interview: "Interview",
    offer: "Offer",
    onboarding: "Onboarding",
    careersPortalSetup: "Careers Portal Setup",
    welcomeToWise: "Welcome to Attract",
    contentComingSoon: "Content coming soon",
    language: "EN",
  },
  ar: {
    recruitment: "التوظيف",
    dashboard: "لوحة القيادة",
    jobRequisition: "طلب الوظيفة",
    candidate: "المرشح",
    interview: "المقابلة",
    offer: "العرض",
    onboarding: "التعاقد",
    careersPortalSetup: "إعداد بوابة الوظائف",
    welcomeToWise: "مرحبا بكم في Attract",
    contentComingSoon: "المحتوى قادم قريبا",
    language: "عربي",
  },
};

export type LanguageKey = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
