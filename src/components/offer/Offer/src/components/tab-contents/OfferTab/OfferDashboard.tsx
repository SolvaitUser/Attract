import React from 'react';
import { Card, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../context/OfferContext';
import { useLanguage } from '../../../context/LanguageContext';

export const OfferDashboard: React.FC = () => {
  const { statistics } = useOffers();
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('total_offers')}
          value={statistics.totalOffers}
          icon="lucide:file-text"
          color="blue"
        />
        <MetricCard
          title={t('offers_sent')}
          value={statistics.offersSent}
          icon="lucide:send"
          color="purple"
        />
        <MetricCard
          title={t('offers_signed')}
          value={statistics.offersSigned}
          icon="lucide:check-circle"
          color="green"
        />
        <MetricCard
          title={t('offers_declined')}
          value={statistics.offersExpiredOrDeclined}
          icon="lucide:x-circle"
          color="red"
        />
      </div>
      
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Icon icon="lucide:zap" className="text-blue-500 w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{t('ai_insights')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">{t('common_approval_blockers')}</h4>
                <ul className="space-y-2">
                  {statistics.aiInsights.approvalBlockers.map((blocker, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{blocker.reason}</span>
                      <span className="text-gray-500 font-medium">{blocker.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">{t('top_negotiation_requests')}</h4>
                <ul className="space-y-2">
                  {statistics.aiInsights.negotiationRequests.map((request, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{request.request}</span>
                      <span className="text-gray-500 font-medium">{request.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-500 text-sm">{t('average_time_to_sign')}: </span>
                  <span className="font-semibold">{statistics.avgTimeToSign} {t('days')}</span>
                </div>
                <Button color="primary" variant="light" size="sm" startContent={<Icon icon="lucide:bar-chart-2" />}>
                  {t('view_detailed_analytics')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'purple' | 'green' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-500",
    purple: "bg-purple-50 text-purple-500",
    green: "bg-green-50 text-green-500",
    red: "bg-red-50 text-red-500"
  };
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon icon={icon} className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};