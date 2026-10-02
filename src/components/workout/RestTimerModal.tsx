import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Plus, Minus, SkipForward, X, Timer } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CircularProgress } from '../common/CircularProgress';
import { formatTime } from '../../utils/formatters';

export const RestTimerModal: React.FC = () => {
  const { restTimer, adjustRestTimer, stopRestTimer } = useApp();

  if (!restTimer.isActive) return null;

  const percentage = Math.round((restTimer.secondsLeft / restTimer.totalSeconds) * 100);

  return (
    <AnimatePresence>
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="bg-[#18181B] border-2 border-brand-500/50 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex flex-col items-center w-72 text-center relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-1.5 text-brand-400 font-bold text-xs">
              <Timer className="w-4 h-4 animate-spin" />
              <span>REST TIMER</span>
            </div>
            <button
              onClick={stopRestTimer}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Circular timer */}
          <CircularProgress
            percentage={percentage}
            size={130}
            strokeWidth={8}
            color="#22c55e"
          >
            <span className="text-3xl font-black text-white tracking-tight">
              {formatTime(restTimer.secondsLeft)}
            </span>
            <span className="text-[10px] text-zinc-400 font-semibold uppercase mt-0.5">
              RESTING
            </span>
          </CircularProgress>

          {/* Quick adjustment controls */}
          <div className="flex items-center justify-center gap-2 mt-4 w-full">
            <button
              onClick={() => adjustRestTimer(-30)}
              className="flex-1 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" /> 30s
            </button>

            <button
              onClick={() => adjustRestTimer(30)}
              className="flex-1 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> 30s
            </button>

            <button
              onClick={stopRestTimer}
              className="py-1.5 px-3 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 font-bold text-xs flex items-center justify-center gap-1 transition-colors border border-brand-500/40"
            >
              <SkipForward className="w-3.5 h-3.5" /> Skip
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
