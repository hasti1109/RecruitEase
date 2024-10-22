import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  element: JSX.Element;
  role?: 'recruiter' | 'applicant';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/error" />;
  }

  return element;
};

export default ProtectedRoute;
