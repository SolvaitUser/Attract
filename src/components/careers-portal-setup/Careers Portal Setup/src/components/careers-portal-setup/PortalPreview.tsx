import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Avatar } from "@heroui/react";
import { LanguageKey } from "../../data/translations";
import { JobApplicationModal } from "./job-application/JobApplicationModal";
import { JobDetailsModal } from "./job-details/JobDetailsModal";

interface PortalSettings {
  branding: {
    companyName: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    bannerImage: string;
  };
  content: {
    headline: string;
    subheadline: string;
    aboutCompany: string;
    footerText: string;
  };
  layout: {
    theme: string;
    showFilters: boolean;
    cardsDisplay: string;
    showTestimonials: boolean;
    heroStyle: string;
    testimonialStyle: string;
    benefitsLayout: string;
    videoSource: string;
    selectedVideoId: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  benefits: {
    id: string;
    icon: string;
    title: string;
    description: string;
  }[];
  testimonials: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    quote: string;
  }[];
}

interface PortalPreviewProps {
  settings: PortalSettings;
  device: "desktop" | "tablet" | "mobile";
  language: LanguageKey;
  direction: "ltr" | "rtl";
}

export const PortalPreview: React.FC<PortalPreviewProps> = ({ settings, device, language, direction }) => {
  // Define device dimensions
  const deviceDimensions = {
    desktop: { width: "1200px", maxWidth: "100%", height: "auto", scale: 1 },
    tablet: { width: "900px", maxWidth: "100%", height: "auto", scale: 1 },
    mobile: { width: "390px", maxWidth: "100%", height: "auto", scale: 1 }
  };
  
  // Sample job data
  const jobs = [
    { 
      title: language === "en" ? "Senior Software Engineer" : "مهندس برمجيات أول", 
      department: language === "en" ? "Engineering" : "الهندسة", 
      location: language === "en" ? "San Francisco, CA" : "سان فرانسيسكو، كاليفورنيا",
      type: language === "en" ? "Full-time" : "دوام كامل"
    },
    { 
      title: language === "en" ? "UX Designer" : "مصمم تجربة المستخدم", 
      department: language === "en" ? "Design" : "التصميم", 
      location: language === "en" ? "Remote" : "عن بعد",
      type: language === "en" ? "Full-time" : "دوام كامل"
    },
    { 
      title: language === "en" ? "Product Manager" : "مدير المنتج", 
      department: language === "en" ? "Product" : "المنتج", 
      location: language === "en" ? "New York, NY" : "نيويورك",
      type: "Full-time"
    },
    { 
      title: language === "en" ? "Marketing Specialist" : "أخصائي تسويق", 
      department: language === "en" ? "Marketing" : "التسويق", 
      location: language === "en" ? "Austin, TX" : "أوستن، تكساس",
      type: language === "en" ? "Contract" : "عقد"
    }
  ];
  
  // Add a state for animated hero text if that style is selected
  const [animatedTextIndex, setAnimatedTextIndex] = React.useState(0);
  
  // Add or update these state variables
  const [isApplicationModalOpen, setIsApplicationModalOpen] = React.useState(false);
  const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<any>(null);
  const [shareModalOpen, setShareModalOpen] = React.useState(false);
  const [jobToShare, setJobToShare] = React.useState<any>(null);
  
  // Function to handle job application
  const handleApplyToJob = (job: any) => {
    setSelectedJob(job);
    setIsJobDetailsModalOpen(true);
  };
  
  // New function to handle direct application from details page
  const handleStartApplication = () => {
    setIsJobDetailsModalOpen(false);
    setIsApplicationModalOpen(true);
  };
  
  // Function to handle job sharing
  const handleShareJob = (job: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setJobToShare(job);
    setShareModalOpen(true);
  };
  
  // For animated text hero style
  const animatedTexts = [
    language === "en" ? "Join our innovative team" : "انضم إلى فريقنا المبتكر",
    language === "en" ? "Build the future with us" : "ابني المستقبل معنا",
    language === "en" ? "Grow your career here" : "نمِّ مسيرتك المهنية هنا",
  ];
  
  React.useEffect(() => {
    // Only run animation if hero style is "animated"
    if (settings.layout.heroStyle === "animated") {
      const interval = setInterval(() => {
        setAnimatedTextIndex(prev => (prev + 1) % animatedTexts.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [settings.layout.heroStyle, language]);
  
  // Add this function to get the appropriate video source based on settings
  const getVideoSource = () => {
    if (settings.layout.videoSource === 'upload') {
      // If a custom video was uploaded, we'd return that URL
      return "#"; // Placeholder - in a real app this would be the uploaded video URL
    } else {
      // Return a predefined video based on selected ID
      const videoId = settings.layout.selectedVideoId || 'recruiting1';
      // Map video IDs to actual source URLs
      const videoMap: Record<string, string> = {
        'recruiting1': 'https://img.heroui.chat/image/business?w=1200&h=800&u=video1',
        'recruiting2': 'https://img.heroui.chat/image/business?w=1200&h=800&u=video2',
        'recruiting3': 'https://img.heroui.chat/image/business?w=1200&h=800&u=video3',
        'recruiting4': 'https://img.heroui.chat/image/business?w=1200&h=800&u=video4',
      };
      
      return videoMap[videoId];
    }
  };

  // Apply theme-specific styling
  const getThemeStyles = () => {
    switch(settings.layout.theme) {
      case "modern":
        return {
          fontClass: "font-sans",
          buttonRadius: "rounded-md",
          cardRadius: "rounded-lg",
          headerStyle: "shadow-sm",
          cardStyle: "border hover:border-primary-200 transition-all duration-300",
        };
      case "classic":
        return {
          fontClass: "font-serif",
          buttonRadius: "rounded",
          cardRadius: "rounded",
          headerStyle: "border-b",
          cardStyle: "border-2 shadow-sm hover:shadow-md transition-all duration-300",
        };
      case "minimal":
        return {
          fontClass: "font-sans",
          buttonRadius: "rounded-none",
          cardRadius: "rounded-none",
          headerStyle: "border-b",
          cardStyle: "border-b border-l-0 border-r-0 border-t-0 hover:bg-default-50 transition-all duration-300",
        };
      case "bold":
        return {
          fontClass: "font-sans font-medium",
          buttonRadius: "rounded-xl",
          cardRadius: "rounded-xl",
          headerStyle: "shadow-md bg-gradient-to-r from-primary-500 to-secondary-500",
          cardStyle: "border-0 shadow-md hover:shadow-lg transition-all duration-300",
        };
      default:
        return {
          fontClass: "font-sans",
          buttonRadius: "rounded-md",
          cardRadius: "rounded-lg",
          headerStyle: "shadow-sm",
          cardStyle: "border hover:border-primary-200 transition-all duration-300",
        };
    }
  };
  
  const themeStyles = getThemeStyles();
  
  const heroVariants = {
    fullwidth: "w-full",
    contained: "max-w-6xl mx-auto px-6",
    split: "flex flex-wrap md:flex-nowrap"
  };
  
  const currentDate = new Date().toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="relative">
      <motion.div
        className={`portal-preview-frame bg-white shadow-large overflow-hidden ${themeStyles.fontClass}`}
        style={{ 
          width: deviceDimensions[device].width,
          maxWidth: deviceDimensions[device].maxWidth,
          height: deviceDimensions[device].height,
          transform: `scale(${deviceDimensions[device].scale})`,
          transformOrigin: "top center",
          borderRadius: settings.layout.theme === "bold" ? "1rem" : "0.5rem",
          margin: "0 auto"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`h-full overflow-x-hidden ${direction}`}>
          {/* Header - styled according to theme */}
          <header className={`sticky top-0 bg-white z-10 ${themeStyles.headerStyle} ${settings.layout.theme === "bold" ? "text-white" : ""}`}>
            {settings.layout.theme === "bold" ? (
              <div className="w-full px-4 sm:px-6 flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <img src={settings.branding.logo || settings.branding.logo} alt="Logo" className="h-8 w-auto" />
                  <span className="font-bold text-lg">{settings.branding.companyName}</span>
                </div>
                
                <nav>
                  <ul className="flex items-center gap-6 text-sm">
                    <li>{language === "en" ? "Home" : "الرئيسية"}</li>
                    <li className="font-bold">{language === "en" ? "Jobs" : "الوظائف"}</li>
                    <li>{language === "en" ? "About" : "عن الشركة"}</li>
                    <li>{language === "en" ? "Contact" : "اتصل بنا"}</li>
                  </ul>
                </nav>
              </div>
            ) : (
              <div className="w-full px-4 sm:px-6 flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <img src={settings.branding.logo || settings.branding.logo} alt="Logo" className="h-8 w-auto" />
                  <span className={`${settings.layout.theme === "minimal" ? "uppercase tracking-wider text-base" : "font-semibold text-lg"}`}>
                    {settings.branding.companyName}
                  </span>
                </div>
                
                <nav>
                  <ul className="flex items-center gap-6 text-sm">
                    <li>{language === "en" ? "Home" : "الرئيسية"}</li>
                    <li 
                      className={settings.layout.theme === "minimal" ? 
                        "border-b-2 font-medium" : 
                        "font-medium"
                      } 
                      style={{ 
                        color: settings.branding.primaryColor,
                        borderColor: settings.layout.theme === "minimal" ? settings.branding.primaryColor : "transparent"
                      }}
                    >
                      {language === "en" ? "Jobs" : "الوظائف"}
                    </li>
                    <li>{language === "en" ? "About" : "عن الشركة"}</li>
                    <li style={{ color: settings.branding.secondaryColor }}>{language === "en" ? "Contact" : "اتصل بنا"}</li>
                  </ul>
                </nav>
              </div>
            )}
          </header>
          
          {/* Hero Section - changes based on heroStyle */}
          {settings.layout.heroStyle === "video" ? (
            <section className="relative">
              {/* Video background implementation */}
              <div className="relative bg-gray-900 overflow-hidden">
                {/* Simulated video background - in production this would be a real <video> element */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800">
                  {/* Video thumbnail overlay for simulation */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ 
                      backgroundImage: `url(${getVideoSource()})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  
                  {/* Video controls - simulated */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-md">
                    <Icon icon="lucide:play" className="text-white" width={16} />
                    <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-white rounded-full"></div>
                    </div>
                    <span className="text-white text-xs">0:25</span>
                    <Icon icon="lucide:volume-2" className="text-white ml-2" width={16} />
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <motion.h1 
                    className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {settings.content.headline}
                  </motion.h1>
                  <motion.p 
                    className="text-base sm:text-xl opacity-90 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {settings.content.subheadline}
                  </motion.p>
                  
                  <motion.div 
                    className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <button 
                      className={`px-4 sm:px-6 py-2.5 ${themeStyles.buttonRadius} font-medium text-white`}
                      style={{ backgroundColor: settings.branding.primaryColor }}
                    >
                      {language === "en" ? "View Open Positions" : "عرض الوظائف المتاحة"}
                    </button>
                    <button 
                      className={`px-4 sm:px-6 py-2.5 ${themeStyles.buttonRadius} font-medium bg-transparent border-2`}
                      style={{ borderColor: settings.branding.secondaryColor, color: 'white' }}
                    >
                      {language === "en" ? "Watch Our Story" : "شاهد قصتنا"}
                    </button>
                  </motion.div>
                </div>
              </div>
            </section>
          ) : settings.layout.heroStyle === "animated" ? (
            <section 
              className="relative"
              style={{
                backgroundImage: `url(${settings.branding.bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                <motion.div 
                  className="overflow-hidden flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                                  <motion.h1 
                  key={animatedTextIndex}
                  className="text-2xl lg:text-4xl font-bold text-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {animatedTexts[animatedTextIndex]}
                </motion.h1>
                </motion.div>
                <motion.p 
                  className="text-lg lg:text-xl opacity-90 text-center max-w-2xl mx-auto mb-6 lg:mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {settings.content.subheadline}
                </motion.p>
                
                <motion.div 
                  className="flex flex-col lg:flex-row justify-center gap-3 lg:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <button 
                    className={`px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base ${themeStyles.buttonRadius} font-medium text-white`}
                    style={{ backgroundColor: settings.branding.primaryColor }}
                  >
                    {language === "en" ? "Explore Opportunities" : "استكشاف الفرص"}
                  </button>
                  <button 
                    className={`px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base ${themeStyles.buttonRadius} font-medium bg-transparent border-2`}
                    style={{ borderColor: settings.branding.secondaryColor, color: 'white' }}
                  >
                    {language === "en" ? "Learn More" : "تعرف أكثر"}
                  </button>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-6 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <div className="flex gap-2">
                    {animatedTexts.map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-2 h-2 rounded-full ${index === animatedTextIndex ? 'bg-white' : 'bg-white bg-opacity-30'}`}
                      ></div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          ) : (
            <section 
              className="relative"
              style={{ 
                backgroundImage: `url(${settings.branding.bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              
              <div className={`relative py-16 px-6 text-white ${heroVariants[settings.layout.heroStyle] || heroVariants.fullwidth}`}>
                {settings.layout.heroStyle === "split" ? (
                  <>
                    <div className="md:w-1/2 mb-8 md:mb-0">
                                      <h1 className={`text-2xl md:text-4xl ${settings.layout.theme === "bold" ? "font-bold" : "font-semibold"} mb-3 md:mb-4`}>
                  {settings.content.headline}
                </h1>
                <p className={`text-lg md:text-xl opacity-90 ${settings.layout.theme === "minimal" ? "font-light" : ""}`}>
                  {settings.content.subheadline}
                </p>
                      
                      <button 
                        className={`mt-6 px-6 py-2.5 ${themeStyles.buttonRadius} font-medium text-white`}
                        style={{ backgroundColor: settings.branding.primaryColor }}
                      >
                        {language === "en" ? "View Open Positions" : "عرض الوظائف المتاحة"}
                      </button>
                    </div>
                    
                    <div className="md:w-1/2 p-6">
                      <div className={`bg-white ${themeStyles.cardRadius} p-6 ${settings.layout.theme === "bold" ? "shadow-lg" : "shadow"} text-gray-800`}>
                        <h3 className={`text-lg ${settings.layout.theme === "bold" ? "font-bold" : "font-medium"} mb-2`}>
                          {language === "en" ? "Quick Job Search" : "بحث سريع عن وظيفة"}
                        </h3>
                        <div className="space-y-3">
                          <div className={`bg-gray-100 ${themeStyles.buttonRadius} px-3 py-2`}>
                            <div className="text-sm text-gray-500">{language === "en" ? "Keywords" : "الكلمات المفتاحية"}</div>
                          </div>
                          <div className={`bg-gray-100 ${themeStyles.buttonRadius} px-3 py-2`}>
                            <div className="text-sm text-gray-500">{language === "en" ? "Location" : "الموقع"}</div>
                          </div>
                          <button 
                            className={`w-full px-4 py-2 ${themeStyles.buttonRadius} text-white`}
                            style={{ backgroundColor: settings.branding.secondaryColor }}
                          >
                            {language === "en" ? "Search" : "بحث"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 
                      className={`text-2xl sm:text-4xl ${settings.layout.theme === "minimal" ? "font-light uppercase tracking-wider" : settings.layout.theme === "bold" ? "font-bold" : "font-semibold"} mb-3 sm:mb-4 text-center`}
                    >
                      {settings.content.headline}
                    </h1>
                    <p className={`text-base sm:text-xl opacity-90 text-center max-w-2xl mx-auto ${settings.layout.theme === "minimal" ? "font-light" : ""}`}>
                      {settings.content.subheadline}
                    </p>
                    
                    <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                      <button 
                        className={`px-4 sm:px-6 py-2.5 ${themeStyles.buttonRadius} font-medium text-white 
                          ${settings.layout.theme === "bold" ? "shadow-lg hover:shadow-xl transition-shadow" : ""}
                        `}
                        style={{ backgroundColor: settings.branding.primaryColor }}
                      >
                        {language === "en" ? "View Open Positions" : "عرض الوظائف المتاحة"}
                      </button>
                      <button 
                        className={`px-4 sm:px-6 py-2.5 ${themeStyles.buttonRadius} font-medium bg-transparent border-2`}
                        style={{ borderColor: settings.branding.secondaryColor, color: 'white' }}
                      >
                        {language === "en" ? "Learn More" : "تعرف أكثر"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          )}
          
          {/* Job Listings Section - widen container for desktop */}
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="w-full">
              <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-center">
                {language === "en" ? "Open Positions" : "الوظائف المتاحة"}
              </h2>
              
              <div className="flex flex-col md:flex-row md:flex-nowrap flex-nowrap gap-4 md:gap-6 overflow-x-hidden">
                {/* Filters Sidebar */}
                {settings.layout.showFilters && (
                  <div className="w-full md:w-64 shrink-0">
                    <div 
                      className={`
                        ${settings.layout.theme === "minimal" ? "border-l border-t-0 border-r-0 border-b-0 rounded-none pl-4" : 
                          settings.layout.theme === "bold" ? "bg-white shadow-lg rounded-xl" : 
                          "bg-gray-50 rounded-lg"} 
                        p-3 md:p-4
                      `}
                    >
                      <h3 
                        className={`
                          ${settings.layout.theme === "bold" ? "font-bold" : "font-medium"} 
                          ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""} 
                          mb-2 md:mb-3 text-sm md:text-base
                        `} 
                        style={{ color: settings.branding.secondaryColor }}
                      >
                        {language === "en" ? "Filters" : "التصفية"}
                      </h3>
                      
                      <div className="space-y-3 md:space-y-4">
                        {/* Filter components styled according to theme */}
                        <div>
                          <label className={`block text-xs md:text-sm ${settings.layout.theme === "bold" ? "font-semibold" : "font-medium"} mb-1`}>
                            {language === "en" ? "Department" : "القسم"}
                          </label>
                          <select className={`w-full text-xs md:text-sm bg-white border ${themeStyles.buttonRadius} p-1.5 md:p-2 ${settings.layout.theme === "minimal" ? "border-b border-t-0 border-l-0 border-r-0 rounded-none" : ""}`}>
                            <option>{language === "en" ? "All Departments" : "كل الأقسام"}</option>
                            <option>{language === "en" ? "Engineering" : "الهندسة"}</option>
                            <option>{language === "en" ? "Design" : "التصميم"}</option>
                            <option>{language === "en" ? "Product" : "المنتج"}</option>
                            <option>{language === "en" ? "Marketing" : "التسويق"}</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className={`block text-xs md:text-sm ${settings.layout.theme === "bold" ? "font-semibold" : "font-medium"} mb-1`}>
                            {language === "en" ? "Location" : "الموقع"}
                          </label>
                          <select className={`w-full text-xs md:text-sm bg-white border ${themeStyles.buttonRadius} p-1.5 md:p-2 ${settings.layout.theme === "minimal" ? "border-b border-t-0 border-l-0 border-r-0 rounded-none" : ""}`}>
                            <option>{language === "en" ? "All Locations" : "كل المواقع"}</option>
                            <option>{language === "en" ? "Remote" : "عن بعد"}</option>
                            <option>{language === "en" ? "San Francisco" : "سان فرانسيسكو"}</option>
                            <option>{language === "en" ? "New York" : "نيويورك"}</option>
                            <option>{language === "en" ? "Austin" : "أوستن"}</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className={`block text-xs md:text-sm ${settings.layout.theme === "bold" ? "font-semibold" : "font-medium"} mb-1`}>
                            {language === "en" ? "Job Type" : "نوع الوظيفة"}
                          </label>
                          <select className={`w-full text-xs md:text-sm bg-white border ${themeStyles.buttonRadius} p-1.5 md:p-2 ${settings.layout.theme === "minimal" ? "border-b border-t-0 border-l-0 border-r-0 rounded-none" : ""}`}>
                            <option>{language === "en" ? "All Types" : "كل الأنواع"}</option>
                            <option>{language === "en" ? "Full-time" : "دوام كامل"}</option>
                            <option>{language === "en" ? "Part-time" : "دوام جزئي"}</option>
                            <option>{language === "en" ? "Contract" : "عقد"}</option>
                            <option>{language === "en" ? "Internship" : "تدريب"}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Job Cards */}
                <div className="w-full flex-1 min-w-0">
                  <div className={settings.layout.cardsDisplay === "grid" ? "grid w-full grid-cols-1 gap-4 md:grid-cols-2" : "block w-full space-y-4"}>
                    {jobs.map((job, index) => (
                      <div 
                        key={index} 
                        className="w-full border rounded-lg p-4 bg-white hover:border-blue-300 transition-colors cursor-pointer min-w-0 box-border"
                        style={{ borderColor: index % 2 === 1 ? `${settings.branding.secondaryColor}30` : '' }}
                        onClick={() => handleApplyToJob(job)}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium mb-2 text-sm lg:text-base truncate" title={job.title}>
                              {job.title}
                            </h3>
                            <div className="text-xs lg:text-sm text-gray-600 space-y-1">
                              <div className="flex items-center gap-1 min-w-0">
                                <Icon icon="lucide:briefcase" width={12} className="lg:w-3.5 flex-shrink-0" style={{ color: index % 2 === 1 ? settings.branding.secondaryColor : '' }} />
                                <span className="truncate">{job.department}</span>
                              </div>
                              <div className="flex items-center gap-1 min-w-0">
                                <Icon icon="lucide:map-pin" width={12} className="lg:w-3.5 flex-shrink-0" style={{ color: index % 2 === 1 ? settings.branding.secondaryColor : '' }} />
                                <span className="truncate">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1 min-w-0">
                                <Icon icon="lucide:clock" width={12} className="lg:w-3.5 flex-shrink-0" style={{ color: index % 2 === 1 ? settings.branding.secondaryColor : '' }} />
                                <span className="truncate">{job.type}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-col gap-2">
                            <button
                              className="text-xs lg:text-sm px-3 py-2 rounded w-full"
                              style={{ 
                                backgroundColor: index % 2 === 1 ? settings.branding.secondaryColor : settings.branding.primaryColor,
                                color: 'white'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApplyToJob(job);
                              }}
                            >
                              {language === "en" ? "Apply" : "تقديم"}
                            </button>
                            <button
                              className="text-xs lg:text-sm px-3 py-2 rounded w-full flex items-center justify-center gap-1 border"
                              style={{ 
                                backgroundColor: 'transparent',
                                borderColor: index % 2 === 1 ? settings.branding.secondaryColor : settings.branding.primaryColor,
                                color: index % 2 === 1 ? settings.branding.secondaryColor : settings.branding.primaryColor
                              }}
                              onClick={(e) => handleShareJob(job, e)}
                            >
                              <Icon icon="lucide:share-2" width={12} className="lg:w-3.5" />
                              <span>{language === "en" ? "Share" : "مشاركة"}</span>
                            </button>
                          </div>
                          
                          <div className="text-xs mt-3 text-gray-500 text-center">
                            {language === "en" ? "Posted on " : "تم النشر في "} {currentDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button
                      className="px-4 py-2 border rounded-lg font-medium"
                      style={{ borderColor: settings.branding.secondaryColor, color: settings.branding.secondaryColor }}
                    >
                      {language === "en" ? "View All Positions" : "عرض كل الوظائف"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* About Company Section - Apply theme styling */}
          <section 
            className={`py-8 md:py-12 px-4 md:px-6 ${settings.layout.theme === "minimal" ? "bg-default-50" : "bg-white"}`}
            style={{ backgroundColor: settings.layout.theme !== "minimal" ? `${settings.branding.primaryColor}10` : "" }}
          >
            <div className="w-full">
              <div className="text-center mb-6 md:mb-8">
                <h2 
                  className={`text-xl md:text-2xl ${
                    settings.layout.theme === "bold" ? "font-bold" : 
                    settings.layout.theme === "minimal" ? "font-normal uppercase tracking-wider" : 
                    "font-semibold"
                  }`}
                >
                  {language === "en" ? "About Us" : "عن الشركة"}
                </h2>
                {settings.layout.theme !== "minimal" && (
                  <div className="w-16 md:w-20 h-1 mx-auto mt-2" style={{ backgroundColor: settings.branding.secondaryColor }}></div>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <div>
                  <p className={`${settings.layout.theme === "minimal" ? "text-base leading-relaxed" : "text-lg leading-relaxed"} ${settings.layout.theme === "classic" ? "font-serif" : ""}`}>
                    {settings.content.aboutCompany}
                  </p>
                  <div className="mt-6 flex flex-col lg:flex-row gap-3 justify-center lg:justify-start">
                    <button
                      className={`px-4 lg:px-5 py-2 ${themeStyles.buttonRadius} ${settings.layout.theme === "bold" ? "font-bold" : "font-medium"} ${settings.layout.theme === "bold" ? "shadow-md hover:shadow-lg transition-shadow" : ""}`}
                      style={{ 
                        backgroundColor: settings.branding.primaryColor,
                        color: 'white'
                      }}
                    >
                      {language === "en" ? "Learn More" : "تعرف أكثر"}
                    </button>
                    
                    <button
                      className={`px-4 lg:px-5 py-2 ${themeStyles.buttonRadius} ${settings.layout.theme === "bold" ? "font-bold" : "font-medium"} ${settings.layout.theme === "minimal" ? "underline border-0 bg-transparent" : "bg-transparent border"}`}
                      style={{ 
                        borderColor: settings.layout.theme !== "minimal" ? settings.branding.secondaryColor : "transparent",
                        color: settings.branding.secondaryColor
                      }}
                    >
                      {language === "en" ? "Watch Video" : "شاهد الفيديو"}
                    </button>
                  </div>
                </div>
                
                <div>
                  <img 
                    src="https://img.heroui.chat/image/business?w=600&h=400&u=2" 
                    alt="Company" 
                    className={`${themeStyles.cardRadius} ${settings.layout.theme === "bold" ? "shadow-xl" : "shadow"} w-full h-auto`}
                    style={{ 
                      border: settings.layout.theme === "bold" 
                        ? `none` 
                        : settings.layout.theme === "minimal" 
                          ? "none" 
                          : `3px solid ${settings.branding.secondaryColor}25`
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Benefits Section - Apply theme styling */}
          <section className={`py-8 md:py-12 px-4 md:px-6 ${settings.layout.theme === "minimal" ? "bg-white" : "bg-default-50"}`}>
            <div className="w-full">
              <div className="text-center mb-6 md:mb-8">
                <h2 
                  className={`text-xl md:text-2xl ${
                    settings.layout.theme === "bold" ? "font-bold" : 
                    settings.layout.theme === "minimal" ? "font-normal uppercase tracking-wider" : 
                    "font-semibold"
                  }`}
                >
                  {language === "en" ? "Why Join Us?" : "لماذا تنضم إلينا؟"}
                </h2>
                {settings.layout.theme === "bold" && (
                  <div className={`w-20 md:w-24 h-1 mx-auto mt-2 rounded-full bg-gradient-to-r`} style={{ 
                    backgroundImage: `linear-gradient(to right, ${settings.branding.primaryColor}, ${settings.branding.secondaryColor})` 
                  }}></div>
                )}
              </div>
              
              {settings.layout.benefitsLayout === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {settings.benefits.map((benefit, index) => (
                    <div 
                      key={benefit.id} 
                      className={`text-center p-4 ${
                        settings.layout.theme === "bold" ? "bg-white shadow-md rounded-xl transform hover:-translate-y-1 transition-all duration-300" : 
                        settings.layout.theme === "minimal" ? "" : 
                        ""
                      }`}
                    >
                      <div 
                        className={`w-14 h-14 mx-auto mb-4 ${settings.layout.theme === "bold" ? "rounded-xl" : "rounded-full"} flex items-center justify-center`}
                        style={{ 
                          backgroundColor: index % 2 === 0 
                            ? `${settings.branding.primaryColor}15` 
                            : `${settings.branding.secondaryColor}15` 
                        }}
                      >
                        <Icon 
                          icon={benefit.icon} 
                          width={24} 
                          style={{ 
                            color: index % 2 === 0 
                              ? settings.branding.primaryColor 
                              : settings.branding.secondaryColor 
                          }}
                        />
                      </div>
                      <h3 
                        className={`
                          ${settings.layout.theme === "bold" ? "font-bold text-lg" : "font-medium"}
                          ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""}
                        `}
                      >
                        {benefit.title}
                      </h3>
                      <p 
                        className={`
                          text-sm mt-2 text-gray-600
                          ${settings.layout.theme === "minimal" ? "font-light" : ""}
                          ${settings.layout.theme === "classic" ? "font-serif" : ""}
                        `}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                                  <div className="space-y-4 w-full">
                  {settings.benefits.map((benefit, index) => (
                    <div 
                      key={benefit.id} 
                      className={`flex items-start p-4 ${themeStyles.cardRadius} ${
                        settings.layout.theme === "bold" ? "bg-white shadow-md hover:shadow-lg transition-shadow" : 
                        settings.layout.theme === "minimal" ? "border-b border-t-0 border-l-0 border-r-0" : 
                        "border"
                      }`} 
                      style={{ 
                        borderColor: settings.layout.theme === "minimal" 
                          ? "#e5e7eb" 
                          : index % 2 === 0 
                            ? `${settings.branding.primaryColor}30`
                            : `${settings.branding.secondaryColor}30`
                      }}
                    >
                      <div 
                        className={`
                          w-12 h-12 ${settings.layout.theme === "bold" ? "rounded-xl" : "rounded-full"} 
                          flex items-center justify-center flex-shrink-0
                        `}
                        style={{ 
                          backgroundColor: index % 2 === 0 
                            ? `${settings.branding.primaryColor}15` 
                            : `${settings.branding.secondaryColor}15` 
                        }}
                      >
                        <Icon 
                          icon={benefit.icon} 
                          width={20} 
                          style={{ 
                            color: index % 2 === 0 
                              ? settings.branding.primaryColor 
                              : settings.branding.secondaryColor 
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <h3 
                          className={`
                            ${settings.layout.theme === "bold" ? "font-bold" : "font-medium"}
                            ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""}
                          `}
                        >
                          {benefit.title}
                        </h3>
                        <p 
                          className={`
                            text-sm mt-1 text-gray-600
                            ${settings.layout.theme === "minimal" ? "font-light" : ""}
                            ${settings.layout.theme === "classic" ? "font-serif" : ""}
                          `}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Testimonials Section - Apply theme styling */}
          {settings.layout.showTestimonials && (
            <section 
              className={`py-8 md:py-12 px-4 md:px-6 ${
                settings.layout.theme === "bold" ? "bg-gradient-to-br from-slate-50 to-slate-100" :  
                settings.layout.theme === "minimal" ? "bg-default-50" : 
                "bg-white"
              }`} 
              style={{ 
                backgroundColor: settings.layout.theme !== "bold" && settings.layout.theme !== "minimal" 
                  ? `${settings.branding.secondaryColor}08` 
                  : undefined 
              }}
            >
              <div className="w-full">
                <div className="text-center mb-6 md:mb-8">
                  <h2 
                    className={`text-xl md:text-2xl ${
                      settings.layout.theme === "bold" ? "font-bold" : 
                      settings.layout.theme === "minimal" ? "font-normal uppercase tracking-wider" : 
                      "font-semibold"
                    }`}
                    style={{ color: settings.layout.theme !== "bold" && settings.layout.theme !== "minimal" ? settings.branding.secondaryColor : undefined }}
                  >
                    {language === "en" ? "What Our Team Says" : "ماذا يقول فريقنا"}
                  </h2>
                </div>
                
                {settings.layout.testimonialStyle === "card" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {settings.testimonials.map((testimonial, index) => (
                      <div 
                        key={testimonial.id} 
                        className={`
                          ${settings.layout.theme === "bold" ? "rounded-xl shadow-lg" : themeStyles.cardRadius} 
                          bg-white p-6 ${
                            settings.layout.theme === "minimal" ? "" : 
                            settings.layout.theme === "bold" ? "" : 
                            "shadow-sm"
                          } ${
                            settings.layout.theme === "minimal" ? "" : 
                            "border-t-4"
                          } 
                        `} 
                        style={{ 
                          borderColor: settings.layout.theme !== "minimal" 
                            ? index === 0 
                              ? settings.branding.primaryColor 
                              : settings.branding.secondaryColor
                            : undefined
                        }}
                      >
                        <div className="flex items-center mb-4">
                          <img 
                            src={testimonial.avatar} 
                            alt="Avatar" 
                            className={`
                              w-12 h-12 object-cover 
                              ${settings.layout.theme === "bold" ? "rounded-xl" : "rounded-full"}
                              ${settings.layout.theme === "bold" ? "border-2" : ""}
                            `}
                            style={{
                              borderColor: settings.layout.theme === "bold" 
                                ? index === 0 
                                  ? settings.branding.primaryColor 
                                  : settings.branding.secondaryColor
                                : undefined
                            }}
                          />
                          <div className="ms-3">
                            <h4 
                              className={`
                                ${settings.layout.theme === "bold" ? "font-bold" : "font-medium"}
                                ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""}
                              `}
                            >
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <p 
                          className={`
                            ${settings.layout.theme === "minimal" ? "" : "italic"} 
                            text-gray-700
                            ${settings.layout.theme === "classic" ? "font-serif" : ""}
                          `}
                        >
                          {testimonial.quote}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-8 w-full">
                    {settings.testimonials.map((testimonial, index) => (
                      <div key={testimonial.id} className="relative">
                        <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2">
                          <Icon 
                            icon="lucide:quote" 
                            width={32} 
                            className={settings.layout.theme === "bold" ? "opacity-30" : ""}
                            style={{ 
                              color: index % 2 === 0 
                                ? `${settings.branding.primaryColor}80` 
                                : `${settings.branding.secondaryColor}80` 
                            }} 
                          />
                        </div>
                        <blockquote className="pl-10 pb-6 pt-2">
                          <p 
                            className={`
                              ${settings.layout.theme === "bold" ? "text-xl font-medium" : "text-lg"} 
                              ${settings.layout.theme === "classic" ? "font-serif" : ""} 
                              ${settings.layout.theme === "minimal" ? "font-light" : "italic"}
                              mb-4
                            `}
                          >
                            {testimonial.quote}
                          </p>
                          <div className="flex items-center">
                            <img 
                              src={testimonial.avatar} 
                              alt="Avatar" 
                              className={`
                                w-10 h-10 object-cover 
                                ${settings.layout.theme === "bold" ? "rounded-xl" : "rounded-full"} 
                              `} 
                            />
                            <div className="ms-3">
                              <h4 
                                className={`
                                  ${settings.layout.theme === "bold" ? "font-bold" : "font-medium"} 
                                  ${settings.layout.theme === "minimal" ? "uppercase tracking-wider" : ""}
                                  text-sm
                                `}
                              >
                                {testimonial.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                          <div 
                            className="absolute bottom-0 left-12 right-0 h-px"
                            style={{ 
                              background: `linear-gradient(to right, ${
                                index % 2 === 0 
                                  ? settings.branding.primaryColor 
                                  : settings.branding.secondaryColor
                              }40, transparent)` 
                            }}
                          ></div>
                        </blockquote>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
          
          {/* Footer - Apply theme styling */}
          <footer 
            className={`
              ${settings.layout.theme === "bold" 
                ? "bg-gradient-to-br from-gray-800 to-gray-900" 
                : settings.layout.theme === "minimal"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-gray-800 text-white"
              } 
              py-10 px-6
            `}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h4 
                    className={`
                      ${settings.layout.theme === "bold" ? "font-bold text-xl mb-6" : "font-medium mb-4"} 
                      ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""}
                      ${settings.layout.theme === "minimal" ? "text-gray-800" : "text-white"}
                    `}
                  >
                    {settings.branding.companyName}
                  </h4>
                  <p 
                    className={`
                      text-sm ${settings.layout.theme === "minimal" ? "text-gray-600" : "text-gray-300"}
                      ${settings.layout.theme === "classic" ? "font-serif" : ""}
                    `}
                  >
                    {settings.content.footerText}
                  </p>
                </div>
                
                <div>
                  <h4 
                    className={`
                      ${settings.layout.theme === "bold" ? "font-bold mb-6" : "font-medium mb-4"} 
                      ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""}
                      flex items-center gap-1
                      ${settings.layout.theme === "minimal" ? "text-gray-800" : "text-white"}
                    `}
                  >
                    <span 
                      className={`
                        ${settings.layout.theme === "bold" ? "w-3 h-3" : "w-2 h-2"} 
                        rounded-full
                      `} 
                      style={{ backgroundColor: settings.branding.secondaryColor }}
                    ></span>
                    {language === "en" ? "Quick Links" : "روابط سريعة"}
                  </h4>
                  <ul 
                    className={`
                      text-sm space-y-2
                      ${settings.layout.theme === "minimal" ? "text-gray-600" : "text-gray-300"}
                    `}
                  >
                    <li>{language === "en" ? "About Us" : "عن الشركة"}</li>
                    <li>{language === "en" ? "Careers" : "الوظائف"}</li>
                    <li>{language === "en" ? "Contact" : "اتصل بنا"}</li>
                    <li>{language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 
                    className={`
                      ${settings.layout.theme === "bold" ? "font-bold mb-6" : "font-medium mb-4"} 
                      ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""}
                      flex items-center gap-1
                      ${settings.layout.theme === "minimal" ? "text-gray-800" : "text-white"}
                    `}
                  >
                    <span 
                      className={`
                        ${settings.layout.theme === "bold" ? "w-3 h-3" : "w-2 h-2"} 
                        rounded-full
                      `} 
                      style={{ backgroundColor: settings.branding.primaryColor }}
                    ></span>
                    {language === "en" ? "Job Categories" : "فئات الوظائف"}
                  </h4>
                  <ul 
                    className={`
                      text-sm space-y-2
                      ${settings.layout.theme === "minimal" ? "text-gray-600" : "text-gray-300"}
                    `}
                  >
                    <li>{language === "en" ? "Engineering" : "الهندسة"}</li>
                    <li>{language === "en" ? "Design" : "التصميم"}</li>
                    <li>{language === "en" ? "Product" : "المنتج"}</li>
                    <li>{language === "en" ? "Marketing" : "التسويق"}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 
                    className={`
                      ${settings.layout.theme === "bold" ? "font-bold mb-6" : "font-medium mb-4"} 
                      ${settings.layout.theme === "minimal" ? "uppercase text-sm tracking-wider" : ""}
                      ${settings.layout.theme === "minimal" ? "text-gray-800" : "text-white"}
                    `}
                  >
                    {language === "en" ? "Follow Us" : "تابعنا"}
                  </h4>
                  <div className="flex gap-4">
                    {settings.social.linkedin && (
                      <div 
                        className={`
                          p-2 rounded-full 
                          ${settings.layout.theme === "bold" 
                            ? "bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors" 
                            : settings.layout.theme === "minimal"
                              ? "border border-gray-300"
                              : ""
                          }
                        `} 
                        style={{ 
                          backgroundColor: settings.layout.theme !== "bold" && settings.layout.theme !== "minimal"
                            ? settings.branding.secondaryColor + "20" 
                            : undefined
                        }}
                      >
                        <Icon icon="logos:linkedin-icon" width={20} />
                      </div>
                    )}
                    {settings.social.twitter && (
                      <div 
                        className={`
                          p-2 rounded-full 
                          ${settings.layout.theme === "bold" 
                            ? "bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors" 
                            : settings.layout.theme === "minimal"
                              ? "border border-gray-300"
                              : ""
                          }
                        `} 
                        style={{ 
                          backgroundColor: settings.layout.theme !== "bold" && settings.layout.theme !== "minimal"
                            ? settings.branding.primaryColor + "20" 
                            : undefined
                        }}
                      >
                        <Icon icon="logos:twitter" width={20} />
                      </div>
                    )}
                    {settings.social.facebook && (
                      <div 
                        className={`
                          p-2 rounded-full 
                          ${settings.layout.theme === "bold" 
                            ? "bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors" 
                            : settings.layout.theme === "minimal"
                              ? "border border-gray-300"
                              : ""
                          }
                        `} 
                        style={{ 
                          backgroundColor: settings.layout.theme !== "bold" && settings.layout.theme !== "minimal"
                            ? settings.branding.secondaryColor + "20" 
                            : undefined
                        }}
                      >
                        <Icon icon="logos:facebook" width={20} />
                      </div>
                    )}
                    {settings.social.instagram && (
                      <div 
                        className={`
                          p-2 rounded-full 
                          ${settings.layout.theme === "bold" 
                            ? "bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors" 
                            : settings.layout.theme === "minimal"
                              ? "border border-gray-300"
                              : ""
                          }
                        `} 
                        style={{ 
                          backgroundColor: settings.layout.theme !== "bold" && settings.layout.theme !== "minimal"
                            ? settings.branding.primaryColor + "20" 
                            : undefined
                        }}
                      >
                        <Icon icon="logos:instagram-icon" width={20} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </footer>
          
        </div>
      </motion.div>

      {/* Job Details Modal */}
      {isJobDetailsModalOpen && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          settings={settings}
          language={language}
          direction={direction}
          onClose={() => setIsJobDetailsModalOpen(false)}
          onApply={handleStartApplication}
          onShare={(job) => {
            setJobToShare(job);
            setShareModalOpen(true);
          }}
        />
      )}
      
      {/* Job Application Modal */}
      {isApplicationModalOpen && selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          settings={settings}
          language={language}
          direction={direction}
          onClose={() => setIsApplicationModalOpen(false)}
        />
      )}
      
      {/* Job Share Modal */}
      {shareModalOpen && jobToShare && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-6 w-full max-w-md ${direction}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {language === "en" ? "Share This Position" : "مشاركة هذه الوظيفة"}
              </h3>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShareModalOpen(false)}
              >
                <Icon icon="lucide:x" width={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium">
                {jobToShare.title} - {jobToShare.department}
              </p>
              <p className="text-sm text-gray-500">
                {jobToShare.location} · {jobToShare.type}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#0077b5] text-white"
              >
                <Icon icon="logos:linkedin-icon" width={18} />
                <span>LinkedIn</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#1DA1F2] text-white"
              >
                <Icon icon="logos:twitter" width={18} />
                <span>Twitter</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#4267B2] text-white"
              >
                <Icon icon="logos:facebook" width={18} />
                <span>Facebook</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-default-100 text-default-800"
              >
                <Icon icon="lucide:mail" width={18} />
                <span>Email</span>
              </button>
            </div>
            
            <div className="border-t pt-4">
              <p className="font-medium text-sm mb-2">
                {language === "en" ? "Refer a Friend" : "إحالة صديق"}
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  className="flex-1 border rounded-lg px-3 py-2 text-sm" 
                  placeholder={language === "en" ? "Friend's email address" : "عنوان البريد الإلكتروني للصديق"}
                />
                <button
                  className="px-3 py-2 rounded-lg text-white text-sm"
                  style={{ backgroundColor: settings.branding.primaryColor }}
                >
                  {language === "en" ? "Send" : "إرسال"}
                </button>
              </div>
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={`https://careers.${settings.branding.companyName.toLowerCase()}.com/job/${jobToShare.title.toLowerCase().replace(/ /g, '-')}`}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm bg-default-50"
                  readOnly
                />
                <button
                  className="px-3 py-2 rounded-lg text-white text-sm"
                  style={{ backgroundColor: settings.branding.secondaryColor }}
                >
                  {language === "en" ? "Copy" : "نسخ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};