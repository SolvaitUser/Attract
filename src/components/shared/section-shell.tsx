import React from "react";

interface SectionShellProps {
  children: React.ReactNode;
}

export const SectionShell: React.FC<SectionShellProps> = ({ children }) => {
  return <div className="bg-white rounded-lg shadow p-6 h-full">{children}</div>;
};


