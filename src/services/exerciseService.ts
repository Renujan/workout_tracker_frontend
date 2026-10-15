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

interface BackendExercisePR {
  exercise_id: number;
  exercise_name: string;
  all_time_max_weight_kg: number;
  max_weight_reps: number;
  max_weight_date: string;
  all_time_max_volume_kg: number;
  best_estimated_1rm: number;
  total_logged_sessions: number;
}

const mapBackendToExerciseItem = (
  raw: BackendExercise,
  prData?: Partial<BackendExercisePR>
): ExerciseItem => {
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
      weight: prData?.all_time_max_weight_kg ?? (maxWeightFromHist || matchingMock?.personalBest.weight || 0),
      reps: prData?.max_weight_reps ?? (historyPoints[0]?.reps || matchingMock?.personalBest.reps || 0),
      date: prData?.max_weight_date ?? (historyPoints[0]?.date || matchingMock?.personalBest.date || 'Recent'),
    },
    bestVolumeKg: prData?.all_time_max_volume_kg ?? (maxVolumeFromHist || matchingMock?.bestVolumeKg || 0),
    estimated1RM: prData?.best_estimated_1rm ?? (max1RMFromHist || matchingMock?.estimated1RM || 0),
    totalSessions: prData?.total_logged_sessions ?? (historyPoints.length || matchingMock?.totalSessions || 0),
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
    try {
      const [exRes, prRes] = await Promise.allSettled([
        apiClient.get<BackendExercise>(`/exercises/${id}/`),
        apiClient.get<BackendExercisePR>(`/exercises/${id}/pr/`),
      ]);

      if (exRes.status === 'fulfilled') {
        const prData = prRes.status === 'fulfilled' ? prRes.value.data : undefined;
        return mapBackendToExerciseItem(exRes.value.data, prData);
      }
    } catch (err) {
      console.warn(`[exerciseService] Error loading exercise ${id}, fallback to mock:`, err);
    }

    return mockExercises.find((ex) => ex.id === id) || mockExercises[0];
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
