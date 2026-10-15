import { apiClient, tokenStorage } from './client';

export interface BackendUser {
  id: number | string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile?: {
    current_streak: number;
    longest_streak: number;
    weekly_completion: number;
    weekly_workouts_target: number;
    weekly_workouts_completed: number;
    current_weight_kg: number | null;
    target_weight_kg: number | null;
    training_since: string | null;
    total_workouts: number;
    total_volume_kg: number;
    total_sets: number;
    total_prs: number;
    avatar: string | null;
  };
}

export interface AuthResponse {
  user: BackendUser;
  access: string;
  refresh: string;
}

export const authApi = {
  async login(usernameOrEmail: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login/', {
      username: usernameOrEmail,
      password,
    });
    tokenStorage.setTokens({ access: data.access, refresh: data.refresh });
    return data;
  },

  async register(
    username: string,
    email: string,
    password: string,
    firstName?: string
  ): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register/', {
      username,
      email,
      password,
      password2: password,
      first_name: firstName || username,
      last_name: '',
    });
    tokenStorage.setTokens({ access: data.access, refresh: data.refresh });
    return data;
  },

  async logout(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) {
        await apiClient.post('/auth/logout/', { refresh: refreshToken });
      }
    } finally {
      tokenStorage.clearTokens();
    }
  },

  async getCurrentProfile(): Promise<BackendUser> {
    const { data } = await apiClient.get<BackendUser>('/users/profile/');
    return data;
  },
};
