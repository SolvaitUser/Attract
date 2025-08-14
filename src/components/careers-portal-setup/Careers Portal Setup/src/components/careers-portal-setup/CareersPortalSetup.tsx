import React from "react";
import { Tabs, Tab, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { PortalPreview } from "./PortalPreview";
import { BrandingSettings } from "./BrandingSettings";
import { ContentSettings } from "./ContentSettings";
import { LayoutSettings } from "./LayoutSettings";
import { SocialSettings } from "./SocialSettings";
import { BenefitsSettings } from "./BenefitsSettings";
import { TestimonialsSettings } from "./TestimonialsSettings";

export const CareersPortalSetup: React.FC = () => {
  const { language, direction } = useLanguage();
  const t = translations[language];
  const isRTL = direction === "rtl";
  
  const [activeSettingsTab, setActiveSettingsTab] = React.useState("branding");
  const [previewDevice, setPreviewDevice] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [savedSettings, setSavedSettings] = React.useState(false);
  
  // Portal settings state
  const [portalSettings, setPortalSettings] = React.useState({
    branding: {
      companyName: "Wise Company",
      logo: "https://img.heroui.chat/image/logos?w=200&h=200&u=1",
      primaryColor: "#0066ff",
      secondaryColor: "#00c389",
      fontFamily: "Inter",
      bannerImage: "https://img.heroui.chat/image/business?w=1200&h=400&u=1",
    },
    content: {
      headline: language === "en" ? "Join Our Team" : "انضم إلى فريقنا",
      subheadline: language === "en" 
        ? "Be part of something special" 
        : "كن جزءًا من شيء مميز",
      aboutCompany: language === "en"
        ? "We're building the future of work. Our mission is to create a better workplace for everyone."
        : "نحن نبني مستقبل العمل. مهمتنا هي خلق مكان عمل أفضل للجميع.",
      footerText: language === "en" ? "© 2023 Wise Company. All rights reserved." : "© 2023 شركة وايز. كل الحقوق محفوظة.",
      testimonials: [
        {
          id: "1",
          name: language === "en" ? "Sarah Johnson" : "سارة جونسون",
          role: language === "en" ? "Product Designer" : "مصممة منتجات",
          avatar: "https://img.heroui.chat/image/avatar?w=60&h=60&u=3",
          quote: language === "en" 
            ? "Working here has been an incredible journey of growth and learning. The collaborative environment and supportive team make every day exciting."
            : "العمل هنا كان رحلة مذهلة من النمو والتعلم. البيئة التعاونية والفريق الداعم يجعلان كل يوم مثيرًا."
        },
        {
          id: "2",
          name: language === "en" ? "David Kim" : "ديفيد كيم",
          role: language === "en" ? "Software Engineer" : "مهندس برمجيات",
          avatar: "https://img.heroui.chat/image/avatar?w=60&h=60&u=4",
          quote: language === "en" 
            ? "The company truly values innovation and work-life balance. I've been able to grow my technical skills while maintaining a healthy lifestyle."
            : "الشركة تقدر حقًا الابتكار والتوازن بين العمل والحياة. لقد تمكنت من تطوير مهاراتي التقنية مع الحفاظ على نمط حياة صحي."
        }
      ],
      benefits: [
        {
          id: "1",
          icon: "lucide:heart-pulse",
          title: language === "en" ? "Health Insurance" : "تأمين صحي",
          description: language === "en" ? "Comprehensive health, dental and vision coverage" : "تغطية شاملة للصحة والأسنان والنظر"
        },
        {
          id: "2",
          icon: "lucide:calendar",
          title: language === "en" ? "Flexible PTO" : "إجازة مرنة",
          description: language === "en" ? "Take time off when you need it" : "خذ إجازة عندما تحتاج إليها"
        },
        {
          id: "3",
          icon: "lucide:home",
          title: language === "en" ? "Remote Work" : "العمل عن بعد",
          description: language === "en" ? "Work from anywhere in the world" : "اعمل من أي مكان في العالم"
        },
        {
          id: "4",
          icon: "lucide:trending-up",
          title: language === "en" ? "Career Growth" : "النمو المهني",
          description: language === "en" ? "Opportunities for advancement and skill development" : "فرص للتقدم وتطوير المهارات"
        }
      ]
    },
    layout: {
      theme: "modern",
      showFilters: true,
      cardsDisplay: "grid",
      showTestimonials: true,
      heroStyle: "fullwidth",
      testimonialStyle: "card",
      benefitsLayout: "grid",
      videoSource: "predefined" as 'upload' | 'predefined',
      selectedVideoId: "recruiting1"
    },
    social: {
      linkedin: "company/wise",
      twitter: "wisecompany",
      facebook: "wisecompany",
      instagram: "wisecompany",
    },
    testimonials: [
      {
        id: "1",
        name: language === "en" ? "Sarah Johnson" : "سارة جونسون",
        role: language === "en" ? "Product Designer" : "مصممة منتجات",
        avatar: "https://img.heroui.chat/image/avatar?w=60&h=60&u=3",
        quote: language === "en" 
          ? "Working here has been an incredible journey of growth and learning. The collaborative environment and supportive team make every day exciting."
          : "العمل هنا كان رحلة مذهلة من النمو والتعلم. البيئة التعاونية والفريق الداعم يجعلان كل يوم مثيرًا."
      },
      {
        id: "2",
        name: language === "en" ? "David Kim" : "ديفيد كيم",
        role: language === "en" ? "Software Engineer" : "مهندس برمجيات",
        avatar: "https://img.heroui.chat/image/avatar?w=60&h=60&u=4",
        quote: language === "en" 
          ? "The company truly values innovation and work-life balance. I've been able to grow my technical skills while maintaining a healthy lifestyle."
          : "الشركة تقدر حقًا الابتكار والتوازن بين العمل والحياة. لقد تمكنت من تطوير مهاراتي التقنية مع الحفاظ على نمط حياة صحي."
      }
    ],
    benefits: [
      { 
        id: "1", 
        icon: "lucide:heart-pulse", 
        title: language === "en" ? "Health Insurance" : "تأمين صحي",
        description: language === "en" ? "Comprehensive health, dental and vision coverage" : "تغطية شاملة للصحة والأسنان والنظر"
      },
      { 
        id: "2", 
        icon: "lucide:calendar", 
        title: language === "en" ? "Flexible PTO" : "إجازة مرنة",
        description: language === "en" ? "Take time off when you need it most" : "خذ إجازة عندما تحتاجها أكثر"
      },
      { 
        id: "3", 
        icon: "lucide:home", 
        title: language === "en" ? "Remote Work" : "العمل عن بعد",
        description: language === "en" ? "Work from anywhere in the world" : "اعمل من أي مكان في العالم"
      },
      { 
        id: "4", 
        icon: "lucide:trending-up", 
        title: language === "en" ? "Career Growth" : "النمو المهني",
        description: language === "en" ? "Continuous learning and development opportunities" : "فرص مستمرة للتعلم والتطوير"
      }
    ]
  });
  
  const handleSettingChange = (section: string, key: string, value: any) => {
    setPortalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setSavedSettings(false);
  };
  
  const handleSaveSettings = () => {
    // Here you would typically save the settings to a backend
    setSavedSettings(true);
    // Show success message
    setTimeout(() => {
      setSavedSettings(false);
    }, 3000);
  };
  
  return (
    <div className="flex h-full">
      {/* Settings Panel */}
      <div className={`w-full md:w-[300px] lg:w-[320px] border-r bg-content1 h-full overflow-y-auto flex-shrink-0 ${isRTL ? 'order-2' : 'order-1'}`}>
        <div className="p-2 border-b">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{t.careersPortalSetup}</h2>
            <Button 
              color="primary" 
              className="h-8 text-sm"
              onPress={handleSaveSettings}
              startContent={<Icon icon="lucide:save" width={16} />}
            >
              {language === "en" ? "Save" : "حفظ"}
            </Button>
          </div>
          <div className="flex items-center justify-between bg-default-50 rounded-lg p-1">
            <Button 
              size="sm"
              variant={previewDevice === "desktop" ? "solid" : "flat"} 
              color={previewDevice === "desktop" ? "primary" : "default"}
              onPress={() => setPreviewDevice("desktop")}
              startContent={<Icon icon="lucide:monitor" width={14} />}
              className={previewDevice === "desktop" ? "" : "bg-transparent"}
            >
              {language === "en" ? "Desktop" : "سطح المكتب"}
            </Button>
            <Button 
              size="sm"
              variant={previewDevice === "tablet" ? "solid" : "flat"}
              color={previewDevice === "tablet" ? "primary" : "default"}
              onPress={() => setPreviewDevice("tablet")}
              startContent={<Icon icon="lucide:tablet" width={14} />}
              className={previewDevice === "tablet" ? "" : "bg-transparent"}
            >
              {language === "en" ? "Tablet" : "لوحي"}
            </Button>
            <Button 
              size="sm"
              variant={previewDevice === "mobile" ? "solid" : "flat"}
              color={previewDevice === "mobile" ? "primary" : "default"}
              onPress={() => setPreviewDevice("mobile")}
              startContent={<Icon icon="lucide:smartphone" width={14} />}
              className={previewDevice === "mobile" ? "" : "bg-transparent"}
            >
              {language === "en" ? "Mobile" : "جوال"}
            </Button>
          </div>
        </div>
        
        <div className="p-2">
          <Tabs 
            aria-label="Portal Settings Tabs" 
            selectedKey={activeSettingsTab} 
            onSelectionChange={(key) => setActiveSettingsTab(key as string)}
            variant="underlined"
            color="primary"
            classNames={{
              tabList: "gap-2",
              cursor: "bg-wise-blue",
              tab: "px-0 h-8 text-sm",
            }}
          >
            <Tab 
              key="branding" 
              title={
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:palette" width={16} />
                  <span>{language === "en" ? "Branding" : "العلامة التجارية"}</span>
                </div>
              }
            >
              <BrandingSettings 
                settings={portalSettings.branding} 
                onChange={(key, value) => handleSettingChange("branding", key, value)}
                language={language}
              />
            </Tab>
            <Tab 
              key="content" 
              title={
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:file-text" width={16} />
                  <span>{language === "en" ? "Content" : "المحتوى"}</span>
                </div>
              }
            >
              <ContentSettings 
                settings={portalSettings.content} 
                onChange={(key, value) => handleSettingChange("content", key, value)}
                language={language}
              />
            </Tab>
            <Tab 
              key="layout" 
              title={
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:layout" width={16} />
                  <span>{language === "en" ? "Layout" : "التخطيط"}</span>
                </div>
              }
            >
              <LayoutSettings 
                settings={portalSettings.layout} 
                onChange={(key, value) => handleSettingChange("layout", key, value)}
                language={language}
              />
            </Tab>
            <Tab 
              key="social" 
              title={
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:share-2" width={16} />
                  <span>{language === "en" ? "Social" : "التواصل"}</span>
                </div>
              }
            >
              <SocialSettings 
                settings={portalSettings.social} 
                onChange={(key, value) => handleSettingChange("social", key, value)}
                language={language}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
      
      {/* Preview Section */}
      <div className={`hidden md:flex flex-1 bg-default-50 py-2 px-2 ${isRTL ? 'order-1' : 'order-2'}`}>
        <div className="w-full flex justify-start">
          <PortalPreview 
            settings={portalSettings} 
            device={previewDevice}
            language={language}
            direction={direction}
          />
        </div>
        
        {/* Success Toast */}
        {savedSettings && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-success-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 slide-in">
            <Icon icon="lucide:check-circle" width={20} />
            <span>{language === "en" ? "Changes saved successfully!" : "تم حفظ التغييرات بنجاح!"}</span>
          </div>
        )}
      </div>
    </div>
  );
};