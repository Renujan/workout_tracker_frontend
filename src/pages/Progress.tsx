import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Scale, Calendar } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { FilterTabs } from '../components/common/FilterTabs';
import { MetricCard } from '../components/common/MetricCard';
import { useApp } from '../context/AppContext';
import { mockExercises, mockCompletedWorkouts, mockBodyMeasurements } from '../data/mockData';

const timeframeOptions = ['7D', '30D', '3M', '6M', '1Y', 'All'];

// ─── Helper: filter datasets by timeframe ─────────────────────────────────────

const TIMEFRAME_DAYS: Record<string, number> = {
  '7D': 7, '30D': 30, '3M': 90, '6M': 180, '1Y': 365, 'All': Infinity,
};

const parseDate = (dateStr: string): Date => {
  // Handles 'Sep 1', 'Week 1', 'Aug 15' etc.
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) return parsed;
  return new Date(); // fallback
};

const filterByTimeframe = <T extends { date: string }>(
  data: T[],
  timeframe: string
): T[] => {
  const days = TIMEFRAME_DAYS[timeframe] ?? Infinity;
  if (days === Infinity) return data;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return data.filter((d) => parseDate(d.date) >= cutoff);
};

// ─── Build chart datasets from real data ─────────────────────────────────────

const buildStrengthData = () => {
  const bench = mockExercises.find((e) => e.id === 'ex_bench');
  const squat = mockExercises.find((e) => e.id === 'ex_squat');
  const deadlift = mockExercises.find((e) => e.id === 'ex_deadlift');

  const maxLen = Math.max(
    bench?.history.length ?? 0,
    squat?.history.length ?? 0,
    deadlift?.history.length ?? 0
  );

  return Array.from({ length: maxLen }, (_, i) => ({
    date: bench?.history[i]?.date ?? squat?.history[i]?.date ?? `Wk ${i + 1}`,
    Bench: bench?.history[i]?.weight ?? null,
    Squat: squat?.history[i]?.weight ?? null,
    Deadlift: deadlift?.history[i]?.weight ?? null,
  }));
};

const buildVolumeData = () =>
  mockCompletedWorkouts
    .slice()
    .reverse()
    .map((w, i) => ({
      week: `Wk ${i + 1}`,
      date: w.date,
      Volume: w.totalVolumeKg,
    }));

const buildFrequencyData = () => {
  // Group completed workouts by week (simplified: one entry per session)
  return mockCompletedWorkouts
    .slice()
    .reverse()
    .map((w, i) => ({
      week: `Wk ${i + 1}`,
      date: w.date,
      Workouts: 1,
      Duration: w.durationMinutes,
    }));
};

const buildWeightData = () =>
  mockBodyMeasurements.map((m) => ({
    date: m.date,
    Weight: m.weightKg,
    BodyFat: m.bodyFatPercent,
  }));

// ─── Precomputed raw datasets ─────────────────────────────────────────────────

const rawStrengthData = buildStrengthData();
const rawVolumeData = buildVolumeData();
const rawWeightData = buildWeightData();

// ─── Component ────────────────────────────────────────────────────────────────

export const Progress: React.FC = () => {
  const { user, bodyMeasurements } = useApp();
  const [timeframe, setTimeframe] = useState('30D');

  // Filter weight data by timeframe (has real dates)
  const filteredWeightData = useMemo(() => {
    const days = TIMEFRAME_DAYS[timeframe] ?? Infinity;
    if (days === Infinity) return rawWeightData;
    // Use context bodyMeasurements for real-time updates
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    // Since dates are strings like "Sep 1", fall back to last N entries
    const count = Math.min(Math.ceil(days / 7), bodyMeasurements.length);
    return rawWeightData.slice(-count);
  }, [timeframe, bodyMeasurements]);

  // Filter volume data
  const filteredVolumeData = useMemo(() => {
    const days = TIMEFRAME_DAYS[timeframe] ?? Infinity;
    const count = days === Infinity ? rawVolumeData.length : Math.min(Math.ceil(days / 7), rawVolumeData.length);
    return rawVolumeData.slice(-count);
  }, [timeframe]);

  // Filter strength data
  const filteredStrengthData = useMemo(() => {
    const days = TIMEFRAME_DAYS[timeframe] ?? Infinity;
    const count = days === Infinity ? rawStrengthData.length : Math.min(Math.ceil(days / 7), rawStrengthData.length);
    return rawStrengthData.slice(-count);
  }, [timeframe]);

  // Compute metric card values dynamically
  const latestWeight = bodyMeasurements[bodyMeasurements.length - 1]?.weightKg ?? user.currentWeightKg;
  const firstWeight = bodyMeasurements[0]?.weightKg ?? latestWeight;
  const weightChange = +(latestWeight - firstWeight).toFixed(1);

  const latestVolume = filteredVolumeData[filteredVolumeData.length - 1]?.Volume ?? 0;
  const prevVolume = filteredVolumeData[filteredVolumeData.length - 2]?.Volume ?? latestVolume;
  const volumeChangePct = prevVolume > 0 ? +(((latestVolume - prevVolume) / prevVolume) * 100).toFixed(1) : 0;

  const benchMax = mockExercises.find((e) => e.id === 'ex_bench');
  const benchFirst = benchMax?.history[0]?.weight ?? 0;
  const benchLast = benchMax?.history[benchMax.history.length - 1]?.weight ?? 0;
  const strengthGrowthPct = benchFirst > 0 ? +(((benchLast - benchFirst) / benchFirst) * 100).toFixed(1) : 0;

  const avgWorkoutsPerWeek = (mockCompletedWorkouts.length / Math.max(filteredVolumeData.length, 1)).toFixed(1);

  const tooltipStyle = {
    backgroundColor: '#18181B',
    borderColor: '#3F3F46',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Progress &amp; Analytics</h2>
          <p className="text-xs text-zinc-400">Deep dive into strength trends, volume accumulation &amp; body composition</p>
        </div>

        <FilterTabs
          options={timeframeOptions}
          activeOption={timeframe}
          onSelect={setTimeframe}
        />
      </div>

      {/* Top 4 Key Metrics — all derived from real data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Strength Index"
          value={`+${strengthGrowthPct}%`}
          subtitle="Bench press 1RM growth"
          trend={{ value: 'Progressive Overload', isPositive: strengthGrowthPct >= 0 }}
          icon={<TrendingUp className="w-5 h-5 text-brand-400" />}
        />
        <MetricCard
          title="Weekly Volume"
          value={`${latestVolume.toLocaleString()} kg`}
          subtitle="Cumulative workload"
          trend={{
            value: `${volumeChangePct >= 0 ? '+' : ''}${volumeChangePct}% vs last wk`,
            isPositive: volumeChangePct >= 0,
          }}
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
        />
        <MetricCard
          title="Body Weight"
          value={`${latestWeight} kg`}
          subtitle="Latest logged measurement"
          trend={{
            value: `${weightChange >= 0 ? '+' : ''}${weightChange} kg overall`,
            isPositive: weightChange >= 0,
          }}
          icon={<Scale className="w-5 h-5 text-sky-400" />}
        />
        <MetricCard
          title="Workout Frequency"
          value={`${avgWorkoutsPerWeek} / wk`}
          subtitle="Average sessions"
          trend={{ value: `${user.weeklyCompletion}% Consistency`, isPositive: user.weeklyCompletion >= 70 }}
          icon={<Calendar className="w-5 h-5 text-amber-400" />}
        />
      </div>

      {/* Strength Progression Multi-Line Chart */}
      <motion.div
        key={`strength-${timeframe}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4"
      >
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Compound Strength Growth (kg)</h3>
          <p className="text-xs text-zinc-400">
            Bench Press, Barbell Squat &amp; Conventional Deadlift — {timeframe} view
          </p>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredStrengthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
              <XAxis dataKey="date" stroke="#71717A" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717A" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
              <Line type="monotone" dataKey="Bench" stroke="#22c55e" strokeWidth={3} name="Bench Press" dot={false} connectNulls />
              <Line type="monotone" dataKey="Squat" stroke="#3b82f6" strokeWidth={3} name="Squat" dot={false} connectNulls />
              <Line type="monotone" dataKey="Deadlift" stroke="#a855f7" strokeWidth={3} name="Deadlift" dot={false} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Grid: Volume & Weight Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Training Volume Area Chart */}
        <motion.div
          key={`volume-${timeframe}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4"
        >
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Weekly Training Volume (kg)</h3>
            <p className="text-xs text-zinc-400">Total weight lifted per session — {timeframe} view</p>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="week" stroke="#71717A" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="Volume" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#volColor)" name="Volume (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Body Weight Progression Line Chart */}
        <motion.div
          key={`weight-${timeframe}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4"
        >
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Body Weight Trajectory (kg)</h3>
            <p className="text-xs text-zinc-400">Lean weight gain consistency — {timeframe} view</p>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredWeightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="date" stroke="#71717A" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="Weight" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} name="Weight (kg)" />
                <Line type="monotone" dataKey="BodyFat" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 2" dot={false} name="Body Fat %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Workout Frequency Bar Chart */}
      <motion.div
        key={`freq-${timeframe}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4"
      >
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Session Duration History (min)</h3>
          <p className="text-xs text-zinc-400">Time spent per gym session — {timeframe} view</p>
        </div>

        <div className="h-52 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={buildFrequencyData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
              <XAxis dataKey="week" stroke="#71717A" fontSize={12} tickLine={false} />
              <YAxis stroke="#71717A" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="Duration" fill="#22c55e" radius={[6, 6, 0, 0]} name="Duration (min)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
