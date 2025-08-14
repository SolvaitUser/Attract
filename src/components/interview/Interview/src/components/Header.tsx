import React from "react";
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/LanguageContext";

const Header: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <header className="h-16 px-4 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center me-3">
          <span className="text-white font-bold text-xl">W</span>
        </div>
        <span className="font-semibold text-xl">Wise</span>
      </div>
      
      <div className="flex-1 px-8">
        <h1 className="text-xl font-medium">Welcome to Wise</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="light" 
          startContent={<Icon icon="lucide:globe" />}
          onPress={toggleLanguage}
          className="rounded-full"
        >
          {language.toUpperCase()}
        </Button>
        
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="cursor-pointer">
              <Avatar
                src="https://img.heroui.chat/image/avatar?w=200&h=200&u=10"
                showFallback
                size="md"
                className="cursor-pointer"
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu">
            <DropdownItem key="profile">
              {language === "en" ? "Profile" : "الملف الشخصي"}
            </DropdownItem>
            <DropdownItem key="settings">
              {language === "en" ? "Settings" : "الإعدادات"}
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              {language === "en" ? "Logout" : "تسجيل الخروج"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;