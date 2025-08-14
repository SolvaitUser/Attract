import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from '@heroui/react';

// Lazy loading pages
const LoginPage = React.lazy(() => import('../pages/auth/login-page').then(module => ({ default: module.LoginPage })));
const RegisterPage = React.lazy(() => import('../pages/auth/register-page').then(module => ({ default: module.RegisterPage })));
const HomePage = React.lazy(() => import('../pages/home/home-page').then(module => ({ default: module.HomePage })));
const ApplicationsPage = React.lazy(() => import('../pages/applications/applications-page').then(module => ({ default: module.ApplicationsPage })));

// Loading fallback component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Spinner size="lg" color="primary" />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/applications" component={ApplicationsPage} />
        {/* More routes will be added for other pages */}
      </Switch>
    </React.Suspense>
  );
};