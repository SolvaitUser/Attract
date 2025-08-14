import React from "react";
import { Icon } from "@iconify/react";
import { useAppContext, TabKey } from "../context/app-context";
import { DashboardContent } from "./dashboard/dashboard-content";
import { JobRequisitionView } from "./job-requisition/job-requisition-view";
import { CandidateView } from "./candidate/candidate-view";
import { InterviewView } from "./interview/interview-view";
import { OnboardingView } from "./onboarding/onboarding-view";
import { OfferView } from "./offer/offer-view";
import { CareersPortalSetupView } from "./careers-portal-setup/careers-portal-setup-view";
import { SettingsView } from "./settings/settings-view";
// Candidate Portal is a separate demo app; for now show a placeholder when path is /candidate-portal

const getTabInfo = (tabKey: TabKey, language: "en" | "ar") => {
  const tabInfo = {
    "dashboard": {
      title: { en: "Dashboard", ar: "لوحة المعلومات" },
      icon: "lucide:layout-dashboard",
    },
    "job-requisition": {
      title: { en: "Job Requisition", ar: "طلبات الوظائف" },
      icon: "lucide:file-text",
    },
    "candidate": {
      title: { en: "Candidate", ar: "المرشحين" },
      icon: "lucide:user",
    },
    "interview": {
      title: { en: "Interview", ar: "المقابلة" },
      icon: "lucide:calendar",
    },
    "offer": {
      title: { en: "Offer", ar: "العروض" },
      icon: "lucide:mail",
    },
    "onboarding": {
      title: { en: "Onboarding", ar: "التأهيل" },
      icon: "lucide:clipboard-check",
    },
    "careers-portal-setup": {
      title: { en: "Careers Portal Setup", ar: "إعداد بوابة الوظائف" },
      icon: "lucide:settings",
    },
    "settings": {
      title: { en: "Settings", ar: "الإعدادات" },
      icon: "lucide:sliders-horizontal",
    },
  };
  
  return tabInfo[tabKey];
};

export const TabContent: React.FC = () => {
  const { language, activeTab } = useAppContext();
  const tabInfo = getTabInfo(activeTab, language);

  // Render content per tab
  if (activeTab === "dashboard") return <DashboardContent />;
  if (activeTab === "job-requisition") return <JobRequisitionView />;
  if (activeTab === "candidate") return <CandidateView />;
  if (activeTab === "interview") return <InterviewView />;
  if (activeTab === "offer") return <OfferView />;
  if (activeTab === "onboarding") return <OnboardingView />;
  if (activeTab === "careers-portal-setup") return <CareersPortalSetupView />;
  if (activeTab === "settings") return <SettingsView />;

  // If user clicked Candidate Portal in sidebar, we pushed /candidate-portal in history.
  // Show a minimal placeholder with link to open the nested demo or note.
  if (window.location.pathname === "/candidate-portal") {
    return (
      <div className="flex flex-col items-center justify-center p-10 mt-8">
        <div className="w-20 h-20 rounded-full bg-wise-light-blue flex items-center justify-center mb-4">
          <Icon icon="lucide:globe" className="text-wise-blue w-10 h-10" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {language === "en" ? "Candidate Portal" : "بوابة المرشحين"}
        </h2>
        <p className="text-gray-500 text-center max-w-xl">
          {language === "en"
            ? "This opens the standalone Candidate Portal experience."
            : "هذا يفتح تجربة بوابة المرشحين المستقلة."}
        </p>
      </div>
    );
  }

  // For other tabs, show the placeholder content
  return (
    <div className="flex flex-col items-center justify-center p-10 mt-8">
      <div className="w-20 h-20 rounded-full bg-wise-light-blue flex items-center justify-center mb-4">
        <Icon icon={tabInfo.icon} className="text-wise-blue w-10 h-10" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {tabInfo.title[language]}
      </h2>
      <p className="text-gray-500">
        {language === "en" ? "Content coming soon" : "المحتوى قادم قريبا"}
      </p>
    </div>
  );
};