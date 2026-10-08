import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GoalCard } from '../components/common/GoalCard';

export const Goals: React.FC = () => {
  const { goals, setIsAddGoalModalOpen } = useApp();

  // Dynamically compute active count and summary stats
  const activeGoals = goals.length;

  // Find the exercise goal closest to deadline for motivational text
  const exerciseGoal = goals.find((g) => g.category === 'exercise');
  const weightGoal = goals.find((g) => g.category === 'weight');

  const exercisePercent = exerciseGoal
    ? Math.min(100, Math.round((exerciseGoal.currentValue / exerciseGoal.targetValue) * 100))
    : null;
  const weightPercent = weightGoal
    ? Math.min(100, Math.round((weightGoal.currentValue / weightGoal.targetValue) * 100))
    : null;

  const motivationalText = exerciseGoal && exerciseGoal.deadline
    ? `Stay consistent to reach your ${exerciseGoal.title} ${exerciseGoal.targetValue}${exerciseGoal.unit} target by ${exerciseGoal.deadline}!`
    : 'Stay consistent to hit all your fitness milestones!';

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Fitness Goals 🎯
          </h2>
          <p className="text-xs text-zinc-400">Set targets for strength, body weight, nutrition &amp; workout consistency</p>
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
            {activeGoals} Active Fitness Milestone{activeGoals !== 1 ? 's' : ''}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">{motivationalText}</p>
        </div>

        <div className="flex items-center justify-around md:justify-start gap-4 bg-[#202023] p-3.5 sm:p-4 rounded-2xl border border-zinc-800">
          {exercisePercent !== null && (
            <>
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-black text-brand-400">{exercisePercent}%</span>
                <span className="text-[10px] text-zinc-400 uppercase font-extrabold block">
                  {exerciseGoal?.title.split(' ')[0]} Goal
                </span>
              </div>
              {weightPercent !== null && <div className="w-px h-8 bg-zinc-800" />}
            </>
          )}
          {weightPercent !== null && (
            <div className="text-center">
              <span className="text-xl sm:text-2xl font-black text-white">{weightPercent}%</span>
              <span className="text-[10px] text-zinc-400 uppercase font-extrabold block">Weight Goal</span>
            </div>
          )}
          {exercisePercent === null && weightPercent === null && (
            <div className="text-center">
              <span className="text-xl sm:text-2xl font-black text-zinc-400">0%</span>
              <span className="text-[10px] text-zinc-400 uppercase font-extrabold block">No Goals Yet</span>
            </div>
          )}
        </div>
      </div>

      {/* Goals Grid */}
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500 text-sm font-semibold">
          <Target className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
          No goals yet. Create your first goal to get started!
        </div>
      )}
    </div>
  );
};
