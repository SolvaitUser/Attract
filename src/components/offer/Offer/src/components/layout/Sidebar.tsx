import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <aside className="bg-white w-60 border-e flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-wise-light-blue text-wise-blue font-medium cursor-pointer">
          <Icon icon="lucide:users" width="20" height="20" />
          <span>{t('recruitment')}</span>
        </div>
      </div>
    </aside>
  );
};