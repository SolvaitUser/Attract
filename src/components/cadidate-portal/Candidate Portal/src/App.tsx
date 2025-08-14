import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
};

export default App;