import React from "react";
import { useAppContext } from "../../context/app-context";

export interface LocalizedText {
  en: string;
  ar: string;
}

interface PageHeaderProps {
  title: LocalizedText;
  description: LocalizedText;
  rightContent?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, rightContent }) => {
  const { language } = useAppContext();

  return (
    <div className="mb-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 whitespace-nowrap">
          {language === "en" ? title.en : title.ar}
        </h2>
        {rightContent && (
          <div className="w-full sm:w-auto flex justify-start sm:justify-end gap-2">
            {rightContent}
          </div>
        )}
      </div>
      <p className="mt-1 text-gray-500">
        {language === "en" ? description.en : description.ar}
      </p>
    </div>
  );
};


