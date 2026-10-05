import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Scale, Dumbbell, Calendar, Zap } from 'lucide-react';
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
} from 'recharts';
import { FilterTabs } from '../components/common/FilterTabs';
import { MetricCard } from '../components/common/MetricCard';

const timeframeOptions = ['7D', '30D', '3M', '6M', '1Y', 'All'];

const strengthData = [
  { date: 'Aug 1', Bench: 50, Squat: 85, Deadlift: 100 },
  { date: 'Aug 15', Bench: 52.5, Squat: 90, Deadlift: 105 },
  { date: 'Sep 1', Bench: 55, Squat: 92.5, Deadlift: 110 },
  { date: 'Sep 15', Bench: 57.5, Squat: 95, Deadlift: 115 },
  { date: 'Oct 1', Bench: 60, Squat: 100, Deadlift: 120 },
];

const volumeData = [
  { week: 'Wk 1', Volume: 14200 },
  { week: 'Wk 2', Volume: 15400 },
  { week: 'Wk 3', Volume: 16100 },
  { week: 'Wk 4', Volume: 17020 },
  { week: 'Wk 5', Volume: 18450 },
];

const frequencyData = [
  { week: 'Wk 1', Workouts: 5 },
  { week: 'Wk 2', Workouts: 6 },
  { week: 'Wk 3', Workouts: 5 },
  { week: 'Wk 4', Workouts: 6 },
  { week: 'Wk 5', Workouts: 5 },
];

const weightTrendData = [
  { date: 'Aug 1', Weight: 60.0 },
  { date: 'Aug 15', Weight: 60.5 },
  { date: 'Sep 1', Weight: 60.8 },
  { date: 'Sep 15', Weight: 61.0 },
  { date: 'Oct 1', Weight: 61.2 },
];

export const Progress: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30D');

  return (
    <div className="space-y-6 pb-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Progress & Analytics</h2>
          <p className="text-xs text-zinc-400">Deep dive into strength trends, volume accumulation & body composition</p>
        </div>

        <FilterTabs
          options={timeframeOptions}
          activeOption={timeframe}
          onSelect={setTimeframe}
        />
      </div>

      {/* Top 4 Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Strength Index"
          value="+12.5%"
          subtitle="Top lift 1RM growth"
          trend={{ value: 'Progressive Overload', isPositive: true }}
          icon={<TrendingUp className="w-5 h-5 text-brand-400" />}
        />
        <MetricCard
          title="Weekly Volume"
          value="18,450 kg"
          subtitle="Cumulative workload"
          trend={{ value: '+8.4% vs last week', isPositive: true }}
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
        />
        <MetricCard
          title="Body Weight"
          value="61.2 kg"
          subtitle="Lean mass gain trend"
          trend={{ value: '+0.7 kg this month', isPositive: true }}
          icon={<Scale className="w-5 h-5 text-sky-400" />}
        />
        <MetricCard
          title="Workout Frequency"
          value="5.4 / wk"
          subtitle="Average sessions"
          trend={{ value: '87% Consistency', isPositive: true }}
          icon={<Calendar className="w-5 h-5 text-amber-400" />}
        />
      </div>

      {/* Strength Progression Multi-Line Chart */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Compound Strength Growth (kg)</h3>
          <p className="text-xs text-zinc-400">Bench Press, Barbell Squat & Conventional Deadlift</p>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={strengthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
              <XAxis dataKey="date" stroke="#71717A" fontSize={12} tickLine={false} />
              <YAxis stroke="#71717A" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181B',
                  borderColor: '#3F3F46',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="Bench" stroke="#22c55e" strokeWidth={3} name="Bench Press" />
              <Line type="monotone" dataKey="Squat" stroke="#3b82f6" strokeWidth={3} name="Squat" />
              <Line type="monotone" dataKey="Deadlift" stroke="#a855f7" strokeWidth={3} name="Deadlift" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Volume & Weight Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Training Volume Area Chart */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Weekly Training Volume (kg)</h3>
            <p className="text-xs text-zinc-400">Total weight lifted per week</p>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="week" stroke="#71717A" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    borderColor: '#3F3F46',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="Volume" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#volColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Body Weight Progression Line Chart */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Body Weight Trajectory (kg)</h3>
            <p className="text-xs text-zinc-400">Lean weight gain consistency</p>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="date" stroke="#71717A" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181B',
                    borderColor: '#3F3F46',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="Weight" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5, fill: '#38bdf8' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
