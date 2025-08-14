import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white h-16 border-b flex items-center justify-between px-4 z-10">
      <div className="flex items-center">
        <div className="bg-wise-blue text-white w-10 h-10 flex items-center justify-center rounded-md font-bold text-lg">
          W
        </div>
        <h1 className="text-lg font-medium mx-4">Wise</h1>
      </div>
      
      <h1 className="text-xl font-medium">{t('welcome')}</h1>
      
      <div className="flex items-center space-x-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md cursor-pointer">
              <Icon icon="lucide:globe" className="text-gray-600" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Language options">
            <DropdownItem key="en" onPress={() => setLanguage('en')}>
              English
            </DropdownItem>
            <DropdownItem key="ar" onPress={() => setLanguage('ar')}>
              العربية
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <div className="relative">
          <Icon icon="lucide:bell" className="text-gray-600 w-5 h-5" />
        </div>
        
        <Avatar 
          src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
          className="cursor-pointer"
          size="sm"
        />
      </div>
    </header>
  );
};