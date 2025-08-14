import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLanguage } from "../context/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { direction } = useLanguage();
  
  return (
    <div className={`flex flex-col h-screen ${direction}`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;