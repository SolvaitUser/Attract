import React from "react";
import { LanguageProvider } from "./Job Requisition/src/contexts/LanguageContext";
import { JobRequisitionPage } from "./Job Requisition/src/components/job-requisition/JobRequisitionPage";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "./Job Requisition/src/contexts/LanguageContext";
import { translations } from "./Job Requisition/src/data/translations";
import { PageHeader } from "../shared/page-header";

export const JobRequisitionView: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const RightControls = (
    <div className="flex gap-2">
      <Button 
        variant="flat" 
        color="primary" 
        startContent={<Icon icon="lucide:filter" />}
        onPress={() => window.dispatchEvent(new CustomEvent("jr_toggle_filters"))}
      >
        {t.filters}
      </Button>
      <Dropdown>
        <DropdownTrigger>
          <Button color="primary" endContent={<Icon icon="lucide:chevron-down" />}>{t.createJob}</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Create Job Options">
          <DropdownItem key="manual" onPress={() => window.dispatchEvent(new CustomEvent("jr_create_job", { detail: { mode: "manual" } }))}>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:edit" />
              <span>{t.createJobManual}</span>
            </div>
          </DropdownItem>
          <DropdownItem key="ai" onPress={() => window.dispatchEvent(new CustomEvent("jr_create_job", { detail: { mode: "ai" } }))}>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:cpu" />
              <span>{t.createJobAI}</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  return (
    <LanguageProvider>
      <div>
        <PageHeader 
          title={{ en: "Job Requisition", ar: "طلب التوظيف" }}
          description={{ 
            en: "Manage and track job openings, their status, and recruitment progress.",
            ar: "إدارة وتتبع الوظائف الشاغرة وحالتها وتقدم عملية التوظيف."
          }}
          rightContent={RightControls}
        />
        <JobRequisitionPage />
      </div>
    </LanguageProvider>
  );
};


