export interface MuscleAreaItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  targetMuscles: string[];
  description: string;
  primaryExercise: string;
  weeklySets: number;
  targetSets: number;
  recoveryStatus: 'Optimal' | 'Recovering' | 'Ready to Train';
}

export const mockMuscleAreas: MuscleAreaItem[] = [
  {
    id: 'area_chest',
    name: 'Chest Area',
    category: 'Push',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
    targetMuscles: ['Pectoralis Major', 'Pectoralis Minor', 'Anterior Deltoid'],
    description: 'Target upper, middle, and lower chest fibers with barbell pressing and incline dumbbell movements.',
    primaryExercise: 'Bench Press',
    weeklySets: 14,
    targetSets: 16,
    recoveryStatus: 'Optimal',
  },
  {
    id: 'area_back',
    name: 'Back Area',
    category: 'Pull',
    imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=800',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle/Lower Trapezius', 'Erector Spinae'],
    description: 'Build back thickness and V-taper width using heavy rows, pulldowns, and deadlifts.',
    primaryExercise: 'Barbell Row',
    weeklySets: 16,
    targetSets: 18,
    recoveryStatus: 'Ready to Train',
  },
  {
    id: 'area_shoulders',
    name: 'Shoulder Area',
    category: 'Push / Overhead',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
    targetMuscles: ['Lateral Deltoids', 'Anterior Deltoids', 'Posterior Deltoids'],
    description: 'Develop 3D rounded shoulders with overhead pressing and lateral raises.',
    primaryExercise: 'Overhead DB Press',
    weeklySets: 12,
    targetSets: 14,
    recoveryStatus: 'Optimal',
  },
  {
    id: 'area_biceps',
    name: 'Biceps & Forearms',
    category: 'Pull',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800',
    targetMuscles: ['Biceps Brachii', 'Brachialis', 'Brachioradialis'],
    description: 'Isolate arm flexors for bicep peak and forearm grip strength.',
    primaryExercise: 'Incline DB Curl',
    weeklySets: 10,
    targetSets: 12,
    recoveryStatus: 'Optimal',
  },
  {
    id: 'area_triceps',
    name: 'Triceps Area',
    category: 'Push',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    targetMuscles: ['Long Head', 'Lateral Head', 'Medial Head'],
    description: 'Build 2/3 of upper arm volume through heavy cable pushdowns and skull crushers.',
    primaryExercise: 'Triceps Pushdown',
    weeklySets: 9,
    targetSets: 12,
    recoveryStatus: 'Recovering',
  },
  {
    id: 'area_legs',
    name: 'Legs Area',
    category: 'Lower Body',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Gluteus Maximus', 'Gastrocnemius'],
    description: 'Master lower body compound power with deep back squats and leg pressing.',
    primaryExercise: 'Barbell Squat',
    weeklySets: 16,
    targetSets: 18,
    recoveryStatus: 'Ready to Train',
  },
  {
    id: 'area_abs',
    name: 'Abs & Core Area',
    category: 'Core Stability',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    targetMuscles: ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis'],
    description: 'Strengthen core stability, pelvic control, and sculpted abdominal definition.',
    primaryExercise: 'Hanging Leg Raises',
    weeklySets: 8,
    targetSets: 10,
    recoveryStatus: 'Optimal',
  },
];
