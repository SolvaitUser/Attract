import React from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/LanguageContext";
import { useTabContent, TabKey } from "../context/TabContext";
import InterviewTab from "./interview/InterviewTab";

interface TabContentProps {
  tabKey: TabKey;
}

const TabContent: React.FC<TabContentProps> = ({ tabKey }) => {
  const { language } = useLanguage();
  const { tabs } = useTabContent();
  
  // Find the current tab info
  const currentTab = tabs.find(tab => tab.key === tabKey);
  
  if (!currentTab) return null;
  
  // Special content handling for interview tab
  if (tabKey === "interview") {
    return <InterviewTab />;
  }
  
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 rounded-full bg-wise-lightBlue flex items-center justify-center mb-6">
            <Icon icon={currentTab.icon} className="text-wise-blue text-3xl" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">
            {currentTab.title[language]}
          </h2>
          <p className="text-gray-500">
            {language === "en" ? "Content coming soon" : "المحتوى قادم قريباً"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TabContent;