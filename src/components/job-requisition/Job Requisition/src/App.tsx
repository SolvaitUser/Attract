import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { TabNavigation } from "./components/TabNavigation";
import { EmptyTabContent } from "./components/EmptyTabContent";
import { useLanguage } from "./contexts/LanguageContext";
import { JobRequisitionPage } from "./components/job-requisition/JobRequisitionPage";

const tabIcons: Record<string, string> = {
  dashboard: "lucide:bar-chart-2",
  jobRequisition: "lucide:file-text",
  candidate: "lucide:users",
  interview: "lucide:calendar",
  offer: "lucide:mail",
  onboarding: "lucide:check-circle",
  careersPortalSetup: "lucide:settings",
};

function App() {
  const { direction } = useLanguage();
  const [activeTab, setActiveTab] = React.useState("jobRequisition");

  return (
    <div className={direction}>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 p-2 sm:p-4 lg:p-6">
            {activeTab === "jobRequisition" ? (
              <JobRequisitionPage />
            ) : (
              <EmptyTabContent tabId={activeTab} icon={tabIcons[activeTab]} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;