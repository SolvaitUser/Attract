import React from "react";
import { LanguageProvider } from "./Interview/src/context/LanguageContext";
import InterviewTab from "./Interview/src/components/interview/InterviewTab";
import { PageHeader } from "../shared/page-header";

export const InterviewView: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="h-full">
        <PageHeader
          title={{ en: "Interview", ar: "المقابلة" }}
          description={{
            en: "Schedule, manage, and track interview stages for candidates.",
            ar: "جدولة وإدارة وتتبع مراحل المقابلات للمرشحين.",
          }}
        />
        <InterviewTab />
      </div>
    </LanguageProvider>
  );
};
