import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Dumbbell, Layers, ChevronRight, Activity } from 'lucide-react';
import { FilterTabs } from '../components/common/FilterTabs';
import { mockCompletedWorkouts } from '../data/mockData';
import { formatDate } from '../utils/formatters';

export const History: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSessionId, setSelectedSessionId] = useState(mockCompletedWorkouts[0].id);

  const filterOptions = ['All', 'Push', 'Pull', 'Legs', 'Cardio'];

  const filteredWorkouts = mockCompletedWorkouts.filter((w) => {
    if (selectedFilter === 'All') return true;
    return w.category === selectedFilter;
  });

  const selectedWorkout = mockCompletedWorkouts.find((w) => w.id === selectedSessionId) || mockCompletedWorkouts[0];

  return (
    <div className="space-y-6 pb-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Workout History</h2>
          <p className="text-xs text-zinc-400">Review past completed gym sessions & set logs</p>
        </div>

        <FilterTabs
          options={filterOptions}
          activeOption={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </div>

      {/* Main Split View: Workout List + Detailed Selected Session View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Completed Sessions</h3>
          {filteredWorkouts.map((w) => {
            const isSelected = w.id === selectedSessionId;
            return (
              <motion.div
                key={w.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedSessionId(w.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#18181B] border-brand-500/50 shadow-lg shadow-brand-500/5'
                    : 'bg-[#18181B]/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                    {w.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">{formatDate(w.date)}</span>
                </div>

                <h4 className="font-bold text-white text-base mt-2">{w.name}</h4>

                <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2 font-medium">
                  <span>⏱️ {w.durationMinutes} min</span>
                  <span>•</span>
                  <span>🏋️‍♂️ {w.totalVolumeKg.toLocaleString()} kg</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Session Breakdown */}
        {selectedWorkout && (
          <div className="lg:col-span-2 bg-[#18181B] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-black text-brand-400 uppercase tracking-widest bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
                  {selectedWorkout.category} WORKOUT
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight mt-2">
                  {selectedWorkout.name}
                </h3>
                <p className="text-xs text-zinc-400 font-medium mt-1">
                  Completed on {formatDate(selectedWorkout.date)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-[#202023] p-3 rounded-2xl border border-zinc-800 text-center">
                <div>
                  <span className="text-[10px] sm:text-xs text-zinc-400 block font-semibold">Duration</span>
                  <span className="text-base sm:text-lg font-black text-white">{selectedWorkout.durationMinutes} m</span>
                </div>
                <div className="border-x border-zinc-800">
                  <span className="text-[10px] sm:text-xs text-zinc-400 block font-semibold">Volume</span>
                  <span className="text-base sm:text-lg font-black text-brand-400">{selectedWorkout.totalVolumeKg.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-zinc-400 block font-semibold">Sets</span>
                  <span className="text-base sm:text-lg font-black text-white">{selectedWorkout.totalSets}</span>
                </div>
              </div>
            </div>

            {/* Exercise Details Table */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white tracking-tight">Logged Exercise Summary</h4>
              <div className="space-y-3">
                {selectedWorkout.exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="bg-[#202023] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-sm">{ex.name}</h5>
                        <span className="text-xs text-zinc-400">{ex.sets} working sets logged</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-zinc-400 block">Top Weight</span>
                      <span className="text-sm font-extrabold text-brand-400">{ex.maxWeightKg} kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
