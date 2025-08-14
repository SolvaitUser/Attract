import React from "react";
import { LanguageProvider } from "./Careers Portal Setup/src/contexts/LanguageContext";
import { CareersPortalSetup } from "./Careers Portal Setup/src/components/careers-portal-setup/CareersPortalSetup";
import { PageHeader } from "../shared/page-header";

export const CareersPortalSetupView: React.FC = () => {
  return (
    <LanguageProvider>
      <div>
        <PageHeader 
          title={{ en: "Careers Portal Setup", ar: "إعداد بوابة التوظيف" }}
          description={{ 
            en: "Configure and customize the careers portal to align with your company's branding and hiring needs.",
            ar: "تهيئة وتخصيص بوابة التوظيف بما يتماشى مع هوية شركتك واحتياجات التوظيف."
          }}
        />
        <CareersPortalSetup />
      </div>
    </LanguageProvider>
  );
};


