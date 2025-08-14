import React from "react";
import { LanguageProvider, useLanguage } from "./Onboarding/src/contexts/LanguageContext";
import { OnboardingModule } from "./Onboarding/src/components/onboarding/OnboardingModule";
import { PageHeader } from "../shared/page-header";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const HeaderActions: React.FC = () => {
  const { t } = useLanguage();
  return (
    <Button 
      color="primary" 
      startContent={<Icon icon="lucide:plus" />} 
      onPress={() => {
        // This will be handled by the OnboardingModule component
        window.dispatchEvent(new CustomEvent('startOnboarding'));
      }}
    >
      {t('startOnboarding')}
    </Button>
  );
};

export const OnboardingView: React.FC = () => {
  return (
    <LanguageProvider>
      <div>
        <PageHeader 
          title={{ en: "Onboarding", ar: "الانضمام" }}
          description={{ 
            en: "Manage onboarding tasks and track progress for new hires.",
            ar: "إدارة مهام الانضمام وتتبع تقدم الموظفين الجدد."
          }}
          rightContent={<HeaderActions />}
        />
        <OnboardingModule />
      </div>
    </LanguageProvider>
  );
};
