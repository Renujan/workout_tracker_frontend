import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  ActiveWorkoutSession,
  DailyNutrition,
  PersonalRecord,
  BodyMeasurement,
  FitnessGoal,
} from '../types';
import {
  mockUserProfile,
  mockInitialActiveWorkout,
  mockDailyNutrition,
  mockPersonalRecords,
  mockBodyMeasurements,
  mockGoals,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'pr' | 'info' | 'warning';
}

interface AppContextType {
  user: UserProfile;
  activeWorkout: ActiveWorkoutSession;
  nutrition: DailyNutrition;
  personalRecords: PersonalRecord[];
  bodyMeasurements: BodyMeasurement[];
  goals: FitnessGoal[];
  weightUnit: 'kg' | 'lb';
  distanceUnit: 'km' | 'miles';

  // Rest Timer state
  restTimer: {
    isActive: boolean;
    secondsLeft: number;
    totalSeconds: number;
  };
  startRestTimer: (seconds?: number) => void;
  adjustRestTimer: (seconds: number) => void;
  stopRestTimer: () => void;

  // Actions
  updateSet: (exerciseIndex: number, setIndex: number, weight: number, reps: number) => void;
  toggleSetCompleted: (exerciseIndex: number, setIndex: number) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  removeSetFromExercise: (exerciseIndex: number, setIndex: number) => void;
  completeCurrentWorkout: () => void;
  logFoodItem: (meal: { category: any; name: string; calories: number; proteinGrams: number; carbsGrams: number; fatGrams: number; servingSize: string }) => void;
  logWeightMeasurement: (weightKg: number, bodyFatPercent?: number) => void;
  addGoalItem: (goal: Omit<FitnessGoal, 'id' | 'progressPercent'>) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'pr' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Settings
  setWeightUnit: (unit: 'kg' | 'lb') => void;

  // Quick Action Modal states
  isQuickActionOpen: boolean;
  setIsQuickActionOpen: (open: boolean) => void;
  isLogFoodModalOpen: boolean;
  setIsLogFoodModalOpen: (open: boolean) => void;
  isLogWeightModalOpen: boolean;
  setIsLogWeightModalOpen: (open: boolean) => void;
  isAddGoalModalOpen: boolean;
  setIsAddGoalModalOpen: (open: boolean) => void;
  isSessionCompareOpen: boolean;
  setIsSessionCompareOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutSession>(mockInitialActiveWorkout);
  const [nutrition, setNutrition] = useState<DailyNutrition>(mockDailyNutrition);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(mockPersonalRecords);
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>(mockBodyMeasurements);
  const [goals, setGoals] = useState<FitnessGoal[]>(mockGoals);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'miles'>('km');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'pr' | 'info' | 'warning' = 'success') => {
    const id = `t_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Rest Timer
  const [restTimer, setRestTimer] = useState({
    isActive: false,
    secondsLeft: 90,
    totalSeconds: 90,
  });

  useEffect(() => {
    let interval: any = null;
    if (restTimer.isActive && restTimer.secondsLeft > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => ({
          ...prev,
          secondsLeft: prev.secondsLeft - 1,
        }));
      }, 1000);
    } else if (restTimer.isActive && restTimer.secondsLeft <= 0) {
      setRestTimer((prev) => ({ ...prev, isActive: false }));
      addToast('Rest Timer Complete! ⏱️', 'Time to hit your next set!', 'info');
    }
    return () => clearInterval(interval);
  }, [restTimer.isActive, restTimer.secondsLeft]);

  const startRestTimer = (seconds: number = 90) => {
    setRestTimer({
      isActive: true,
      secondsLeft: seconds,
      totalSeconds: seconds,
    });
  };

  const adjustRestTimer = (seconds: number) => {
    setRestTimer((prev) => {
      const newSec = Math.max(0, prev.secondsLeft + seconds);
      return {
        ...prev,
        secondsLeft: newSec,
        totalSeconds: Math.max(prev.totalSeconds, newSec),
      };
    });
  };

  const stopRestTimer = () => {
    setRestTimer((prev) => ({ ...prev, isActive: false }));
  };

  // Active workout timer ticking
  useEffect(() => {
    const timer = setInterval(() => {
      if (!activeWorkout.isCompleted) {
        setActiveWorkout((prev) => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeWorkout.isCompleted]);

  // Workout Set Handlers
  const updateSet = (exerciseIndex: number, setIndex: number, weight: number, reps: number) => {
    setActiveWorkout((prev) => {
      const updatedExercises = [...prev.exercises];
      const targetEx = { ...updatedExercises[exerciseIndex] };
      const updatedSets = [...targetEx.sets];
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        weight,
        reps,
      };
      targetEx.sets = updatedSets;
      updatedExercises[exerciseIndex] = targetEx;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const toggleSetCompleted = (exerciseIndex: number, setIndex: number) => {
    setActiveWorkout((prev) => {
      const updatedExercises = [...prev.exercises];
      const targetEx = { ...updatedExercises[exerciseIndex] };
      const updatedSets = [...targetEx.sets];
      const setItem = updatedSets[setIndex];
      const newStatus = !setItem.completed;
      
      updatedSets[setIndex] = {
        ...setItem,
        completed: newStatus,
      };

      // Check if PR reached (e.g. bench press > 57.5kg at 8 reps)
      if (newStatus && targetEx.name === 'Bench Press' && setItem.weight >= 60 && setItem.reps >= 8) {
        updatedSets[setIndex].isPR = true;
        addToast('NEW PERSONAL RECORD! 🏆', `${targetEx.name}: ${setItem.weight} kg × ${setItem.reps} reps (+2.5 kg)`, 'pr');
      } else if (newStatus) {
        addToast('Set completed ✓', `${targetEx.name} — Set ${setIndex + 1} logged`, 'success');
        startRestTimer(90);
      }

      targetEx.sets = updatedSets;
      updatedExercises[exerciseIndex] = targetEx;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const addSetToExercise = (exerciseIndex: number) => {
    setActiveWorkout((prev) => {
      const updatedExercises = [...prev.exercises];
      const targetEx = { ...updatedExercises[exerciseIndex] };
      const lastSet = targetEx.sets[targetEx.sets.length - 1] || { weight: 60, reps: 8 };
      const newSet = {
        id: `s_${Date.now()}`,
        setNumber: targetEx.sets.length + 1,
        weight: lastSet.weight,
        reps: lastSet.reps,
        completed: false,
      };
      targetEx.sets = [...targetEx.sets, newSet];
      updatedExercises[exerciseIndex] = targetEx;
      return { ...prev, exercises: updatedExercises };
    });
    addToast('Set added', 'New working set added to session', 'info');
  };

  const removeSetFromExercise = (exerciseIndex: number, setIndex: number) => {
    setActiveWorkout((prev) => {
      const updatedExercises = [...prev.exercises];
      const targetEx = { ...updatedExercises[exerciseIndex] };
      if (targetEx.sets.length <= 1) return prev;
      targetEx.sets = targetEx.sets.filter((_, idx) => idx !== setIndex).map((s, i) => ({ ...s, setNumber: i + 1 }));
      updatedExercises[exerciseIndex] = targetEx;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const completeCurrentWorkout = () => {
    setActiveWorkout((prev) => ({ ...prev, isCompleted: true }));
    addToast('Workout Completed! 🎉', 'Push Day session saved to workout history', 'success');
  };

  // Nutrition handlers
  const logFoodItem = (meal: { category: any; name: string; calories: number; proteinGrams: number; carbsGrams: number; fatGrams: number; servingSize: string }) => {
    const newMeal = {
      id: `m_${Date.now()}`,
      ...meal,
    };
    setNutrition((prev) => {
      const newProt = prev.proteinGrams + meal.proteinGrams;
      const newCal = prev.calories + meal.calories;
      if (prev.proteinGrams < prev.targetProteinGrams && newProt >= prev.targetProteinGrams) {
        addToast('Protein target reached 🎯', `Awesome! You reached ${newProt}g protein!`, 'pr');
      } else {
        addToast('Food logged ✓', `${meal.name} (+${meal.proteinGrams}g protein)`, 'success');
      }
      return {
        ...prev,
        calories: newCal,
        proteinGrams: newProt,
        carbsGrams: prev.carbsGrams + meal.carbsGrams,
        fatGrams: prev.fatGrams + meal.fatGrams,
        meals: [...prev.meals, newMeal],
      };
    });
  };

  // Weight logging
  const logWeightMeasurement = (weightKg: number, bodyFatPercent?: number) => {
    setUser((prev) => ({ ...prev, currentWeightKg: weightKg }));
    setBodyMeasurements((prev) => [
      ...prev,
      {
        date: 'Today',
        weightKg,
        bodyFatPercent: bodyFatPercent || 14.5,
        chestCm: 98,
        armsCm: 36.5,
        waistCm: 76.0,
        thighsCm: 56.0,
      },
    ]);
    addToast('Body Weight Logged ✓', `New weight recorded: ${weightKg} kg`, 'success');
  };

  // Goals
  const addGoalItem = (goal: Omit<FitnessGoal, 'id' | 'progressPercent'>) => {
    const progressPercent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
    setGoals((prev) => [
      ...prev,
      {
        ...goal,
        id: `g_${Date.now()}`,
        progressPercent,
      },
    ]);
    addToast('Goal Created 🎯', `New goal set for ${goal.title}`, 'success');
  };

  // Modal states
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isLogFoodModalOpen, setIsLogFoodModalOpen] = useState(false);
  const [isLogWeightModalOpen, setIsLogWeightModalOpen] = useState(false);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isSessionCompareOpen, setIsSessionCompareOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        activeWorkout,
        nutrition,
        personalRecords,
        bodyMeasurements,
        goals,
        weightUnit,
        distanceUnit,
        restTimer,
        startRestTimer,
        adjustRestTimer,
        stopRestTimer,
        updateSet,
        toggleSetCompleted,
        addSetToExercise,
        removeSetFromExercise,
        completeCurrentWorkout,
        logFoodItem,
        logWeightMeasurement,
        addGoalItem,
        toasts,
        addToast,
        removeToast,
        setWeightUnit,
        isQuickActionOpen,
        setIsQuickActionOpen,
        isLogFoodModalOpen,
        setIsLogFoodModalOpen,
        isLogWeightModalOpen,
        setIsLogWeightModalOpen,
        isAddGoalModalOpen,
        setIsAddGoalModalOpen,
        isSessionCompareOpen,
        setIsSessionCompareOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
