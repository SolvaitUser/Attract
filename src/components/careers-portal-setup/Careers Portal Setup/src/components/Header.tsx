import React from "react";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export const Header: React.FC = () => {
  const { language, direction, setLanguage } = useLanguage();
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div className="h-16 border-b flex items-center justify-between px-4">
      <h1 className="text-lg font-semibold">Welcome to Wise</h1>
      <div className="flex items-center gap-4">
        <Button
          variant="light"
          className="text-default-600 h-10 font-medium"
          startContent={<Icon icon="lucide:globe" />}
          onPress={toggleLanguage}
        >
          {language === "en" ? "EN" : "عربي"}
        </Button>

        <div className="w-10 h-10 flex items-center justify-center text-default-500">
          <Icon icon="lucide:bell" width={20} />
        </div>

        <Avatar
          src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
