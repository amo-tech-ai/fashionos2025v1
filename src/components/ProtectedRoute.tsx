import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';

export const ProtectedRoute: React.FC = () => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};