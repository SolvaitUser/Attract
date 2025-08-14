import React from 'react';
import { Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  
  const handleSelectionChange = (key: React.Key) => {
    onTabChange(String(key));
  };

  return (
    <div className="w-full border-b border-wise-border bg-white">
      <Tabs 
        selectedKey={activeTab} 
        onSelectionChange={handleSelectionChange}
        variant="underlined"
        color="primary"
        classNames={{
          tab: "px-4 h-12",
          tabContent: "group-data-[selected=true]:text-wise-blue",
          cursor: "hidden",
          tabList: "gap-4"
        }}
        aria-label="Recruitment Tabs"
      >
        <Tab 
          key="analytics" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:bar-chart-2" width={18} />
              <span>{t('analytics')}</span>
            </div>
          }
        />
        <Tab 
          key="job-requisition" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:file-text" width={18} />
              <span>{t('jobRequisition')}</span>
            </div>
          }
        />
        <Tab 
          key="candidate" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:user" width={18} />
              <span>{t('candidate')}</span>
            </div>
          }
        />
        <Tab 
          key="interview" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:calendar" width={18} />
              <span>{t('interview')}</span>
            </div>
          }
        />
        <Tab 
          key="offer" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:mail" width={18} />
              <span>{t('offer')}</span>
            </div>
          }
        />
        <Tab 
          key="onboarding" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" width={18} />
              <span>{t('onboarding')}</span>
            </div>
          }
        />
        <Tab 
          key="careers-portal-setup" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:settings" width={18} />
              <span>{t('careersPortalSetup')}</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};