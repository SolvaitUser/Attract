import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../context/LanguageContext";

const Sidebar: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <aside className="w-64 bg-wise-sidebar border-e border-gray-200 overflow-y-auto">
      <div className="p-2">
        <Button
          className="w-full justify-start bg-wise-lightBlue text-wise-blue hover:bg-blue-100"
          variant="flat"
          startContent={<Icon icon="lucide:users" />}
        >
          {language === "en" ? "Recruitment" : "التوظيف"}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;