import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types/models';
import { login as loginApi, register as registerApi, getCurrentUser } from '../api/authApi';
import { saveToken, getToken, removeToken } from '../utils/storage';

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
  const [token, setToken] = useState<string | null>(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = getToken();
      
      if (savedToken) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setToken(savedToken);
        } catch (error) {
          console.error('Token invalide:', error);
          removeToken();
          setToken(null);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        if (e.newValue === null) {
          setToken(null);
          setUser(null);
          window.location.href = '/login';
        } else if (e.oldValue !== e.newValue) {
          try {
            const currentUser = await getCurrentUser();
            setToken(e.newValue);
            setUser(currentUser);
            window.location.reload();
          } catch (error) {
            console.error('Erreur lors de la synchronisation:', error);
            removeToken();
            setToken(null);
            setUser(null);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginApi(credentials);
      
      saveToken(response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await registerApi(data);
      
      saveToken(response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };


  const logout = () => {
    removeToken();
    setToken(null);
    setUser(null);
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
