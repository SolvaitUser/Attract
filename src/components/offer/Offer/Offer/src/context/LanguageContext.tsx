import React, { createContext, useContext } from "react";
import { useAppContext } from "../../../../../../context/app-context";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  direction: "ltr",
  toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, direction, setLanguage } = useAppContext();
  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");
  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};