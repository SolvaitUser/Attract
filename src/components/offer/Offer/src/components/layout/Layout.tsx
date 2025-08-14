import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TabNavigation } from './TabNavigation';
import { useLanguage } from '../../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { direction } = useLanguage();

  return (
    <div className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'rtl' : ''}`}>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TabNavigation />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};