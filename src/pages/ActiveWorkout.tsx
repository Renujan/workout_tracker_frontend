import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Plus,
  Minus,
  Check,
  CheckCircle2,
  Trash2,
  Timer as TimerIcon,
  Trophy,
  Dumbbell,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTime } from '../utils/formatters';

export const ActiveWorkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeWorkout,
    updateSet,
    toggleSetCompleted,
    addSetToExercise,
    removeSetFromExercise,
    completeCurrentWorkout,
    startRestTimer,
    setIsSessionCompareOpen,
  } = useApp();

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  const currentExercise = activeWorkout.exercises[activeExerciseIndex] || activeWorkout.exercises[0];

  const handleFinishWorkout = () => {
    completeCurrentWorkout();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Gym Header Bar */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/40 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/40 flex items-center justify-center text-brand-400 font-extrabold shadow-md">
            <Dumbbell className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-black text-brand-400">
              ACTIVE GYM SESSION
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {activeWorkout.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Workout Timer */}
          <div className="flex items-center gap-2 bg-[#202023] border border-zinc-800 px-4 py-2 rounded-2xl">
            <Clock className="w-4 h-4 text-brand-400 animate-pulse" />
            <span className="text-xl font-black text-white tracking-tight font-mono">
              {formatTime(activeWorkout.elapsedSeconds)}
            </span>
          </div>

          <button
            onClick={handleFinishWorkout}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Finish Workout ✓
          </button>
        </div>
      </div>

      {/* Exercise Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {activeWorkout.exercises.map((ex, idx) => {
          const isSelected = idx === activeExerciseIndex;
          const completedSetsCount = ex.sets.filter((s) => s.completed).length;

          return (
            <button
              key={ex.exerciseId}
              onClick={() => setActiveExerciseIndex(idx)}
              className={`px-4 py-3 rounded-2xl border font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-brand-500 text-black border-brand-400 shadow-lg shadow-brand-500/20'
                  : 'bg-[#18181B] text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span>{ex.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {completedSetsCount}/{ex.sets.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Active Exercise Focus Card */}
      {currentExercise && (
        <motion.div
          key={currentExercise.exerciseId}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
        >
          {/* Exercise Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                  {currentExercise.muscleGroup}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  Previous: <span className="text-zinc-200 font-bold">{currentExercise.previousPerformance}</span>
                </span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                {currentExercise.name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSessionCompareOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#202023] hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-brand-400 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 fill-brand-400" />
                Compare vs Last Session
              </button>

              <button
                onClick={() => startRestTimer(90)}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 flex items-center gap-1.5 transition-colors"
              >
                <TimerIcon className="w-3.5 h-3.5 text-brand-400" />
                Rest Timer (90s)
              </button>
            </div>
          </div>

          {/* Set Rows Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-extrabold uppercase tracking-wider text-zinc-500 px-3">
            <div className="col-span-2">SET</div>
            <div className="col-span-4 text-center">WEIGHT (KG)</div>
            <div className="col-span-4 text-center">REPS</div>
            <div className="col-span-2 text-right">STATUS</div>
          </div>

          {/* Set Rows Interactive Items */}
          <div className="space-y-3">
            {currentExercise.sets.map((set, setIdx) => (
              <motion.div
                key={set.id}
                layout
                className={`grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center p-4 rounded-2xl border transition-all ${
                  set.completed
                    ? 'bg-brand-500/10 border-brand-500/40 shadow-inner'
                    : 'bg-[#202023] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Set Title */}
                <div className="sm:col-span-2 flex items-center justify-between sm:justify-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-zinc-800 flex items-center justify-center font-black text-xs text-white">
                      {set.setNumber}
                    </span>
                    <span className="text-xs font-bold text-zinc-300">Working Set</span>
                  </div>
                  {set.isPR && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/40 font-bold flex items-center gap-0.5">
                      <Trophy className="w-3 h-3" /> PR!
                    </span>
                  )}
                </div>

                {/* Weight Control */}
                <div className="sm:col-span-4 flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-zinc-400 sm:hidden">Weight:</span>
                  <button
                    onClick={() => updateSet(activeExerciseIndex, setIdx, Math.max(0, set.weight - 2.5), set.reps)}
                    className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="bg-[#18181B] border border-zinc-800 px-4 py-1.5 rounded-xl font-black text-lg text-white min-w-[80px] text-center">
                    {set.weight} <span className="text-xs font-normal text-zinc-400">kg</span>
                  </div>
                  <button
                    onClick={() => updateSet(activeExerciseIndex, setIdx, set.weight + 2.5, set.reps)}
                    className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Reps Control */}
                <div className="sm:col-span-4 flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-zinc-400 sm:hidden">Reps:</span>
                  <button
                    onClick={() => updateSet(activeExerciseIndex, setIdx, set.weight, Math.max(1, set.reps - 1))}
                    className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="bg-[#18181B] border border-zinc-800 px-4 py-1.5 rounded-xl font-black text-lg text-brand-400 min-w-[70px] text-center">
                    {set.reps} <span className="text-xs font-normal text-zinc-400">reps</span>
                  </div>
                  <button
                    onClick={() => updateSet(activeExerciseIndex, setIdx, set.weight, set.reps + 1)}
                    className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Complete Set Checkmark Button & Delete */}
                <div className="sm:col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => toggleSetCompleted(activeExerciseIndex, setIdx)}
                    className={`flex-1 sm:flex-none h-11 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
                      set.completed
                        ? 'bg-brand-500 text-black shadow-md shadow-brand-500/20'
                        : 'bg-zinc-800 hover:bg-brand-500 hover:text-black text-zinc-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{set.completed ? 'Done ✓' : 'Complete'}</span>
                  </button>

                  <button
                    onClick={() => removeSetFromExercise(activeExerciseIndex, setIdx)}
                    className="w-9 h-11 rounded-xl bg-zinc-800/60 hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <button
              onClick={() => addSetToExercise(activeExerciseIndex)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-zinc-700"
            >
              <Plus className="w-4 h-4" /> Add Working Set
            </button>

            {/* Next Exercise Navigation */}
            {activeExerciseIndex < activeWorkout.exercises.length - 1 ? (
              <button
                onClick={() => setActiveExerciseIndex(activeExerciseIndex + 1)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
              >
                Next Exercise: {activeWorkout.exercises[activeExerciseIndex + 1].name}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishWorkout}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
              >
                Complete Push Day Workout 🎉
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
