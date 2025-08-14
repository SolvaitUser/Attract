import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, Button, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import Sidebar from './Sidebar';
import { TabNavigation } from './TabNavigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { t } = useLanguage();

  // Add a new menu item for "My Tasks" in the sidebar menu items array
  const menuItems = [
    {
      key: 'myTasks',
      label: t('myTasks'),
      icon: <Icon icon="lucide:list-checks" width={20} height={20} />,
      badge: 5,  // This would dynamically show the number of pending tasks
    },
    // ... existing menu items ...
  ];

  return (
    <div className="flex flex-col h-full bg-wise-gray">
      <Navbar className="bg-white border-b border-wise-border p-3">
        <NavbarBrand>
          <div className="flex items-center gap-3">
            <div className="bg-wise-blue text-white h-10 w-10 flex items-center justify-center font-bold rounded-md">
              <span>W</span>
            </div>
            <span className="font-bold text-xl">Wise</span>
          </div>
        </NavbarBrand>
        <NavbarContent className="justify-center">
          <h1 className="text-xl font-medium">{t('welcomeToWise')}</h1>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-4">
          <LanguageSwitcher />
          <Button isIconOnly variant="light" radius="full">
            <Icon icon="lucide:bell" width={20} />
          </Button>
          <Avatar 
            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1234" 
            size="sm"
          />
        </NavbarContent>
      </Navbar>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
          <div className="flex-1 p-4 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;