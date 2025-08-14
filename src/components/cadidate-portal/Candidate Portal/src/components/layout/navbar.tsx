import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge, Avatar, Link } from '@heroui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';
import { ThemeToggle } from '../../contexts/theme-context';
import { NotificationsDropdown } from '../notifications/notifications-dropdown';

export const MainNavbar: React.FC = () => {
  const { translate, language, setLanguage } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
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
      name: translate('nav.interviews'), 
      path: '/interviews',
      icon: 'lucide:calendar',
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

  // Language toggle handler
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Navbar
      className="bg-background/80 backdrop-blur-xl border-b border-divider py-2 h-16"
      maxWidth="xl"
      isBordered
    >
      <NavbarBrand as={RouterLink} to="/" className="gap-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <div className="bg-primary-500 w-8 h-8 rounded-lg flex items-center justify-center mr-2">
              <Icon icon="lucide:brain-circuit" className="text-white" width={20} height={20} />
            </div>
            <p className="font-bold text-inherit text-xl">WISE</p>
          </div>
        </motion.div>
      </NavbarBrand>

      {isAuthenticated && (
        <NavbarContent className="hidden md:flex gap-6" justify="center">
          {navLinks.map((link) => (
            <NavbarItem key={link.path} isActive={isActive(link.path)}>
              <Link 
                as={RouterLink} 
                to={link.path}
                color={isActive(link.path) ? "primary" : "foreground"}
                className={`flex items-center gap-1 font-medium ${isActive(link.path) ? 'font-semibold' : ''}`}
                underline={isActive(link.path) ? "always" : "none"}
              >
                <Icon icon={link.icon} className={`${language === 'ar' ? 'ltr-icon' : ''} h-4 w-4`} />
                {link.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      <NavbarContent justify="end" className="gap-3">
        <NavbarItem className="flex">
          <Button
            variant="light"
            isIconOnly
            onPress={toggleLanguage}
            aria-label="Toggle language"
            className="transition-transform hover:scale-105"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </Button>
        </NavbarItem>

        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>

        {isAuthenticated ? (
          <>
            <NavbarItem>
              <NotificationsDropdown />
            </NavbarItem>
            
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    color="primary"
                    size="sm"
                    name={user?.fullName}
                    src={user?.profilePicture || "https://img.heroui.chat/image/avatar?w=200&h=200&u=123"}
                    className="cursor-pointer"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions">
                  <DropdownItem key="profile" className="h-14 gap-2" textValue="Signed in">
                    <p className="font-semibold">{translate('nav.profile')}</p>
                    <p className="font-semibold text-primary-500">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                    {translate('profile.title')}
                  </DropdownItem>
                  <DropdownItem key="logout" startContent={<Icon icon="lucide:log-out" />} onPress={logout}>
                    {translate('nav.logout')}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="flex gap-2">
            <Button
              as={RouterLink}
              to="/login"
              variant="flat"
              size="sm"
              color="default"
              className="font-medium"
            >
              {translate('auth.login')}
            </Button>
            <Button
              as={RouterLink}
              to="/register"
              color="primary"
              size="sm"
              className="font-medium"
            >
              {translate('auth.register')}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};
