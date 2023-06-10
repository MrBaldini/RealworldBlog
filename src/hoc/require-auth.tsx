import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { newUser } = useAuth();

  if (!newUser?.username) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
