import React from "react";

export type Language = "en" | "ar";
export type TabKey = "dashboard" | "job-requisition" | "candidate" | "interview" | "offer" | "onboarding" | "careers-portal-setup" | "settings";

interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  direction: "ltr" | "rtl";
  activeTab: TabKey;
  setActiveTab: (key: TabKey) => void;
}

const AppContext = React.createContext<AppContextType>({
  language: "en",
  setLanguage: () => {},
  direction: "ltr",
  activeTab: "dashboard",
  setActiveTab: () => {},
});

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>("en");
  const [activeTab, setActiveTab] = React.useState<TabKey>("dashboard");

  const direction = language === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.dir = direction;
    if (language === "ar") {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, [direction, language]);

  // Basic path ↔ tab sync for direct navigation and deep-linking
  React.useEffect(() => {
    const pathToTab = (pathname: string): TabKey => {
      const cleaned = pathname.replace(/\/+$/, "");
      switch (cleaned) {
        case "/job-requisition":
          return "job-requisition";
        case "/candidate":
          return "candidate";
        case "/interview":
          return "interview";
        case "/offer":
          return "offer";
        case "/onboarding":
          return "onboarding";
        case "/careers-portal-setup":
          return "careers-portal-setup";
        case "/settings":
          return "settings";
        // keep default to dashboard for unknown paths (incl. candidate-portal)
        case "/":
        default:
          return "dashboard";
      }
    };

    // Initialize from current path
    setActiveTab(pathToTab(window.location.pathname));

    // Handle back/forward
    const onPopState = () => setActiveTab(pathToTab(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Push path when activeTab changes
  React.useEffect(() => {
    const tabToPath = (tab: TabKey): string => {
      switch (tab) {
        case "job-requisition":
          return "/job-requisition";
        case "candidate":
          return "/candidate";
        case "interview":
          return "/interview";
        case "offer":
          return "/offer";
        case "onboarding":
          return "/onboarding";
        case "careers-portal-setup":
          return "/careers-portal-setup";
        case "settings":
          return "/settings";
        case "dashboard":
        default:
          return "/";
      }
    };
    const newPath = tabToPath(activeTab);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
  }, [activeTab]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        direction,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);