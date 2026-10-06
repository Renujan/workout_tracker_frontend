export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  currentStreak: number;
  longestStreak: number;
  weeklyCompletion: number; // percentage, e.g. 87
  weeklyWorkoutsTarget: number;
  weeklyWorkoutsCompleted: number;
  currentWeightKg: number;
  targetWeightKg: number;
  trainingSince: string;
  totalWorkouts: number;
  totalVolumeKg: number;
  totalSets: number;
  totalPRs: number;
}

export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Legs' | 'Abs' | 'Cardio';
export type EquipmentType = 'Barbell' | 'Dumbbell' | 'Machine' | 'Cable' | 'Bodyweight';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ExerciseHistoryPoint {
  date: string;
  weight: number;
  reps: number;
  volume: number;
  estimated1RM: number;
}

export interface ExerciseItem {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  imageUrl: string;
  description: string;
  personalBest: {
    weight: number;
    reps: number;
    date: string;
  };
  bestVolumeKg: number;
  estimated1RM: number;
  totalSessions: number;
  history: ExerciseHistoryPoint[];
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
  completed: boolean;
  isPR?: boolean;
  targetWeight?: number;
  targetReps?: string;
}

export interface ActiveExercise {
  exerciseId: string;
  name: string;
  muscleGroup: MuscleGroup;
  previousPerformance: string;
  targetInfo: string;
  sets: WorkoutSet[];
}

export interface ActiveWorkoutSession {
  id: string;
  name: string;
  startTime: number; // timestamp
  elapsedSeconds: number;
  exercises: ActiveExercise[];
  isCompleted: boolean;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  category: 'Push' | 'Pull' | 'Legs' | 'Upper' | 'Lower' | 'Full Body';
  exerciseCount: number;
  estimatedSets: number;
  estimatedMinutes: number;
  imageUrl: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    targetSets: number;
    targetReps: string;
    targetWeightKg: number;
  }[];
}

export interface CompletedWorkout {
  id: string;
  name: string;
  category: string;
  date: string; // ISO string or YYYY-MM-DD
  durationMinutes: number;
  totalVolumeKg: number;
  totalSets: number;
  exercises: {
    name: string;
    sets: number;
    maxWeightKg: number;
  }[];
}

export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  previousWeightKg: number;
  previousReps: number;
  improvementKg: number;
  date: string;
  category: 'strength' | 'rep' | 'volume';
  icon?: string;
}

export interface MealItem {
  id: string;
  category: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
  name: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  servingSize: string;
  imageUrl?: string;
}

export interface DailyNutrition {
  date: string;
  calories: number;
  targetCalories: number;
  proteinGrams: number;
  targetProteinGrams: number;
  carbsGrams: number;
  targetCarbsGrams: number;
  fatGrams: number;
  targetFatGrams: number;
  waterLiters: number;
  targetWaterLiters: number;
  meals: MealItem[];
  weeklyProteinHistory: { day: string; proteinGrams: number }[];
}

export interface BodyMeasurement {
  date: string;
  weightKg: number;
  bodyFatPercent: number;
  chestCm: number;
  armsCm: number;
  waistCm: number;
  thighsCm: number;
}

export interface ProgressPhoto {
  id: string;
  date: string;
  category: 'Front' | 'Side' | 'Back';
  imageUrl: string;
  weightKg: number;
}

export interface FitnessGoal {
  id: string;
  title: string;
  category: 'exercise' | 'weight' | 'nutrition' | 'workout';
  targetValue: number;
  currentValue: number;
  unit: string;
  progressPercent: number;
  deadline?: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  iconName: string;
  imageUrl?: string;
}

export interface FitnessInsight {
  id: string;
  type: 'strength' | 'nutrition' | 'training' | 'volume';
  title: string;
  summary: string;
  detail: string;
  tag: string;
  date: string;
}
