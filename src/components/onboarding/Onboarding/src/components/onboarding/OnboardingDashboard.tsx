import React from 'react';
import { Card, CardBody, CardHeader, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { StatCard } from './components/StatCard';
import { OnboardingChart } from './components/OnboardingChart';
import { AiInsightCard } from './components/AiInsightCard';
import { TaskDeadlineTable } from './components/TaskDeadlineTable';

export const OnboardingDashboard: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard 
          title={t('totalOnboardings')}
          value="24"
          subtitle={t('thisMonth')}
          subtitleValue="148"
          subtitleLabel={t('ytd')}
          icon="lucide:users"
          color="primary"
        />
        <StatCard 
          title={t('completionRate')}
          value="85%"
          subtitle={t('averagePerEmployee')}
          subtitleValue="92%"
          subtitleLabel={t('targetRate')}
          icon="lucide:percent"
          color="success"
        />
        <StatCard 
          title={t('delayedTasks')}
          value="8"
          subtitle={t('requiresAttention')}
          subtitleValue="3"
          subtitleLabel={t('critical')}
          icon="lucide:alert-triangle"
          color="warning"
        />
        <StatCard 
          title={t('activeTemplates')}
          value="12"
          subtitle={t('mostUsed')}
          subtitleValue="IT"
          subtitleLabel={t('department')}
          icon="lucide:copy"
          color="secondary"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-0 flex justify-between">
            <h3 className="text-lg font-semibold">{t('onboardingProgress')}</h3>
          </CardHeader>
          <CardBody>
            <OnboardingChart />
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <h3 className="text-lg font-semibold">{t('aiInsights')}</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <AiInsightCard 
                icon="lucide:trending-up" 
                message={t('aiInsight1')}
                type="success" 
              />
              <AiInsightCard 
                icon="lucide:alert-circle" 
                message={t('aiInsight2')}
                type="warning" 
              />
              <AiInsightCard 
                icon="lucide:lightbulb" 
                message={t('aiInsight3')}
                type="info" 
              />
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-0">
            <h3 className="text-lg font-semibold">{t('taskCompletionByType')}</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6 py-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-small">{t('adminTasks')}</span>
                  <span className="text-small font-semibold">92%</span>
                </div>
                <Progress
                  aria-label="Admin Tasks"
                  size="sm"
                  value={92}
                  color="primary"
                  className="mb-3"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-small">{t('complianceTasks')}</span>
                  <span className="text-small font-semibold">87%</span>
                </div>
                <Progress
                  aria-label="Compliance Tasks"
                  size="sm"
                  value={87}
                  color="success"
                  className="mb-3"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-small">{t('trainingTasks')}</span>
                  <span className="text-small font-semibold">78%</span>
                </div>
                <Progress
                  aria-label="Training Tasks"
                  size="sm"
                  value={78}
                  color="secondary"
                  className="mb-3"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-small">{t('techSetupTasks')}</span>
                  <span className="text-small font-semibold">64%</span>
                </div>
                <Progress
                  aria-label="Tech Setup Tasks"
                  size="sm"
                  value={64}
                  color="warning"
                  className="mb-3"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-small">{t('orientationTasks')}</span>
                  <span className="text-small font-semibold">95%</span>
                </div>
                <Progress
                  aria-label="Orientation Tasks"
                  size="sm"
                  value={95}
                  color="primary"
                  className="mb-3"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <h3 className="text-lg font-semibold">{t('upcomingDeadlines')}</h3>
          </CardHeader>
          <CardBody>
            <TaskDeadlineTable />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};