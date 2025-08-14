import React from "react";
import Layout from "./components/Layout";
import TabNavigation from "./components/TabNavigation";
import { LanguageProvider } from "./context/LanguageContext";
import { TabContentProvider, TabKey } from "./context/TabContext";

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<TabKey>("interview");

  return (
    <LanguageProvider>
      <TabContentProvider>
        <Layout>
          <TabNavigation selectedTab={selectedTab} onTabChange={setSelectedTab} />
          {/* Tab content will be rendered inside Layout component */}
        </Layout>
      </TabContentProvider>
    </LanguageProvider>
  );
};

export default App;