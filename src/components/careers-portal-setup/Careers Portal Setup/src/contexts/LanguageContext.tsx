import React, { createContext, useContext, useState } from "react";
import { useAppContext } from "../../../../../context/app-context";
import { LanguageKey } from "../data/translations";

interface LanguageContextType {
  language: LanguageKey;
  direction: "ltr" | "rtl";
  setLanguage: (lang: LanguageKey) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  direction: "ltr",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const app = useAppContext();
  const language = app.language as LanguageKey;
  const direction = app.direction as ("ltr" | "rtl");
  const setLanguage = (lang: LanguageKey) => app.setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);