import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { TabNavigation } from "./components/TabNavigation";
import { EmptyTabContent } from "./components/EmptyTabContent";
import { useLanguage } from "./contexts/LanguageContext";
import { CareersPortalSetup } from "./components/careers-portal-setup/CareersPortalSetup";

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
  const [activeTab, setActiveTab] = React.useState("careersPortalSetup");

  return (
    <div className={direction}>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1">
            {activeTab === "careersPortalSetup" ? (
              <CareersPortalSetup />
            ) : (
              <div className="p-6">
                <EmptyTabContent tabId={activeTab} icon={tabIcons[activeTab]} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;