import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MarketingLayout } from '@/layouts/MarketingLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home } from '@/pages/marketing/Home';
import { Features } from '@/pages/marketing/Features';
import { Pricing } from '@/pages/marketing/Pricing';
import { Login } from '@/pages/marketing/Login';
import { DashboardHome } from '@/pages/dashboard/DashboardHome';
import { Projects } from '@/pages/dashboard/Projects';
import { Settings } from '@/pages/dashboard/Settings';
import { NotFound } from '@/pages/error/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketingLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'features',
        element: <Features />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: 'projects',
            element: <Projects />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);