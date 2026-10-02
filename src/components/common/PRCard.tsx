import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Sparkles } from 'lucide-react';
import { PersonalRecord } from '../../types';
import { formatDate } from '../../utils/formatters';

interface PRCardProps {
  pr: PersonalRecord;
  isFeatured?: boolean;
}

export const PRCard: React.FC<PRCardProps> = ({ pr, isFeatured = false }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`relative rounded-2xl p-5 border overflow-hidden transition-all shadow-xl ${
        isFeatured
          ? 'bg-gradient-to-br from-amber-950/40 via-[#18181B] to-zinc-900 border-amber-500/50'
          : 'bg-[#18181B] border-zinc-800/80 hover:border-zinc-700'
      }`}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-black text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-bl-xl shadow flex items-center gap-1">
          <Sparkles className="w-3 h-3 fill-black" />
          NEW PERSONAL RECORD 🏆
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl">
            {pr.icon || '🏆'}
          </div>
          <div>
            <h3 className="font-bold text-white text-base tracking-tight">{pr.exerciseName}</h3>
            <span className="text-xs text-zinc-400 font-medium">{formatDate(pr.date)}</span>
          </div>
        </div>

        {!isFeatured && (
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            +{pr.improvementKg} kg
          </span>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
        <div>
          <span className="text-xs text-zinc-400 block font-medium">Record Performance</span>
          <span className="text-2xl font-black text-white tracking-tight">
            {pr.weightKg} kg <span className="text-lg text-brand-400 font-bold">× {pr.reps}</span>
          </span>
        </div>

        <div className="text-right">
          <span className="text-xs text-zinc-400 block font-medium">Previous</span>
          <span className="text-sm font-semibold text-zinc-300">
            {pr.previousWeightKg} kg × {pr.previousReps}
          </span>
        </div>
      </div>

      {isFeatured && (
        <div className="mt-3 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs text-amber-300 font-semibold">
          <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Improvement: +{pr.improvementKg} kg over previous best!</span>
        </div>
      )}
    </motion.div>
  );
};
