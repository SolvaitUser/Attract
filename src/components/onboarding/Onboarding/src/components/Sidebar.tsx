import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-60 bg-white border-r border-wise-border p-2 shrink-0">
      <Button 
        className="w-full justify-start mb-2 bg-wise-light-blue text-wise-blue" 
        variant="flat"
        startContent={<Icon icon="lucide:users" width={18} />}
      >
        {t('recruitment')}
      </Button>
      <div className="mt-auto">
        <Button 
          className="w-full justify-start mt-2" 
          variant="light"
          startContent={<Icon icon="lucide:chevron-left" width={18} className="rtl-mirror" />}
        >
          {t('collapse')}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;