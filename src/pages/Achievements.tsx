import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
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
  const totalCount = mockAchievements.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  // Find the next locked achievement to show dynamically
  const nextLocked = mockAchievements.find((a) => !a.unlocked);
  const motivationalText = nextLocked
    ? `Keep training consistently to unlock "${nextLocked.title}"!`
    : 'Amazing! You have unlocked all achievements! 🎉';

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Achievements &amp; Trophies 🏆
          </h2>
          <p className="text-xs text-zinc-400">Unlock badges by hitting fitness milestones, streaks &amp; PRs</p>
        </div>

        <FilterTabs
          options={filterOptions}
          activeOption={filter}
          onSelect={setFilter}
        />
      </div>

      {/* Hero Achievement Stats Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-500/15 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold shadow-lg shrink-0">
            <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {unlockedCount} of {totalCount} Achievements Unlocked
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{motivationalText}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/30">
            {completionPercent}% Complete
          </span>
          {nextLocked && (
            <span className="text-xs font-bold text-zinc-400 bg-zinc-800 px-3.5 py-1.5 rounded-full border border-zinc-700 flex items-center gap-1">
              <Lock className="w-3 h-3" /> {totalCount - unlockedCount} Locked
            </span>
          )}
        </div>
      </div>

      {/* Achievements Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((item) => (
            <AchievementCard key={item.id} achievement={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-500 text-sm font-semibold">
          No achievements in this category yet.
        </div>
      )}
    </div>
  );
};
