import React from "react";
import { Icon } from "@iconify/react";
import { useAppContext, TabKey } from "../context/app-context";

type NavItem = {
  key: TabKey | "candidate-portal";
  icon: string;
  label: { en: string; ar: string };
};

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", icon: "lucide:layout-dashboard", label: { en: "Dashboard", ar: "لوحة المعلومات" } },
  { key: "job-requisition", icon: "lucide:file-text", label: { en: "Job Requisition", ar: "طلبات الوظائف" } },
  { key: "candidate", icon: "lucide:user", label: { en: "Candidate", ar: "المرشحين" } },
  { key: "interview", icon: "lucide:calendar", label: { en: "Interview", ar: "المقابلة" } },
  { key: "offer", icon: "lucide:mail", label: { en: "Offer", ar: "العروض" } },
  { key: "onboarding", icon: "lucide:clipboard-check", label: { en: "Onboarding", ar: "التأهيل" } },
  { key: "careers-portal-setup", icon: "lucide:settings", label: { en: "Careers Portal Setup", ar: "إعداد بوابة الوظائف" } },

  { key: "settings", icon: "lucide:sliders-horizontal", label: { en: "Settings", ar: "الإعدادات" } },
];

export const Sidebar: React.FC = () => {
  const { language, activeTab, setActiveTab, direction } = useAppContext();

  const handleClick = (key: NavItem["key"]) => {
    // Map candidate-portal pseudo-key into app TabKey or route handling
    if (key === "candidate-portal") {
      // Push a history path for consistency and open the Candidate Portal tab placeholder
      // We will map this key inside TabContent via path sync
      window.history.pushState({}, "", "/candidate-portal");
      // no change to activeTab here to avoid type mismatch; TabContent will handle path
    } else {
      setActiveTab(key as TabKey);
    }
  };

  const isActive = (key: NavItem["key"]) => {
    if (key === "candidate-portal") {
      return window.location.pathname === "/candidate-portal";
    }
    return activeTab === key;
  };

  return (
    <aside className="w-64 min-h-screen bg-[#FAFAFA] border-r border-gray-200">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center">
                  <div className="bg-attract-blue text-white w-8 h-8 rounded flex items-center justify-center font-bold text-lg">A</div>
        <span className="text-gray-800 font-medium text-lg ml-2">Attract</span>
        </div>
      </div>
      <nav className="p-3 overflow-y-auto">
        <ul className="space-y-1 list-none">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.key);
            return (
              <li key={item.key}>
                <button
                  onClick={() => handleClick(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                    ${active ? "bg-attract-light-blue text-attract-blue font-medium" : "text-gray-700 hover:bg-gray-100 hover:text-attract-blue"}`}
                  style={{ flexDirection: language === "ar" ? "row-reverse" : "row" }}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                  <span className="truncate">{language === "en" ? item.label.en : item.label.ar}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};