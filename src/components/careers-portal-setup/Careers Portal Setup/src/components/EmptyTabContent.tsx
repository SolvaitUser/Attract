import React from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

interface EmptyTabContentProps {
  tabId: string;
  icon: string;
}

export const EmptyTabContent: React.FC<EmptyTabContentProps> = ({ tabId, icon }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const getTabLabel = (): string => {
    const tabKey = tabId as keyof typeof translations.en;
    return t[tabKey] || "";
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Icon icon={icon} className="text-wise-blue" width={48} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{getTabLabel()}</h2>
      <p className="text-default-500">{t.contentComingSoon}</p>
    </div>
  );
};
