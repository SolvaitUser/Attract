import React from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../../contexts/LanguageContext';

interface IntegrationCardProps {
  name: string;
  icon: string;
  description: string;
  isConnected: boolean;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  icon,
  description,
  isConnected,
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border border-default-200">
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-default-100 p-2 rounded-lg">
              <Icon icon={icon} className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-md font-medium">{name}</h4>
              <Chip 
                size="sm" 
                color={isConnected ? "success" : "default"}
                variant="flat"
              >
                {isConnected ? t('connected') : t('notConnected')}
              </Chip>
            </div>
          </div>
        </div>
        
        <p className="text-default-600 text-sm mb-4">
          {description}
        </p>
        
        <div className="flex justify-end">
          {isConnected ? (
            <Button 
              size="sm" 
              variant="flat" 
              color="danger"
              startContent={<Icon icon="lucide:unlink" className="w-4 h-4" />}
            >
              {t('disconnect')}
            </Button>
          ) : (
            <Button 
              size="sm" 
              color="primary" 
              variant="flat"
              startContent={<Icon icon="lucide:link" className="w-4 h-4" />}
            >
              {t('connect')}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};