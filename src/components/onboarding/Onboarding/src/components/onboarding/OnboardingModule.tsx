import React from 'react';
import { Tabs, Tab, Card, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { OnboardingDashboard } from './OnboardingDashboard';
import { OnboardingList } from './OnboardingList';
import { OnboardingWizard } from './OnboardingWizard';
import { OnboardingSettings } from './OnboardingSettings';

export const OnboardingModule: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = React.useState('dashboard');
  const [showWizard, setShowWizard] = React.useState(false);
  
  React.useEffect(() => {
    const handleStartOnboarding = () => {
      setShowWizard(true);
    };
    
    window.addEventListener('startOnboarding', handleStartOnboarding);
    
    return () => {
      window.removeEventListener('startOnboarding', handleStartOnboarding);
    };
  }, []);
  
  if (showWizard) {
    return <OnboardingWizard onClose={() => setShowWizard(false)} />;
  }
  
  return (
    <div className="space-y-4">
      <Card className="p-0">
        <Tabs 
          selectedKey={view} 
          onSelectionChange={key => setView(String(key))}
          className="w-full"
          color="primary"
          variant="light"
          classNames={{
            tabList: "px-4 pt-4",
          }}
        >
          <Tab 
            key="dashboard" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:layout-dashboard" width={18} />
                <span>{t('dashboard')}</span>
              </div>
            }
          >
            <OnboardingDashboard />
          </Tab>
          <Tab 
            key="active" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:check-circle" width={18} />
                <span>{t('activeOnboarding')}</span>
              </div>
            }
          >
            <OnboardingList status="active" />
          </Tab>
          <Tab 
            key="completed" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:check-check" width={18} />
                <span>{t('completedOnboarding')}</span>
              </div>
            }
          >
            <OnboardingList status="completed" />
          </Tab>
          <Tab 
            key="templates" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:copy" width={18} />
                <span>{t('templates')}</span>
              </div>
            }
          >
            <OnboardingList status="template" />
          </Tab>
          <Tab 
            key="settings" 
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:settings" width={18} />
                <span>{t('settings')}</span>
              </div>
            }
          >
            <OnboardingSettings />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};