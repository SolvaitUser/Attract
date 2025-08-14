import React from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';
import { MainLayout } from '../../components/layout/main-layout';
import { AuthForm } from '../../components/auth/auth-form';
import { ResumeUpload } from '../../components/auth/resume-upload';

export const RegisterPage: React.FC = () => {
  const { translate } = useLanguage();
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  const [step, setStep] = React.useState(1);
  const [resumeUrl, setResumeUrl] = React.useState('');
  
  // If already authenticated, redirect to home
  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace('/');
    }
  }, [isAuthenticated, history]);

  const handleRegisterSuccess = () => {
    setStep(2);
  };
  
  const handleUploadComplete = (url: string) => {
    setResumeUrl(url);
  };
  
  const handleAiProcessComplete = () => {
    setTimeout(() => {
      history.push('/');
    }, 1500);
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
        <h1 className="text-3xl font-bold mb-2 text-center">
          {step === 1 
            ? translate('auth.register')
            : translate('auth.resumeUpload')
          }
        </h1>
        <p className="text-default-500 mb-8 text-center">
          {step === 1 
            ? 'Create your account to start applying for jobs'
            : 'Upload your resume to enhance your profile with AI'
          }
        </p>
        
        {step === 1 ? (
          <AuthForm type="register" onSuccess={handleRegisterSuccess} />
        ) : (
          <div className="w-full max-w-md">
            <ResumeUpload 
              onUploadComplete={handleUploadComplete} 
              onAiProcessComplete={handleAiProcessComplete} 
            />
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
};
