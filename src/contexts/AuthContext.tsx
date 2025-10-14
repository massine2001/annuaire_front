import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types/models';
import { login as loginApi, register as registerApi, getCurrentUser } from '../api/authApi';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
        try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setToken('authenticated'); 
      } catch (error) {
        setToken(null);
        setUser(null);
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);


  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginApi(credentials);
      
      setToken('authenticated');
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await registerApi(data);
      
      setToken('authenticated');
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      setToken(null);
      setUser(null);
    });
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
