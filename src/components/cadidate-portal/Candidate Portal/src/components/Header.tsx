import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-wise-blue-600 text-white font-bold w-8 h-8 rounded flex items-center justify-center mr-3">
          W
        </div>
        <h1 className="font-medium text-lg text-gray-800">
          Wise
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button 
              variant="light" 
              className="min-w-0 px-2"
              startContent={<Icon icon="lucide:globe" className="text-gray-600" />}
              endContent={<span className="text-sm font-medium">{language.toUpperCase()}</span>}
            >
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Language options">
            <DropdownItem key="en" onClick={() => setLanguage('en')}>English</DropdownItem>
            <DropdownItem key="ar" onClick={() => setLanguage('ar')}>العربية</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        <Button isIconOnly variant="light" className="min-w-0">
          <Icon icon="lucide:bell" className="text-gray-600" />
        </Button>
        
        <Button className="min-w-0 p-0" variant="light">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Header;