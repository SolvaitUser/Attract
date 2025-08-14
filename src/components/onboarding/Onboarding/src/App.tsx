import React from 'react';
import Layout from './components/Layout';
import { TabContent } from './components/TabContent';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('analytics');
  const { direction } = useLanguage();

  return (
    <div dir={direction} className="h-screen flex flex-col">
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        <TabContent activeTab={activeTab} />
      </Layout>
    </div>
  );
};

export default App;