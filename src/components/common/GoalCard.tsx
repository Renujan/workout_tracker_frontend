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
      whileHover={{ y: -2 }}
      className="bg-[#18181B] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm tracking-tight">{goal.title}</h3>
          </div>
          <span className="text-xs font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
            {goal.progressPercent}%
          </span>
        </div>

        <div className="flex items-baseline justify-between my-3">
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Current</span>
            <span className="text-xl font-black text-white">
              {goal.currentValue} <span className="text-xs text-zinc-400 font-medium">{goal.unit}</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-400 block font-medium">Target</span>
            <span className="text-xl font-black text-brand-400">
              {goal.targetValue} <span className="text-xs text-zinc-400 font-medium">{goal.unit}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 space-y-2">
        <ProgressBar
          value={goal.currentValue}
          max={goal.targetValue}
          showPercentage={false}
          size="md"
        />

        {goal.deadline && (
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 pt-1 font-medium">
            <Calendar className="w-3 h-3 text-zinc-400" />
            <span>Target deadline: {goal.deadline}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
