import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Redirect to home page if not authenticated
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to home page if admin access is required but user is not an admin
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
}

export default ProtectedRoute;