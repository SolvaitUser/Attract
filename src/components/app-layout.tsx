import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { TabContent } from "./tab-content";
import { useAppContext } from "../context/app-context";

export const AppLayout: React.FC = () => {
  const { direction, sidebarCollapsed } = useAppContext();

  return (
    <div className="flex h-full bg-background" dir={direction}>
      <Sidebar />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : ''}`}>
        <Header />
        <main className="flex-1 p-6">
          <TabContent />
        </main>
      </div>
    </div>
  );
};