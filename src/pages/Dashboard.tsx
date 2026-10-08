import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Play,
  TrendingUp,
  Scale,
  Apple,
  Dumbbell,
  Activity,
  Trophy,
  Eye,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { PRCard } from '../components/common/PRCard';
import { CircularProgress } from '../components/common/CircularProgress';
import { ProgressBar } from '../components/common/ProgressBar';
import { getTodayFormatted } from '../utils/formatters';
import { mockCompletedWorkouts, mockExercises, mockWorkoutPlans } from '../data/mockData';

// ─── Derived constants ────────────────────────────────────────────────────────

/** Build muscle-set distribution from the most recent completed workouts (last 7 days / 5 sessions) */
const buildMuscleSetsData = () => {
  const muscleMap: Record<string, number> = {
    Chest: 0, Back: 0, Shoulders: 0, Biceps: 0, Triceps: 0, Legs: 0, Abs: 0,
  };
  const muscleColors: Record<string, string> = {
    Chest: '#22c55e', Back: '#3b82f6', Shoulders: '#a855f7',
    Biceps: '#f59e0b', Triceps: '#ec4899', Legs: '#10b981', Abs: '#06b6d4',
  };

  // Map exercise names → muscle groups using the exercise library
  const exerciseToMuscle: Record<string, string> = {};
  mockExercises.forEach((ex) => {
    exerciseToMuscle[ex.name.toLowerCase()] = ex.muscleGroup;
  });

  // Rough category → muscle mapping for exercises not in the library
  const categoryFallback: Record<string, string[]> = {
    Push: ['Chest', 'Shoulders', 'Triceps'],
    Pull: ['Back', 'Biceps'],
    Legs: ['Legs'],
  };

  mockCompletedWorkouts.forEach((session) => {
    session.exercises.forEach((ex) => {
      const muscle = exerciseToMuscle[ex.name.toLowerCase()];
      if (muscle && muscle in muscleMap) {
        muscleMap[muscle] += ex.sets;
      } else {
        // fallback by category
        const fallbacks = categoryFallback[session.category] || [];
        fallbacks.forEach((m) => {
          if (m in muscleMap) muscleMap[m] += Math.floor(ex.sets / fallbacks.length);
        });
      }
    });
  });

  return Object.entries(muscleMap).map(([name, sets]) => ({
    name,
    sets,
    color: muscleColors[name],
  }));
};

const muscleSetsData = buildMuscleSetsData();
const maxMuscleSets = Math.max(...muscleSetsData.map((d) => d.sets), 20);

/** Weekly volume from last 5 completed workouts */
const totalWeeklyVolumeKg = mockCompletedWorkouts
  .slice(0, 5)
  .reduce((sum, w) => sum + w.totalVolumeKg, 0);

// ─── Component ────────────────────────────────────────────────────────────────

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, nutrition, personalRecords, activeWorkout, setIsSessionCompareOpen } = useApp();
  const [chartMetric, setChartMetric] = useState<'Weight' | 'Volume' | '1RM' | 'Reps'>('Weight');

  // Build bench press history chart data from exercise library
  const benchExercise = mockExercises.find((ex) => ex.id === 'ex_bench');
  const benchHistoryData = benchExercise
    ? benchExercise.history.map((h, i) => ({
        week: `W${i + 1}`,
        Weight: h.weight,
        Volume: h.volume,
        '1RM': h.estimated1RM,
        Reps: h.reps,
      }))
    : [];

  const latestPR = personalRecords[0];

  // Today's featured workout — use the active workout's plan name
  const todayPlan = mockWorkoutPlans.find((p) => p.name === activeWorkout.name) || mockWorkoutPlans[0];

  // Consistency: derive from user fields
  const workoutGoalPercent = Math.round((user.weeklyWorkoutsCompleted / user.weeklyWorkoutsTarget) * 100);
  const proteinDaysHit = nutrition.weeklyProteinHistory.filter(
    (d) => d.proteinGrams >= nutrition.targetProteinGrams
  ).length;
  const consistencyScore = Math.round(
    (workoutGoalPercent * 0.5) +
    ((proteinDaysHit / 7) * 100 * 0.3) +
    (user.weeklyCompletion * 0.2)
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, {user.name} 👋
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            Let's keep your progress moving.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#18181B] border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 w-fit">
          <span>📅 {getTodayFormatted()}</span>
        </div>
      </div>

      {/* Hero Streak Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl p-5 sm:p-8 overflow-hidden bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/30 shadow-2xl"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-brand-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl shrink-0">
              <Flame className="w-8 h-8 sm:w-10 sm:h-10 fill-amber-400 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs uppercase font-extrabold text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  ACTIVE STREAK
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                {user.currentStreak} Day Streak 🔥
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5 sm:mt-1">
                Personal best streak: <span className="text-zinc-200 font-bold">{user.longestStreak} days</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-around md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800/80">
            <div className="text-center">
              <span className="text-xl sm:text-3xl font-black text-brand-400">{user.weeklyCompletion}%</span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 font-semibold uppercase block">Weekly Target</span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-zinc-800" />
            <div className="text-center">
              <span className="text-xl sm:text-3xl font-black text-white">
                {user.weeklyWorkoutsCompleted}/{user.weeklyWorkoutsTarget}
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 font-semibold uppercase block">Workouts Done</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Today's Workout Card — dynamic from active workout plan */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl p-5 sm:p-8 bg-[#18181B] border border-zinc-800 shadow-xl overflow-hidden group hover:border-zinc-700 transition-all"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-brand-500/10 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              TODAY'S FEATURED WORKOUT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 sm:mt-3">
              {todayPlan.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-semibold text-zinc-400 mt-2">
              <span className="flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5 text-brand-400" /> {todayPlan.exerciseCount} exercises
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-brand-400" /> {todayPlan.estimatedSets} sets
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">⏱️ {todayPlan.estimatedMinutes} min</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate('/workout/active')}
              className="flex-1 sm:flex-none px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" />
              Start Workout
            </button>
            <button
              onClick={() => navigate('/workout')}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs sm:text-sm transition-colors border border-zinc-700/60 text-center"
            >
              View Plan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Responsive Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Body Weight"
          value={`${user.currentWeightKg} kg`}
          trend={{ value: `Target: ${user.targetWeightKg} kg`, isPositive: user.currentWeightKg < user.targetWeightKg }}
          icon={<Scale className="w-5 h-5" />}
        />
        <MetricCard
          title="Protein Intake"
          value={`${nutrition.proteinGrams} / ${nutrition.targetProteinGrams} g`}
          subtitle="Daily goal"
          progressPercent={Math.round((nutrition.proteinGrams / nutrition.targetProteinGrams) * 100)}
          icon={<Apple className="w-5 h-5" />}
        />
        <MetricCard
          title="Workouts"
          value={`${user.weeklyWorkoutsCompleted} / ${user.weeklyWorkoutsTarget}`}
          subtitle="Completed this week"
          trend={{ value: 'On Track 🔥', isPositive: true }}
          icon={<Dumbbell className="w-5 h-5" />}
        />
        <MetricCard
          title="Weekly Volume"
          value={`${totalWeeklyVolumeKg.toLocaleString()} kg`}
          trend={{ value: '+8.4%', isPositive: true }}
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Strength Progress Chart & Muscle Volume Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strength Progress Large Chart */}
        <div className="lg:col-span-2 bg-[#18181B] border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Strength Progress</h3>
              <p className="text-xs text-zinc-400">
                {benchExercise ? `${benchExercise.history.length}-Week Progression — Bench Press` : 'Loading...'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-[#202023] p-1 rounded-xl border border-zinc-800 overflow-x-auto max-w-full no-scrollbar">
              {(['Weight', 'Volume', '1RM', 'Reps'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChartMetric(tab)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    chartMetric === tab
                      ? 'bg-brand-500 text-black shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={benchHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="week" stroke="#71717A" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    borderColor: '#3F3F46',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  }}
                  itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey={chartMetric}
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#18181B' }}
                  activeDot={{ r: 7, fill: '#a3e635', stroke: '#18181B', strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Muscle Group Analytics — derived from completed workouts */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">Muscle Group Sets</h3>
            <span className="text-xs font-semibold text-zinc-400">Weekly Total</span>
          </div>

          <div className="space-y-3 pt-2">
            {muscleSetsData.map((item) => (
              <ProgressBar
                key={item.name}
                label={item.name}
                value={item.sets}
                max={maxMuscleSets}
                sublabel={`${item.sets} sets`}
                size="sm"
                colorClass="from-brand-500 to-brand-bright"
              />
            ))}
          </div>
        </div>
      </div>

      {/* PR Card & Consistency Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Personal Record */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> Personal Best Spotlight
            </h3>
            <button
              onClick={() => setIsSessionCompareOpen(true)}
              className="text-xs font-bold text-brand-400 hover:underline flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> Compare Session
            </button>
          </div>
          {latestPR && <PRCard pr={latestPR} isFeatured={true} />}
        </div>

        {/* Consistency Card — derived from user context */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">Weekly Consistency</h3>
            <p className="text-xs text-zinc-400">Based on training, protein &amp; habit tracking</p>

            <div className="my-5 flex items-center justify-center">
              <CircularProgress
                percentage={consistencyScore}
                size={130}
                strokeWidth={10}
                color="#22c55e"
                centerText={`${consistencyScore}%`}
                centerSubtext="Score"
              />
            </div>

            <div className="space-y-2 text-xs font-medium border-t border-zinc-800 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Workout Goal</span>
                <span className="text-white font-bold">
                  {user.weeklyWorkoutsCompleted} / {user.weeklyWorkoutsTarget} days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Protein Target</span>
                <span className="text-white font-bold">{proteinDaysHit} / 7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Calories Logged</span>
                <span className="text-white font-bold">
                  {nutrition.calories} / {nutrition.targetCalories} kcal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Hydration</span>
                <span className="text-white font-bold">
                  {nutrition.waterLiters}L / {nutrition.targetWaterLiters}L
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 text-center text-xs font-bold text-brand-400">
            {consistencyScore >= 80
              ? '"You\'re building a strong habit." 🔥'
              : consistencyScore >= 60
              ? '"Stay consistent — you\'re improving!" 💪'
              : '"Every rep counts. Keep going!" 🎯'}
          </div>
        </div>
      </div>
    </div>
  );
};
