import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Lock, Sparkles } from 'lucide-react';
import { AchievementCard } from '../components/common/AchievementCard';
import { FilterTabs } from '../components/common/FilterTabs';
import { mockAchievements } from '../data/mockData';

export const Achievements: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filterOptions = ['All', 'Unlocked', 'Locked'];

  const filtered = mockAchievements.filter((ac) => {
    if (filter === 'Unlocked') return ac.unlocked;
    if (filter === 'Locked') return !ac.unlocked;
    return true;
  });

  const unlockedCount = mockAchievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Achievements & Trophies 🏆
          </h2>
          <p className="text-xs text-zinc-400">Unlock badges by hitting fitness milestones, streaks & PRs</p>
        </div>

        <FilterTabs
          options={filterOptions}
          activeOption={filter}
          onSelect={setFilter}
        />
      </div>

      {/* Hero Achievement Stats Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold shadow-lg shrink-0">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">
              {unlockedCount} of {mockAchievements.length} Achievements Unlocked
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Keep training consistently to unlock 30 Day Streak!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/30">
            {Math.round((unlockedCount / mockAchievements.length) * 100)}% Complete
          </span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <AchievementCard key={item.id} achievement={item} />
        ))}
      </div>
    </div>
  );
};
