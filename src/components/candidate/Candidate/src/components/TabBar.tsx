import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

type TabType = 'analytics' | 'jobRequisition' | 'candidate' | 'interview' | 'offer' | 'onboarding' | 'careersPortalSetup';

interface TabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

interface TabConfig {
  key: TabType;
  textKey: string;
  icon: string;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const { t, language } = useLanguage();
  
  const tabs: TabConfig[] = [
    { key: 'analytics', textKey: 'analytics', icon: 'lucide:bar-chart-2' },
    { key: 'jobRequisition', textKey: 'jobRequisition', icon: 'lucide:clipboard-list' },
    { key: 'candidate', textKey: 'candidate', icon: 'lucide:users' },
    { key: 'interview', textKey: 'interview', icon: 'lucide:calendar' },
    { key: 'offer', textKey: 'offer', icon: 'lucide:mail' },
    { key: 'onboarding', textKey: 'onboarding', icon: 'lucide:check-circle' },
    { key: 'careersPortalSetup', textKey: 'careersPortalSetup', icon: 'lucide:settings' },
  ];
  
  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto">
      <div className="flex items-center">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium relative ${
              activeTab === tab.key ? 'text-wise-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon 
              icon={tab.icon} 
              className={language === 'ar' ? 'icon-flip' : ''} 
            />
            <span>{t(tab.textKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;