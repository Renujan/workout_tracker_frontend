import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Activity,
  Zap,
  Layers,
  Dumbbell,
  Play,
  Sparkles,
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
import { mockExercises } from '../data/mockData';
import { FilterTabs } from '../components/common/FilterTabs';
import { MetricCard } from '../components/common/MetricCard';
import { formatDate } from '../utils/formatters';

export const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Overview' | 'History' | 'Sets'>('Overview');
  const [chartMetric, setChartMetric] = useState<'weight' | 'volume' | 'estimated1RM'>('weight');

  const exercise = mockExercises.find((e) => e.id === id) || mockExercises[0];

  return (
    <div className="space-y-6 pb-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/exercises')}
          className="w-10 h-10 rounded-2xl bg-[#18181B] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
              {exercise.muscleGroup} • {exercise.equipment}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            {exercise.name}
          </h2>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden h-48 sm:h-64 border border-zinc-800 shadow-2xl">
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent p-4 sm:p-8 flex flex-col justify-end">
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed mb-3 sm:mb-4 font-normal line-clamp-2 sm:line-clamp-none">
            {exercise.description}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/workout/active')}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-xs shadow-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" /> Log in Active Workout
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Personal Best"
          value={`${exercise.personalBest.weight} kg`}
          subtitle={`× ${exercise.personalBest.reps} reps`}
          icon={<Trophy className="w-5 h-5 text-amber-400" />}
        />
        <MetricCard
          title="Best Volume"
          value={`${exercise.bestVolumeKg} kg`}
          subtitle="Single session"
          icon={<Activity className="w-5 h-5 text-brand-400" />}
        />
        <MetricCard
          title="Estimated 1RM"
          value={`${exercise.estimated1RM} kg`}
          subtitle="Theoretical max"
          icon={<Zap className="w-5 h-5 text-sky-400" />}
        />
        <MetricCard
          title="Total Sessions"
          value={exercise.totalSessions}
          subtitle="Logged sessions"
          icon={<Layers className="w-5 h-5 text-emerald-400" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <FilterTabs
          options={['Overview', 'History', 'Sets']}
          activeOption={activeTab}
          onSelect={(opt) => setActiveTab(opt as any)}
        />
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Progression Chart */}
          <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Progress Trajectory</h3>
                <p className="text-xs text-zinc-400">Tracking over recent training blocks</p>
              </div>

              <div className="flex items-center gap-1 bg-[#202023] p-1 rounded-xl border border-zinc-800 overflow-x-auto max-w-full no-scrollbar">
                {(['weight', 'volume', 'estimated1RM'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setChartMetric(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                      chartMetric === m
                        ? 'bg-brand-500 text-black shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {m === 'estimated1RM' ? 'Est. 1RM' : m}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exercise.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                  <XAxis dataKey="date" stroke="#71717A" fontSize={12} tickLine={false} />
                  <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181B',
                      borderColor: '#3F3F46',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={chartMetric}
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#22c55e', stroke: '#18181B', strokeWidth: 2 }}
                    activeDot={{ r: 7, fill: '#a3e635' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'History' && (
        <div className="space-y-3">
          {exercise.history.map((h, i) => (
            <div
              key={i}
              className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between text-sm"
            >
              <div>
                <span className="text-xs text-zinc-400 block font-medium">{h.date}</span>
                <span className="font-bold text-white text-base">{h.weight} kg × {h.reps} reps</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 block">Session Vol: {h.volume} kg</span>
                <span className="text-xs font-bold text-brand-400">1RM: {h.estimated1RM} kg</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SETS TAB */}
      {activeTab === 'Sets' && (
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">All-Time Recorded Set Patterns</h3>
          <div className="space-y-2 text-xs font-medium">
            <div className="p-3 bg-[#202023] rounded-xl flex justify-between border border-zinc-800">
              <span className="text-zinc-300">Set 1 Target</span>
              <span className="text-brand-400 font-bold">60.0 kg × 8 reps</span>
            </div>
            <div className="p-3 bg-[#202023] rounded-xl flex justify-between border border-zinc-800">
              <span className="text-zinc-300">Set 2 Target</span>
              <span className="text-brand-400 font-bold">60.0 kg × 7 reps</span>
            </div>
            <div className="p-3 bg-[#202023] rounded-xl flex justify-between border border-zinc-800">
              <span className="text-zinc-300">Set 3 Target</span>
              <span className="text-brand-400 font-bold">55.0 kg × 10 reps</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
