import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Dumbbell, Clock, Layers, ChevronRight, Sparkles, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterTabs } from '../components/common/FilterTabs';
import { mockWorkoutPlans, mockCompletedWorkouts } from '../data/mockData';
import { formatDate } from '../utils/formatters';

export const Workout: React.FC = () => {
  const navigate = useNavigate();
  const { activeWorkout, setIsSessionCompareOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'Today' | 'Plans' | 'History'>('Today');

  const todayPushDayExercises = activeWorkout.exercises;

  return (
    <div className="space-y-6 pb-6">
      {/* Page Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Workout Overview</h2>
          <p className="text-xs text-zinc-400">Choose a workout plan, log active sets, or view history</p>
        </div>

        <FilterTabs
          options={['Today', 'Plans', 'History']}
          activeOption={activeTab}
          onSelect={(opt) => setActiveTab(opt as any)}
        />
      </div>

      {/* TODAY TAB */}
      {activeTab === 'Today' && (
        <div className="space-y-6">
          {/* Active Workout Banner */}
          <div className="bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border-2 border-brand-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
                RECOMMENDED TODAY
              </span>
              <h3 className="text-3xl font-black text-white tracking-tight">Push Day Session</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-400">
                <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4 text-brand-400" /> 5 exercises</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Layers className="w-4 h-4 text-brand-400" /> 18 working sets</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-brand-400" /> ~58 minutes</span>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <button
                onClick={() => navigate('/workout/active')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-sm shadow-xl shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                Start Active Workout
              </button>

              <button
                onClick={() => setIsSessionCompareOpen(true)}
                className="px-4 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-colors border border-zinc-700"
              >
                Compare Session
              </button>
            </div>
          </div>

          {/* Exercise List for Today */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-tight">Today's Push Day Exercises</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayPushDayExercises.map((ex, idx) => (
                <motion.div
                  key={ex.exerciseId}
                  whileHover={{ y: -2 }}
                  className="bg-[#18181B] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                        {ex.muscleGroup}
                      </span>
                      <h4 className="font-bold text-white text-lg tracking-tight mt-1.5">{ex.name}</h4>
                    </div>
                    <button
                      onClick={() => navigate('/workout/active')}
                      className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-brand-500 hover:text-black text-zinc-300 flex items-center justify-center transition-colors"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[11px]">Previous Performance</span>
                      <span className="font-bold text-zinc-200">{ex.previousPerformance}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-zinc-400 block text-[11px]">Target Goal</span>
                      <span className="font-bold text-brand-400">{ex.targetInfo}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PLANS TAB */}
      {activeTab === 'Plans' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockWorkoutPlans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -4 }}
              className="bg-[#18181B] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div className="h-44 relative">
                <img
                  src={plan.imageUrl}
                  alt={plan.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/40 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-extrabold text-black bg-brand-400 px-3 py-1 rounded-full shadow">
                  {plan.category} Plan
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {plan.exerciseCount} exercises • {plan.estimatedSets} working sets • ~{plan.estimatedMinutes} mins
                  </p>
                </div>

                <div className="space-y-2 border-t border-zinc-800 pt-3">
                  {plan.exercises.map((item) => (
                    <div key={item.exerciseId} className="flex justify-between items-center text-xs text-zinc-300">
                      <span className="font-medium">{item.exerciseName}</span>
                      <span className="text-zinc-400 font-bold">{item.targetSets} × {item.targetReps}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/workout/active')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-sm shadow-lg hover:shadow-brand-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-black" />
                  Start Plan Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'History' && (
        <div className="space-y-4">
          {mockCompletedWorkouts.map((session) => (
            <motion.div
              key={session.id}
              whileHover={{ y: -2 }}
              onClick={() => navigate('/history')}
              className="bg-[#18181B] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                    {session.category}
                  </span>
                  <span className="text-xs text-zinc-400">{formatDate(session.date)}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{session.name}</h3>
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <span>⏱️ {session.durationMinutes} mins</span>
                  <span>🏋️‍♂️ {session.totalVolumeKg.toLocaleString()} kg volume</span>
                  <span>📊 {session.totalSets} total sets</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-brand-400 font-bold">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
