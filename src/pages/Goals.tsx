import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Trophy, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GoalCard } from '../components/common/GoalCard';

export const Goals: React.FC = () => {
  const { goals, setIsAddGoalModalOpen } = useApp();

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Fitness Goals 🎯
          </h2>
          <p className="text-xs text-zinc-400">Set targets for strength, body weight, nutrition & workout consistency</p>
        </div>

        <button
          onClick={() => setIsAddGoalModalOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Goal
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            GOAL TRACKER
          </span>
          <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-2">
            4 Active Fitness Milestones
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Stay consistent to reach your Bench Press 80kg target by Dec 2026!
          </p>
        </div>

        <div className="flex items-center justify-around md:justify-start gap-4 bg-[#202023] p-3.5 sm:p-4 rounded-2xl border border-zinc-800">
          <div className="text-center">
            <span className="text-xl sm:text-2xl font-black text-brand-400">75%</span>
            <span className="text-[10px] text-zinc-400 uppercase font-extrabold block">Bench Goal</span>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div className="text-center">
            <span className="text-xl sm:text-2xl font-black text-white">64%</span>
            <span className="text-[10px] text-zinc-400 uppercase font-extrabold block">Weight Goal</span>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};
