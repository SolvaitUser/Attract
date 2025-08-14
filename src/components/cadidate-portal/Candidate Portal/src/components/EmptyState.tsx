import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

interface EmptyStateProps {
  tabKey: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ tabKey }) => {
  const { t } = useLanguage();
  
  let iconName;
  switch (tabKey) {
    case 'analytics':
      iconName = 'lucide:bar-chart-2';
      break;
    case 'jobRequisition':
      iconName = 'lucide:clipboard-list';
      break;
    case 'candidate':
      iconName = 'lucide:users';
      break;
    case 'interview':
      iconName = 'lucide:calendar';
      break;
    case 'offer':
      iconName = 'lucide:mail';
      break;
    case 'onboarding':
      iconName = 'lucide:check-circle';
      break;
    case 'careersPortalSetup':
      iconName = 'lucide:settings';
      break;
    default:
      iconName = 'lucide:users';
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-wise-blue-50 rounded-full p-6 mb-4">
        <Icon icon={iconName} className="w-10 h-10 text-wise-blue-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {t(tabKey)}
      </h2>
      <p className="text-gray-500">
        {t('contentComingSoon')}
      </p>
    </div>
  );
};

export default EmptyState;