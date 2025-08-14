import React from 'react';
import { Icon } from '@iconify/react';

interface AiInsightCardProps {
  icon: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

export const AiInsightCard: React.FC<AiInsightCardProps> = ({ icon, message, type }) => {
  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success-50',
          iconBg: 'bg-success-100',
          text: 'text-success',
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          iconBg: 'bg-warning-100',
          text: 'text-warning',
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary-50',
          iconBg: 'bg-primary-100',
          text: 'text-primary',
        };
    }
  };
  
  const classes = getTypeClasses();
  
  return (
    <div className={`p-3 rounded-md ${classes.bg}`}>
      <div className="flex items-start gap-2">
        <div className={`p-1 rounded-full ${classes.iconBg}`}>
          <Icon icon={icon} className={`w-4 h-4 ${classes.text}`} />
        </div>
        <p className="text-sm text-default-700">{message}</p>
      </div>
    </div>
  );
};