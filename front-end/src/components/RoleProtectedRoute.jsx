import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RoleProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user's role does not match the required role, redirect them
  if (user.role !== role) {
    return <Navigate to="/" />; // Redirect to the user homepage
  }
  
  return children;
}

export default RoleProtectedRoute;