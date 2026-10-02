import { ExerciseItem } from '../types';
import { mockExercises } from '../data/mockData';

export const exerciseService = {
  async getExercises(): Promise<ExerciseItem[]> {
    return Promise.resolve([...mockExercises]);
  },

  async getExerciseById(id: string): Promise<ExerciseItem | undefined> {
    return Promise.resolve(mockExercises.find((ex) => ex.id === id));
  },

  async searchExercises(query: string, muscle?: string, equipment?: string): Promise<ExerciseItem[]> {
    let filtered = mockExercises;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((ex) => ex.name.toLowerCase().includes(q) || ex.muscleGroup.toLowerCase().includes(q));
    }
    if (muscle && muscle !== 'All') {
      filtered = filtered.filter((ex) => ex.muscleGroup === muscle);
    }
    if (equipment && equipment !== 'All') {
      filtered = filtered.filter((ex) => ex.equipment === equipment);
    }
    return Promise.resolve(filtered);
  },
};
