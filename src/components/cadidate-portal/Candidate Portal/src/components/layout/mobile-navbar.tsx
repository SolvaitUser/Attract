import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';

export const MobileNavbar: React.FC = () => {
  const { translate, language } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { 
      name: translate('nav.home'), 
      path: '/',
      icon: 'lucide:home',
    },
    { 
      name: translate('nav.jobs'), 
      path: '/jobs',
      icon: 'lucide:briefcase',
    },
    { 
      name: translate('nav.applications'), 
      path: '/applications',
      icon: 'lucide:clipboard-list',
    },
    { 
      name: translate('nav.profile'), 
      path: '/profile',
      icon: 'lucide:user',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 md:hidden bg-background/80 backdrop-blur-xl border-t border-divider z-50"
    >
      <div className="flex justify-around items-center h-16">
        {navLinks.map((link) => (
          <Button
            key={link.path}
            as={RouterLink}
            to={link.path}
            variant="light"
            color={isActive(link.path) ? "primary" : "default"}
            className={`flex flex-col items-center justify-center h-full ${language === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            <Icon 
              icon={link.icon} 
              className={`${language === 'ar' ? 'ltr-icon' : ''} h-5 w-5`} 
            />
            <span className="text-tiny mt-1">{link.name}</span>
          </Button>
        ))}
      </div>
    </motion.nav>
  );
};
