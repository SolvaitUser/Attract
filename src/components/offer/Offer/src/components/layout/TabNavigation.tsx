import React from 'react';
import { Icon } from '@iconify/react';
import { useTab, TabKey } from '../../context/TabContext';
import { useLanguage } from '../../context/LanguageContext';

interface TabItem {
  key: TabKey;
  icon: string;
  translationKey: string;
}

export const TabNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useTab();
  const { t } = useLanguage();
  
  const tabs: TabItem[] = [
    { key: 'analytics', icon: 'lucide:bar-chart-2', translationKey: 'analytics' },
    { key: 'job-requisition', icon: 'lucide:file-text', translationKey: 'job_requisition' },
    { key: 'candidate', icon: 'lucide:user', translationKey: 'candidate' },
    { key: 'interview', icon: 'lucide:calendar', translationKey: 'interview' },
    { key: 'offer', icon: 'lucide:mail', translationKey: 'offer' },
    { key: 'onboarding', icon: 'lucide:check-circle', translationKey: 'onboarding' },
    { key: 'careers-portal-setup', icon: 'lucide:settings', translationKey: 'careers_portal_setup' },
  ];

  return (
    <div className="bg-white border-b relative">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            data-tab={tab.key}
            className={`flex items-center gap-2 px-6 py-4 cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === tab.key 
                ? 'text-wise-blue font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <Icon icon={tab.icon} width="18" height="18" />
            <span className="text-sm">{t(tab.translationKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};