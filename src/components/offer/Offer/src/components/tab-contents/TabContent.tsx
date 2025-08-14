import React from 'react';
import { Icon } from '@iconify/react';
import { useTab } from '../../context/TabContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '@heroui/react';
import { OfferTab } from './OfferTab'; // Import the new OfferTab component

export const TabContent: React.FC = () => {
  const { activeTab } = useTab();
  const { t } = useLanguage();
  
  // Return the OfferTab component when on the offer tab
  if (activeTab === 'offer') {
    return <OfferTab />;
  }
  
  // For all other tabs, display the placeholder content
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-blue-100 p-6 rounded-full mb-4">
          {getTabIcon(activeTab)}
        </div>
        <h2 className="text-2xl font-medium mb-2">
          {t(getTabTranslationKey(activeTab))}
        </h2>
        <p className="text-gray-500">
          {t('content_coming_soon')}
        </p>
      </div>
    </Card>
  );
};

const getTabIcon = (tab: string) => {
  const icons: Record<string, JSX.Element> = {
    'analytics': <Icon icon="lucide:bar-chart-2" className="text-blue-500 w-10 h-10" />,
    'job-requisition': <Icon icon="lucide:file-text" className="text-blue-500 w-10 h-10" />,
    'candidate': <Icon icon="lucide:user" className="text-blue-500 w-10 h-10" />,
    'interview': <Icon icon="lucide:calendar" className="text-blue-500 w-10 h-10" />,
    'offer': <Icon icon="lucide:mail" className="text-blue-500 w-10 h-10" />,
    'onboarding': <Icon icon="lucide:check-circle" className="text-blue-500 w-10 h-10" />,
    'careers-portal-setup': <Icon icon="lucide:settings" className="text-blue-500 w-10 h-10" />,
  };
  
  return icons[tab] || icons['offer'];
};

const getTabTranslationKey = (tab: string): string => {
  const keys: Record<string, string> = {
    'analytics': 'analytics',
    'job-requisition': 'job_requisition',
    'candidate': 'candidate',
    'interview': 'interview',
    'offer': 'offer',
    'onboarding': 'onboarding',
    'careers-portal-setup': 'careers_portal_setup',
  };
  
  return keys[tab] || 'offer';
};