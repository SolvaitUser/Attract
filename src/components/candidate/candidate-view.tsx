import React from "react";
import { LanguageProvider } from "./Candidate/src/contexts/LanguageContext";
import CandidateTab from "./Candidate/src/components/candidate/CandidateTab";
import { PageHeader } from "../shared/page-header";

export const CandidateView: React.FC = () => {
  return (
    <LanguageProvider>
      <div>
        <PageHeader 
          title={{ en: "Candidate", ar: "المرشح" }}
          description={{ 
            en: "View, filter, and manage candidate profiles throughout the hiring process.",
            ar: "عرض وتصنيف وإدارة ملفات المرشحين طوال عملية التوظيف."
          }}
        />
        <CandidateTab />
      </div>
    </LanguageProvider>
  );
};


