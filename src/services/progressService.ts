import {
  PersonalRecord,
  BodyMeasurement,
  ProgressPhoto,
  FitnessGoal,
  Achievement,
  FitnessInsight,
} from '../types';
import {
  mockPersonalRecords,
  mockBodyMeasurements,
  mockProgressPhotos,
  mockGoals,
  mockAchievements,
  mockInsights,
} from '../data/mockData';

export const progressService = {
  async getPersonalRecords(): Promise<PersonalRecord[]> {
    return Promise.resolve([...mockPersonalRecords]);
  },

  async getBodyMeasurements(): Promise<BodyMeasurement[]> {
    return Promise.resolve([...mockBodyMeasurements]);
  },

  async getProgressPhotos(): Promise<ProgressPhoto[]> {
    return Promise.resolve([...mockProgressPhotos]);
  },

  async getGoals(): Promise<FitnessGoal[]> {
    return Promise.resolve([...mockGoals]);
  },

  async getAchievements(): Promise<Achievement[]> {
    return Promise.resolve([...mockAchievements]);
  },

  async getInsights(): Promise<FitnessInsight[]> {
    return Promise.resolve([...mockInsights]);
  },

  async addMeasurement(measurement: BodyMeasurement): Promise<BodyMeasurement[]> {
    mockBodyMeasurements.push(measurement);
    return Promise.resolve([...mockBodyMeasurements]);
  },

  async addGoal(goal: Omit<FitnessGoal, 'id' | 'progressPercent'>): Promise<FitnessGoal[]> {
    const progressPercent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
    const newGoal: FitnessGoal = {
      ...goal,
      id: `g_${Date.now()}`,
      progressPercent,
    };
    mockGoals.push(newGoal);
    return Promise.resolve([...mockGoals]);
  },
};
