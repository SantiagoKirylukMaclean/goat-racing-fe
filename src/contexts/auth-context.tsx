import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  permissions: string[];
  isAdmin: boolean;
  canAccess: (resource: string) => boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to check if auth cookie exists
const hasAuthCookie = (): boolean => {
  return document.cookie.split(';').some(item => item.trim().startsWith('auth_token='));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for auth cookie on mount
  useEffect(() => {
    if (hasAuthCookie()) {
      setIsAuthenticated(true);
      // For now, we'll use hardcoded permissions
      // In a real app, you would fetch these from an API
      setPermissions(['standings', 'timing', 'notes']);
      // Check if user is admin - in a real app, this would be determined by the server
      setIsAdmin(true); // For demonstration, we'll set all authenticated users as admin
    }
  }, []);

  const canAccess = (resource: string) => {
    return permissions.includes(resource);
  };

  const login = () => {
    setIsAuthenticated(true);
    // For now, we'll use hardcoded permissions
    // In a real app, you would fetch these from an API
    setPermissions(['standings', 'timing', 'notes']);
    // Set admin status - in a real app, this would be determined by the server
    setIsAdmin(true); // For demonstration, we'll set all authenticated users as admin
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPermissions([]);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, permissions, isAdmin, canAccess, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
