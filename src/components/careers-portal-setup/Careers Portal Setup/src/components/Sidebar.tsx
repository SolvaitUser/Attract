import React from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export const Sidebar: React.FC = () => {
  const { language, direction } = useLanguage();
  const t = translations[language];

  return (
    <aside className="w-64 h-screen border-r bg-white">
      <div className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-wise-blue text-white rounded flex items-center justify-center font-semibold">
            W
          </div>
          <span className="text-lg font-semibold">Wise</span>
        </div>
      </div>
      <nav className="py-4">
        <ul>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2.5 bg-wise-light-blue text-wise-blue"
            >
              <Icon
                icon="lucide:users"
                className={`${direction === "rtl" ? "ml-1" : "mr-1"}`}
                width={20}
              />
              <span>{t.recruitment}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
