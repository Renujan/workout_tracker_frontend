import { ExerciseItem, ExerciseHistoryPoint, MuscleGroup, EquipmentType, DifficultyLevel } from '../types';
import { mockExercises } from '../data/mockData';
import { apiClient } from '../api/client';

interface BackendHistoryPoint {
  id: number;
  date: string;
  weight_kg: number;
  reps: number;
  volume_kg: number;
  estimated_1rm: number;
}

interface BackendExercise {
  id: number | string;
  name: string;
  muscle_group: string;
  equipment: string;
  difficulty: string;
  description: string;
  image_url: string;
  history?: BackendHistoryPoint[];
  created_at?: string;
}

const mapBackendToExerciseItem = (raw: BackendExercise): ExerciseItem => {
  const historyPoints: ExerciseHistoryPoint[] = (raw.history || []).map((h) => ({
    date: h.date,
    weight: Number(h.weight_kg),
    reps: Number(h.reps),
    volume: Number(h.volume_kg),
    estimated1RM: Number(h.estimated_1rm),
  }));

  const maxWeightFromHist = historyPoints.length > 0 ? Math.max(...historyPoints.map((h) => h.weight)) : 0;
  const maxVolumeFromHist = historyPoints.length > 0 ? Math.max(...historyPoints.map((h) => h.volume)) : 0;
  const max1RMFromHist = historyPoints.length > 0 ? Math.max(...historyPoints.map((h) => h.estimated1RM)) : 0;

  const matchingMock = mockExercises.find((m) => m.name.toLowerCase() === raw.name.toLowerCase());
  const resolvedImageUrl =
    raw.image_url && raw.image_url.trim().length > 0
      ? raw.image_url
      : matchingMock?.imageUrl ||
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600';

  return {
    id: String(raw.id),
    name: raw.name,
    muscleGroup: (raw.muscle_group as MuscleGroup) || matchingMock?.muscleGroup || 'Chest',
    equipment: (raw.equipment as EquipmentType) || matchingMock?.equipment || 'Barbell',
    difficulty: (raw.difficulty as DifficultyLevel) || matchingMock?.difficulty || 'Intermediate',
    imageUrl: resolvedImageUrl,
    description: raw.description || matchingMock?.description || '',
    personalBest: {
      weight: maxWeightFromHist || matchingMock?.personalBest.weight || 0,
      reps: historyPoints[0]?.reps || matchingMock?.personalBest.reps || 0,
      date: historyPoints[0]?.date || matchingMock?.personalBest.date || 'Recent',
    },
    bestVolumeKg: maxVolumeFromHist || matchingMock?.bestVolumeKg || 0,
    estimated1RM: max1RMFromHist || matchingMock?.estimated1RM || 0,
    totalSessions: historyPoints.length || matchingMock?.totalSessions || 0,
    history: historyPoints.length > 0 ? historyPoints : (matchingMock?.history || []),
  };
};

export const exerciseService = {
  async getExercises(filters?: {
    muscle?: string;
    equipment?: string;
    difficulty?: string;
    search?: string;
  }): Promise<ExerciseItem[]> {
    try {
      const params: Record<string, string> = {};
      if (filters?.muscle && filters.muscle !== 'All') params.muscle_group = filters.muscle;
      if (filters?.equipment && filters.equipment !== 'All') params.equipment = filters.equipment;
      if (filters?.difficulty && filters.difficulty !== 'All') params.difficulty = filters.difficulty;
      if (filters?.search) params.search = filters.search;

      const { data } = await apiClient.get<BackendExercise[] | { results: BackendExercise[] }>('/exercises/', {
        params,
      });

      const list = Array.isArray(data) ? data : data.results || [];
      if (list.length > 0) {
        return list.map((item) => mapBackendToExerciseItem(item));
      }
      return [...mockExercises];
    } catch (err) {
      console.warn('[exerciseService] Falling back to mockExercises:', err);
      return [...mockExercises];
    }
  },

  async getExerciseById(id: string): Promise<ExerciseItem | undefined> {
    return mockExercises.find((ex) => ex.id === id);
  },

  async getCategories(): Promise<{
    muscle_groups: string[];
    equipment: string[];
    difficulty: string[];
  }> {
    try {
      const { data } = await apiClient.get('/exercises/categories/');
      return data;
    } catch {
      return {
        muscle_groups: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs'],
        equipment: ['Barbell', 'Dumbbell', 'Machine', 'Cable', 'Bodyweight'],
        difficulty: ['Beginner', 'Intermediate', 'Advanced'],
      };
    }
  },

  async searchExercises(query: string, muscle?: string, equipment?: string): Promise<ExerciseItem[]> {
    return this.getExercises({
      search: query,
      muscle: muscle !== 'All' ? muscle : undefined,
      equipment: equipment !== 'All' ? equipment : undefined,
    });
  },
};
