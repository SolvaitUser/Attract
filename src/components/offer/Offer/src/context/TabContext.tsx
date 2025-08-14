import React, { createContext, useContext } from "react";
import { Icon } from "@iconify/react";

// Define all possible tab keys
export type TabKey = 
  | "analytics" 
  | "job-requisition" 
  | "candidate" 
  | "interview" 
  | "offer" 
  | "onboarding" 
  | "careers-portal-setup";

interface TabItem {
  key: TabKey;
  title: {
    en: string;
    ar: string;
  };
  icon: string;
}

interface TabContentContextType {
  tabs: TabItem[];
}

const tabItems: TabItem[] = [
  {
    key: "analytics",
    title: {
      en: "Analytics",
      ar: "التحليلات"
    },
    icon: "lucide:bar-chart-2"
  },
  {
    key: "job-requisition",
    title: {
      en: "Job Requisition",
      ar: "طلب وظيفة"
    },
    icon: "lucide:file-text"
  },
  {
    key: "candidate",
    title: {
      en: "Candidate",
      ar: "المرشح"
    },
    icon: "lucide:user"
  },
  {
    key: "interview",
    title: {
      en: "Interview",
      ar: "مقابلة"
    },
    icon: "lucide:calendar"
  },
  {
    key: "offer",
    title: {
      en: "Offer",
      ar: "عرض"
    },
    icon: "lucide:mail"
  },
  {
    key: "onboarding",
    title: {
      en: "Onboarding",
      ar: "التعريف"
    },
    icon: "lucide:check-circle"
  },
  {
    key: "careers-portal-setup",
    title: {
      en: "Careers Portal Setup",
      ar: "إعداد بوابة الوظائف"
    },
    icon: "lucide:settings"
  }
];

const TabContentContext = createContext<TabContentContextType>({
  tabs: tabItems
});

export const useTabContent = () => useContext(TabContentContext);

export const TabContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TabContentContext.Provider value={{ tabs: tabItems }}>
      {children}
    </TabContentContext.Provider>
  );
};