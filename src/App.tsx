import React from "react";
import { AppLayout } from "./components/app-layout";
import { AppProvider } from "./context/app-context";
import { AllActionsView } from "./components/actions";

const App: React.FC = () => {
  const [showAllActions, setShowAllActions] = React.useState(false);
  
  React.useEffect(() => {
    const handleNavigation = () => {
      setShowAllActions(true);
    };
    
    window.addEventListener('navigateToAllActions', handleNavigation);
    
    return () => {
      window.removeEventListener('navigateToAllActions', handleNavigation);
    };
  }, []);
  
  return (
    <AppProvider>
      {showAllActions ? (
        <AllActionsView />
      ) : (
        <AppLayout />
      )}
    </AppProvider>
  );
};

export default App;