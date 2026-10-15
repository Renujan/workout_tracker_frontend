import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../api/auth';
import { tokenStorage } from '../api/client';

export type FitnessGoalType = 'Build Muscle' | 'Lose Fat' | 'Maintain';
export type TrainingExperience = 'Beginner' | 'Intermediate' | 'Advanced';

export interface OnboardingData {
  goal: FitnessGoalType | null;
  weightKg: string;
  heightCm: string;
  age: string;
  experience: TrainingExperience | null;
  daysPerWeek: number | null;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnboarded: boolean;
  onboardingData?: OnboardingData;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (data: OnboardingData) => void;
  skipOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'progressx_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = user !== null;
  const isOnboarded = user?.isOnboarded ?? false;

  const persist = (u: AuthUser | null) => {
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      tokenStorage.clearTokens();
    }
    setUser(u);
  };

  // On initial mount, if access token exists, ensure profile is fresh
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (token && !user) {
      authApi
        .getCurrentProfile()
        .then((backendUser) => {
          const name = backendUser.first_name || backendUser.username;
          const restored: AuthUser = {
            id: String(backendUser.id),
            name,
            email: backendUser.email,
            avatar:
              backendUser.profile?.avatar ||
              `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=22c55e`,
            isOnboarded: true,
          };
          persist(restored);
        })
        .catch(() => {
          // Token expired or invalid
          tokenStorage.clearTokens();
        });
    }
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      const res = await authApi.login(usernameOrEmail, password);
      const displayName = res.user.first_name || res.user.username;
      const u: AuthUser = {
        id: String(res.user.id),
        name: displayName,
        email: res.user.email || usernameOrEmail,
        avatar:
          res.user.profile?.avatar ||
          `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=22c55e`,
        isOnboarded: true,
      };
      persist(u);
    } catch (err) {
      // If backend is unavailable or demo mode, fallback gracefully
      console.warn('[AuthContext] Backend login failed, attempting local fallback:', err);
      // If error is actual invalid credentials from server, rethrow
      if (err && typeof err === 'object' && 'response' in err) {
        throw err;
      }
      const name = usernameOrEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const u: AuthUser = {
        id: `u_${Date.now()}`,
        name,
        email: usernameOrEmail,
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=22c55e`,
        isOnboarded: false,
      };
      persist(u);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      const res = await authApi.register(username, email, password, name);
      const displayName = res.user.first_name || res.user.username;
      const u: AuthUser = {
        id: String(res.user.id),
        name: displayName,
        email: res.user.email,
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=22c55e`,
        isOnboarded: false,
      };
      persist(u);
    } catch (err) {
      console.warn('[AuthContext] Backend register failed, fallback:', err);
      if (err && typeof err === 'object' && 'response' in err) {
        throw err;
      }
      const u: AuthUser = {
        id: `u_${Date.now()}`,
        name,
        email,
        avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=22c55e`,
        isOnboarded: false,
      };
      persist(u);
    }
  };

  const logout = () => {
    authApi.logout().catch(() => {});
    persist(null);
  };

  const completeOnboarding = (data: OnboardingData) => {
    if (!user) return;
    const updated: AuthUser = { ...user, isOnboarded: true, onboardingData: data };
    persist(updated);
  };

  const skipOnboarding = () => {
    if (!user) return;
    const updated: AuthUser = { ...user, isOnboarded: true };
    persist(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isOnboarded,
        login,
        register,
        logout,
        completeOnboarding,
        skipOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
