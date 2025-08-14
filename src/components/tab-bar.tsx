import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAppContext, TabKey } from "../context/app-context";

const TABS = [
  { key: "dashboard", label: { en: "Dashboard", ar: "لوحة المعلومات" }, icon: "lucide:layout-dashboard" },
  { key: "job-requisition", label: { en: "Job Requisition", ar: "طلبات الوظائف" }, icon: "lucide:file-text" },
  { key: "candidate", label: { en: "Candidate", ar: "المرشحين" }, icon: "lucide:user" },
  { key: "interview", label: { en: "Interview", ar: "المقابلة" }, icon: "lucide:calendar" },
  { key: "offer", label: { en: "Offer", ar: "العروض" }, icon: "lucide:mail" },
  { key: "onboarding", label: { en: "Onboarding", ar: "التأهيل" }, icon: "lucide:clipboard-check" },
  { key: "careers-portal-setup", label: { en: "Careers Portal Setup", ar: "إعداد بوابة الوظائف" }, icon: "lucide:settings" },
] as const;

export const TabBar: React.FC = () => {
  const { language, activeTab, setActiveTab } = useAppContext();

  const handleTabChange = (key: React.Key) => {
    setActiveTab(key as TabKey);
  };

  const tabStyle = "flex items-center gap-x-2 h-12 px-4";

  return (
    <div className="border-b border-gray-200">
      <Tabs 
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
        variant="light"
        color="primary"
        classNames={{
          tabList: "gap-0",
                  cursor: "bg-attract-blue h-0.5 shadow-none rounded-none data-[active=true]:opacity-0",
        tab: "data-[selected=true]:text-attract-blue data-[selected=true]:font-medium data-[selected=true]:opacity-100"
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.key}
            title={
              <div className={`${tabStyle} ${activeTab === tab.key ? 'text-attract-blue font-medium' : ''}`} style={{ flexDirection: language === "ar" ? "row-reverse" : "row" }}>
                <Icon icon={tab.icon} className="w-5 h-5" />
                <span className="whitespace-nowrap">{language === "en" ? tab.label.en : tab.label.ar}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};