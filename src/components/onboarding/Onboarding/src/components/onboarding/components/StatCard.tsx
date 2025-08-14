import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleValue: string;
  subtitleLabel: string;
  icon: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  subtitleValue,
  subtitleLabel,
  icon,
  color = 'primary',
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary': return 'bg-primary-100 text-primary';
      case 'secondary': return 'bg-secondary-100 text-secondary';
      case 'success': return 'bg-success-100 text-success';
      case 'warning': return 'bg-warning-100 text-warning';
      case 'danger': return 'bg-danger-100 text-danger';
      default: return 'bg-primary-100 text-primary';
    }
  };
  
  return (
    <Card className="border border-default-200">
      <CardBody className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-default-600 text-sm font-medium">{title}</span>
          <div className={`p-2 rounded-full ${getColorClass()}`}>
            <Icon icon={icon} className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold">{value}</div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-default-500">{subtitle}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium">{subtitleValue}</span>
              <span className="text-xs text-default-400">{subtitleLabel}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};