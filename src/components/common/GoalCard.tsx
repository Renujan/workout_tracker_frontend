import React from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar } from 'lucide-react';
import { FitnessGoal } from '../../types';
import { ProgressBar } from './ProgressBar';

interface GoalCardProps {
  goal: FitnessGoal;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-[#18181B] border border-zinc-800/80 hover:border-brand-500/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
    >
      {goal.imageUrl && (
        <div className="h-32 relative overflow-hidden">
          <img
            src={goal.imageUrl}
            alt={goal.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/40 to-transparent" />
          <span className="absolute top-3 right-3 text-[10px] uppercase font-extrabold tracking-wider text-black bg-brand-400 px-2.5 py-1 rounded-full shadow">
            {goal.category}
          </span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-base tracking-tight">{goal.title}</h3>
            </div>
            <span className="text-xs font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
              {goal.progressPercent}%
            </span>
          </div>

          <div className="flex items-baseline justify-between my-3 bg-[#202023] p-3 rounded-2xl border border-zinc-800/80">
            <div>
              <span className="text-[11px] text-zinc-400 block font-medium uppercase tracking-wider">Current</span>
              <span className="text-lg sm:text-xl font-black text-white">
                {goal.currentValue} <span className="text-xs text-zinc-400 font-medium">{goal.unit}</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-zinc-400 block font-medium uppercase tracking-wider">Target</span>
              <span className="text-lg sm:text-xl font-black text-brand-400">
                {goal.targetValue} <span className="text-xs text-zinc-400 font-medium">{goal.unit}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <ProgressBar
            value={goal.currentValue}
            max={goal.targetValue}
            showPercentage={false}
            size="md"
          />

          {goal.deadline && (
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 pt-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>Target deadline: {goal.deadline}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
