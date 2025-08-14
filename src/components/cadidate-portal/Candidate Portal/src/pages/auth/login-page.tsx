import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';
import { MainLayout } from '../../components/layout/main-layout';
import { AuthForm } from '../../components/auth/auth-form';

export const LoginPage: React.FC = () => {
  const { translate } = useLanguage();
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  
  // If already authenticated, redirect to home
  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace('/');
    }
  }, [isAuthenticated, history]);

  const handleLoginSuccess = () => {
    history.push('/');
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">{translate('auth.login')}</h1>
        <AuthForm type="login" onSuccess={handleLoginSuccess} />
      </motion.div>
    </MainLayout>
  );
};
