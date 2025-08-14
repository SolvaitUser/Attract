import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="light"
          radius="full"
          className="text-default-600 min-w-0 px-2"
          startContent={<Icon icon="lucide:globe" width={20} />}
        >
          {language === 'en' ? 'EN' : 'AR'}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Language options">
        <DropdownItem
          key="en"
          onPress={() => changeLanguage('en')}
          startContent={<Icon icon="lucide:check" className={language === 'en' ? 'visible' : 'invisible'} />}
        >
          English
        </DropdownItem>
        <DropdownItem
          key="ar"
          onPress={() => changeLanguage('ar')}
          startContent={<Icon icon="lucide:check" className={language === 'ar' ? 'visible' : 'invisible'} />}
        >
          العربية
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};