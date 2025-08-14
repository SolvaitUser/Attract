import React from "react";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAppContext } from "../context/app-context";

export const Header: React.FC = () => {
  const { language, setLanguage, sidebarCollapsed, setSidebarCollapsed } = useAppContext();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // no Ask AI here per user preference

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <header className="h-16 border-b border-gray-200 flex items-center px-6">
      {/* Left spacer (brand sits in sidebar) */}
      <div className="flex items-center">
        {/* Mobile sidebar toggle - only visible on small screens */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors mr-3"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon icon="lucide:menu" className="w-5 h-5" />
        </button>
      </div>

      {/* Middle spacer */}
      <div className="flex-1" />

      {/* Right controls */}
      <div className="flex items-center space-x-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button 
              className="bg-transparent min-w-0 px-2"
              variant="light"
            >
              <div className="flex items-center">
                <Icon icon="lucide:globe" className="w-5 h-5 mr-1" />
                <span>{language === "en" ? "EN" : "AR"}</span>
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Language options">
            <DropdownItem 
              key="en" 
              onPress={() => setLanguage("en")}
              className={language === "en" ? "text-attract-blue" : ""}
            >
              English
            </DropdownItem>
            <DropdownItem 
              key="ar" 
              onPress={() => setLanguage("ar")}
              className={language === "ar" ? "text-attract-blue" : ""}
            >
              العربية
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button className="bg-transparent min-w-0 px-2" variant="light">
          <Icon icon="lucide:bell" className="w-5 h-5" />
        </Button>

        <Avatar 
          src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
          className="cursor-pointer"
          size="sm"
        />
      </div>
    </header>
  );
};