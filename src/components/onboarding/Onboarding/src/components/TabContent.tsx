import React from 'react';
import { Card, CardBody, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';
import { OnboardingModule } from './onboarding/OnboardingModule';
import { AssignedTasksView } from './onboarding/components/AssignedTasksView';

interface TabContentProps {
  activeTab: string;
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const { t } = useLanguage();
  
  // Return actual onboarding component when on onboarding tab
  if (activeTab === 'onboarding') {
    return <OnboardingModule />;
  }
  
  // Add a new tab case for "myTasks" in the switch statement
  switch (activeTab) {
    case 'myTasks':
      return (
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{t('myAssignedTasks')}</h1>
            <p className="text-default-500">{t('manageYourAssignedOnboardingTasks')}</p>
          </div>
          <AssignedTasksView 
            userId="currentUser" // This would be the actual user ID in a real app
          />
        </div>
      );
      
    // Empty content state for other tabs
    default:
      return (
        <Card className="shadow-sm">
          <CardBody className="flex flex-col items-center justify-center p-20">
            {getTabIcon(activeTab)}
            <h2 className="text-xl font-semibold mt-4">
              {t(getTabTitle(activeTab))}
            </h2>
            <p className="text-default-500 mt-2">
              {t('contentComingSoon')}
            </p>
            {activeTab === 'onboarding' && (
              <Table 
                aria-label="Onboarding content"
                removeWrapper
              >
                <TableHeader>
                  <TableColumn key="name" isRowHeader>Name</TableColumn>
                  <TableColumn key="status">Status</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No data available">
                  {/* Table content will be populated later */}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      );
  }
};

const getTabIcon = (tab: string) => {
  const iconMap: Record<string, string> = {
    'analytics': 'lucide:bar-chart-2',
    'job-requisition': 'lucide:file-text',
    'candidate': 'lucide:user',
    'interview': 'lucide:calendar',
    'offer': 'lucide:mail',
    'onboarding': 'lucide:check-circle',
    'careers-portal-setup': 'lucide:settings',
  };
  
  const iconName = iconMap[tab] || 'lucide:check-circle';
  
  return (
    <div className="w-20 h-20 rounded-full bg-wise-light-blue flex items-center justify-center text-wise-blue">
      <Icon icon={iconName} width={40} />
    </div>
  );
};

const getTabTitle = (tab: string) => {
  const titleMap: Record<string, string> = {
    'analytics': 'analytics',
    'job-requisition': 'jobRequisition',
    'candidate': 'candidate',
    'interview': 'interview',
    'offer': 'offer',
    'onboarding': 'onboarding',
    'careers-portal-setup': 'careersPortalSetup',
  };
  
  return titleMap[tab] || 'onboarding';
};