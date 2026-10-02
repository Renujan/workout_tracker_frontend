import { WorkoutPlan, CompletedWorkout, ActiveWorkoutSession } from '../types';
import { mockWorkoutPlans, mockCompletedWorkouts, mockInitialActiveWorkout } from '../data/mockData';

let activeWorkoutState: ActiveWorkoutSession = { ...mockInitialActiveWorkout };

export const workoutService = {
  async getWorkoutPlans(): Promise<WorkoutPlan[]> {
    return Promise.resolve([...mockWorkoutPlans]);
  },

  async getCompletedWorkouts(): Promise<CompletedWorkout[]> {
    return Promise.resolve([...mockCompletedWorkouts]);
  },

  async getActiveWorkout(): Promise<ActiveWorkoutSession> {
    return Promise.resolve(activeWorkoutState);
  },

  async updateActiveWorkout(session: ActiveWorkoutSession): Promise<ActiveWorkoutSession> {
    activeWorkoutState = { ...session };
    return Promise.resolve(activeWorkoutState);
  },

  async completeWorkout(session: ActiveWorkoutSession): Promise<CompletedWorkout> {
    const totalVolume = session.exercises.reduce((acc, ex) => {
      return acc + ex.sets.reduce((sAcc, set) => set.completed ? sAcc + (set.weight * set.reps) : sAcc, 0);
    }, 0);

    const totalSets = session.exercises.reduce((acc, ex) => {
      return acc + ex.sets.filter(s => s.completed).length;
    }, 0);

    const newCompleted: CompletedWorkout = {
      id: `w_${Date.now()}`,
      name: session.name,
      category: 'Push',
      date: new Date().toISOString().split('T')[0],
      durationMinutes: Math.round(session.elapsedSeconds / 60),
      totalVolumeKg: totalVolume,
      totalSets: totalSets,
      exercises: session.exercises.map(e => ({
        name: e.name,
        sets: e.sets.filter(s => s.completed).length,
        maxWeightKg: Math.max(...e.sets.map(s => s.weight), 0),
      }))
    };

    mockCompletedWorkouts.unshift(newCompleted);
    activeWorkoutState.isCompleted = true;
    return Promise.resolve(newCompleted);
  }
};
