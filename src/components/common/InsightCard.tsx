import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Apple, Dumbbell, Activity, Info } from 'lucide-react';
import { FitnessInsight } from '../../types';

interface InsightCardProps {
  insight: FitnessInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'strength':
        return <TrendingUp className="w-5 h-5 text-brand-400" />;
      case 'nutrition':
        return <Apple className="w-5 h-5 text-emerald-400" />;
      case 'training':
        return <Dumbbell className="w-5 h-5 text-sky-400" />;
      case 'volume':
        return <Activity className="w-5 h-5 text-amber-400" />;
      default:
        return <Info className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-[#18181B] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#202023] border border-zinc-800 flex items-center justify-center">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-bold text-white text-base tracking-tight">{insight.title}</h3>
              <span className="text-[11px] text-zinc-400 font-medium">{insight.date}</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700/60">
            {insight.tag}
          </span>
        </div>

        <h4 className="text-sm font-bold text-brand-400 my-2">{insight.summary}</h4>

        <p className="text-xs text-zinc-300 leading-relaxed font-normal">
          {insight.detail}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Informational Insight</span>
        <span className="text-brand-400 font-semibold cursor-pointer hover:underline">
          View details →
        </span>
      </div>
    </motion.div>
  );
};
