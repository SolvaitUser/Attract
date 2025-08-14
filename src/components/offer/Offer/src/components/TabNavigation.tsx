import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/LanguageContext";
import { useTabContent, TabKey } from "../context/TabContext";
import TabContent from "./TabContent";

interface TabNavigationProps {
  selectedTab: TabKey;
  onTabChange: (key: TabKey) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ selectedTab, onTabChange }) => {
  const { language } = useLanguage();
  const { tabs } = useTabContent();

  return (
    <div className="flex flex-col h-full">
      <Tabs 
        selectedKey={selectedTab} 
        onSelectionChange={(key) => onTabChange(key as TabKey)}
        aria-label="Recruitment Tabs"
        color="primary"
        variant="underlined"
        classNames={{
          base: "custom-tabs",
          tabList: "gap-6",
          tab: "custom-tab",
          tabContent: "flex items-center gap-2 px-0",
          cursor: "hidden"
        }}
      >
        {tabs.map((tab) => (
          <Tab 
            key={tab.key}
            title={
              <div className="flex items-center gap-2">
                <Icon icon={tab.icon} />
                <span>{tab.title[language]}</span>
              </div>
            }
            className="custom-tab-item"
          >
            <TabContent tabKey={tab.key} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default TabNavigation;