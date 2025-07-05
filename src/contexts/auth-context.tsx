import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  permissions: string[];
  canAccess: (resource: string) => boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [permissions, setPermissions] = useState([
    'standings',
    'simulate',
    'timing',
    'tests',
    'parts',
    'notes'
  ]);


  const canAccess = (resource: string) => {
    return permissions.includes(resource);
  };

  const login = () => {
    setIsAuthenticated(true);
    // In a real app, you would fetch permissions from an API
    setPermissions(['standings', 'timing', 'notes']);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPermissions([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, permissions, canAccess, login, logout }}>
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