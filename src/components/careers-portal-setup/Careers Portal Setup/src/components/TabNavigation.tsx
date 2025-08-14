import React from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

type Tab = {
  id: string;
  label: keyof typeof translations.en;
  icon: string;
};

const tabs: Tab[] = [
  { id: "dashboard", label: "dashboard", icon: "lucide:bar-chart-2" },
  { id: "jobRequisition", label: "jobRequisition", icon: "lucide:file-text" },
  { id: "candidate", label: "candidate", icon: "lucide:users" },
  { id: "interview", label: "interview", icon: "lucide:calendar" },
  { id: "offer", label: "offer", icon: "lucide:mail" },
  { id: "onboarding", label: "onboarding", icon: "lucide:check-circle" },
  { id: "careersPortalSetup", label: "careersPortalSetup", icon: "lucide:settings" },
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="border-b">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`attract-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon icon={tab.icon} width={18} />
            <span>{t[tab.label]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
