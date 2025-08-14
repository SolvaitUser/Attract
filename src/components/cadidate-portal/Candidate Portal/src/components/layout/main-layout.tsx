import React from 'react';
import { motion } from 'framer-motion';
import { Spinner } from '@heroui/react';
import { MainNavbar } from './navbar';
import { MobileNavbar } from './mobile-navbar';
import { useAuth } from '../../contexts/auth-context';

interface MainLayoutProps {
  children: React.ReactNode;
  withNavbar?: boolean;
  withMobileNavbar?: boolean;
  requireAuth?: boolean;
  loading?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  withNavbar = true,
  withMobileNavbar = true,
  requireAuth = false,
  loading = false,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const showMobileNavigation = withMobileNavbar && isAuthenticated;
  
  // Check if still loading auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Check if requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-default-500">You need to be logged in to access this page.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => window.location.href = '/login'}
        >
          Go to Login
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {withNavbar && <MainNavbar />}
      
      <main className={`flex-1 ${showMobileNavigation ? 'pb-20' : ''}`}>
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {children}
          </motion.div>
        )}
      </main>
      
      {showMobileNavigation && <MobileNavbar />}
    </div>
  );
};
