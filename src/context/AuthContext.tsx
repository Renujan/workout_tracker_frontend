import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (email: string, password: string) => Promise<void>;
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
    }
    setUser(u);
  };

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const u: AuthUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=22c55e`,
      isOnboarded: false,
    };
    persist(u);
  };

  const register = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 900));
    const u: AuthUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=22c55e`,
      isOnboarded: false,
    };
    persist(u);
  };

  const logout = () => {
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
