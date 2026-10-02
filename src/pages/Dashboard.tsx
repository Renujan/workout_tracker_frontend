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
  CheckCircle,
  Eye,
  Zap,
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

const muscleSetsData = [
  { name: 'Chest', sets: 14, color: '#22c55e' },
  { name: 'Back', sets: 16, color: '#3b82f6' },
  { name: 'Shoulders', sets: 12, color: '#a855f7' },
  { name: 'Biceps', sets: 10, color: '#f59e0b' },
  { name: 'Triceps', sets: 9, color: '#ec4899' },
  { name: 'Legs', sets: 16, color: '#10b981' },
  { name: 'Abs', sets: 8, color: '#06b6d4' },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, nutrition, personalRecords, setIsSessionCompareOpen } = useApp();
  const [chartMetric, setChartMetric] = useState<'Weight' | 'Volume' | '1RM' | 'Reps'>('Weight');

  const benchHistoryData = [
    { week: 'W1', Weight: 50.0, Volume: 400, '1RM': 62, Reps: 8 },
    { week: 'W2', Weight: 52.5, Volume: 420, '1RM': 65, Reps: 8 },
    { week: 'W3', Weight: 52.5, Volume: 420, '1RM': 65, Reps: 8 },
    { week: 'W4', Weight: 55.0, Volume: 440, '1RM': 68, Reps: 8 },
    { week: 'W5', Weight: 55.0, Volume: 440, '1RM': 68, Reps: 8 },
    { week: 'W6', Weight: 57.5, Volume: 460, '1RM': 72, Reps: 8 },
    { week: 'W7', Weight: 60.0, Volume: 480, '1RM': 76, Reps: 8 },
    { week: 'W8', Weight: 60.0, Volume: 480, '1RM': 76, Reps: 8 },
  ];

  const latestPR = personalRecords[0];

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, {user.name} 👋
          </h2>
          <p className="text-sm text-zinc-400 font-medium">
            Let's keep your progress moving.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#18181B] border border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 w-fit">
          <span>📅 {getTodayFormatted()}</span>
        </div>
      </div>

      {/* Hero Streak Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/30 shadow-2xl"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-brand-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl shrink-0">
              <Flame className="w-10 h-10 fill-amber-400 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  ACTIVE STREAK
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                {user.currentStreak} Day Streak 🔥
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Personal best streak: <span className="text-zinc-200 font-bold">{user.longestStreak} days</span> • Keep the momentum!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800/80">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-brand-400">{user.weeklyCompletion}%</span>
              <span className="text-[11px] text-zinc-400 font-semibold uppercase block">Weekly Target</span>
            </div>
            <div className="w-px h-10 bg-zinc-800" />
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-white">{user.weeklyWorkoutsCompleted}/6</span>
              <span className="text-[11px] text-zinc-400 font-semibold uppercase block">Workouts Done</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Today's Workout Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-zinc-800 shadow-xl overflow-hidden group hover:border-zinc-700 transition-all"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-brand-500/10 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              TODAY'S FEATURED WORKOUT
            </span>
            <h3 className="text-3xl font-black text-white tracking-tight mt-3">Push Day</h3>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-400 mt-2">
              <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4 text-brand-400" /> 5 exercises</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-brand-400" /> 18 working sets</span>
              <span>•</span>
              <span className="flex items-center gap-1">⏱️ Estimated 58 min</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/workout/active')}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-sm shadow-xl shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" />
              Start Workout
            </button>
            <button
              onClick={() => navigate('/workout')}
              className="px-4 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-sm transition-colors border border-zinc-700/60"
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
          value="61.2 kg"
          trend={{ value: '+0.7 kg this month', isPositive: true }}
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
          value="18,450 kg"
          trend={{ value: '+8.4%', isPositive: true }}
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Strength Progress Chart & Muscle Volume Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strength Progress Large Chart */}
        <div className="lg:col-span-2 bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Strength Progress</h3>
              <p className="text-xs text-zinc-400">8-Week Progression — Bench Press</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-[#202023] p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
              {(['Weight', 'Volume', '1RM', 'Reps'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChartMetric(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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

        {/* Muscle Group Analytics */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">Muscle Group Sets</h3>
            <span className="text-xs font-semibold text-zinc-400">Weekly Target</span>
          </div>

          <div className="space-y-3 pt-2">
            {muscleSetsData.map((item) => (
              <ProgressBar
                key={item.name}
                label={item.name}
                value={item.sets}
                max={20}
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

        {/* Consistency Card */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">Weekly Consistency</h3>
            <p className="text-xs text-zinc-400">Based on training, protein & habit tracking</p>

            <div className="my-5 flex items-center justify-center">
              <CircularProgress
                percentage={87}
                size={130}
                strokeWidth={10}
                color="#22c55e"
                centerText="87%"
                centerSubtext="Score"
              />
            </div>

            <div className="space-y-2 text-xs font-medium border-t border-zinc-800 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Workout Goal</span>
                <span className="text-white font-bold">6 / 6 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Protein Target</span>
                <span className="text-white font-bold">5 / 7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Hydration Target</span>
                <span className="text-white font-bold">6 / 7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Weight Logging</span>
                <span className="text-white font-bold">4 / 7 days</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 text-center text-xs font-bold text-brand-400">
            "You're building a strong habit." 🔥
          </div>
        </div>
      </div>
    </div>
  );
};
