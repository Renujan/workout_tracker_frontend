import { UserProfile } from '../types';
import { mockUserProfile } from '../data/mockData';

export const userService = {
  async getUserProfile(): Promise<UserProfile> {
    return Promise.resolve({ ...mockUserProfile });
  },

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    Object.assign(mockUserProfile, updates);
    return Promise.resolve({ ...mockUserProfile });
  },
};
