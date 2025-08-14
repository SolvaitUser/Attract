import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <nav className="p-2">
        <ul>
          <li>
            <a 
              href="#" 
              className="flex items-center gap-3 px-4 py-3 rounded-md bg-wise-blue-50 text-wise-blue-600"
            >
              <Icon icon="lucide:users" className={language === 'ar' ? 'icon-flip' : ''} />
              <span className="font-medium">{t('recruitment')}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;