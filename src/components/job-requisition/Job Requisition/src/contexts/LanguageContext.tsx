import React from "react";
import { useAppContext } from "../../../../../context/app-context";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
}

// Bridge the Job Requisition module to the host app's context
export const LanguageContext = React.createContext<LanguageContextType>({
  language: "en",
  direction: "ltr",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, direction, setLanguage } = useAppContext();
  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => React.useContext(LanguageContext);
