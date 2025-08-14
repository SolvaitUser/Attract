import React from "react";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAppContext } from "../context/app-context";

export const Header: React.FC = () => {
  const { language, setLanguage } = useAppContext();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // no Ask AI here per user preference

  return (
    <header className="h-16 border-b border-gray-200 flex items-center px-6">
      {/* Left spacer (brand sits in sidebar) */}
      <div className="flex items-center" />

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
              className={language === "en" ? "text-wise-blue" : ""}
            >
              English
            </DropdownItem>
            <DropdownItem 
              key="ar" 
              onPress={() => setLanguage("ar")}
              className={language === "ar" ? "text-wise-blue" : ""}
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