import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Mock login - in production, this would call an API
    if (email === 'admin@company.com' && password === 'admin123') {
      const mockUser: User = {
        id: '1',
        name: 'Quản Trị Viên',
        email: 'admin@company.com',
        role: 'admin',
        department: 'Giám đốc',
      };
      setUser(mockUser);
      return true;
    }

    if (email === 'manager@company.com' && password === 'manager123') {
      const mockUser: User = {
        id: '2',
        name: 'Trưởng Phòng Marketing',
        email: 'manager@company.com',
        role: 'manager',
        department: 'Marketing',
      };
      setUser(mockUser);
      return true;
    }

    if (email === 'guest@company.com' && password === 'guest123') {
      const mockUser: User = {
        id: '3',
        name: 'Khách',
        email: 'guest@company.com',
        role: 'guest',
        department: 'Khách mời',
      };
      setUser(mockUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
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
