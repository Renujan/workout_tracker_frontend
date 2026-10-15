/// <reference types="vite/client" />
import axios, { InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface AuthTokens {
  access: string;
  refresh: string;
}

const TOKENS_STORAGE_KEY = 'progressx_jwt_tokens';

export const tokenStorage = {
  getTokens(): AuthTokens | null {
    try {
      const raw = localStorage.getItem(TOKENS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setTokens(tokens: AuthTokens) {
    localStorage.setItem(TOKENS_STORAGE_KEY, JSON.stringify(tokens));
  },
  clearTokens() {
    localStorage.removeItem(TOKENS_STORAGE_KEY);
  },
  getAccessToken(): string | null {
    const tokens = this.getTokens();
    return tokens?.access || null;
  },
  getRefreshToken(): string | null {
    const tokens = this.getTokens();
    return tokens?.refresh || null;
  },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT access token to outgoing requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
