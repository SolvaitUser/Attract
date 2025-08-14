import React from "react";
import { ButtonGroup, Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

interface ViewModeToggleProps {
  currentView: "list" | "card" | "compact";
  onChange: (view: "list" | "card" | "compact") => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ currentView, onChange }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <ButtonGroup variant="flat" size="sm">
      <Tooltip content={t.listView}>
        <Button
          isIconOnly
          className={currentView === "list" ? "bg-primary-100 text-primary" : ""}
          onPress={() => onChange("list")}
        >
          <Icon icon="lucide:list" width={16} />
        </Button>
      </Tooltip>
      <Tooltip content={t.cardView}>
        <Button
          isIconOnly
          className={currentView === "card" ? "bg-primary-100 text-primary" : ""}
          onPress={() => onChange("card")}
        >
          <Icon icon="lucide:layout-grid" width={16} />
        </Button>
      </Tooltip>
      <Tooltip content={t.compactView}>
        <Button
          isIconOnly
          className={currentView === "compact" ? "bg-primary-100 text-primary" : ""}
          onPress={() => onChange("compact")}
        >
          <Icon icon="lucide:align-justify" width={16} />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};