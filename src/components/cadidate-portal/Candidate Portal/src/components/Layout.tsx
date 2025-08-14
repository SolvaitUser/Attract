import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import EmptyState from './EmptyState';
import CandidateTab from './candidate/CandidateTab';

type TabType = 'analytics' | 'jobRequisition' | 'candidate' | 'interview' | 'offer' | 'onboarding' | 'careersPortalSetup';

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('candidate');
  
  return (
    <div className="flex flex-col h-full bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-4 overflow-auto">
            <div className="bg-white rounded-lg shadow p-6 h-full">
              {activeTab === 'candidate' ? (
                <CandidateTab />
              ) : (
                <EmptyState tabKey={activeTab} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;