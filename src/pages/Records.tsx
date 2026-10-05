import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Flame, Sparkles, Dumbbell } from 'lucide-react';
import { PRCard } from '../components/common/PRCard';
import { FilterTabs } from '../components/common/FilterTabs';
import { mockPersonalRecords } from '../data/mockData';

export const Records: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryOptions = ['All', 'Strength', 'Rep', 'Volume'];

  const filteredRecords = mockPersonalRecords.filter((pr) => {
    if (activeCategory === 'All') return true;
    return pr.category === activeCategory.toLowerCase();
  });

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Personal Records 🏆
          </h2>
          <p className="text-xs text-zinc-400">All-time maximum lifts, volume peaks, and rep accomplishments</p>
        </div>

        <FilterTabs
          options={categoryOptions}
          activeOption={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Featured Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-amber-950/60 via-[#18181B] to-amber-950/40 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl shrink-0">
              <Trophy className="w-8 h-8 sm:w-9 sm:h-9 fill-amber-400 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-0.5 rounded-full border border-amber-500/20">
                HALL OF FAME
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-1">
                28 Lifetime Personal Records
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                You broke your Bench Press record on Sep 28 (+2.5 kg overload)!
              </p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center">
            <span className="text-2xl font-black text-amber-400">+2.5 kg</span>
            <span className="text-[10px] uppercase font-bold text-amber-200 block">Latest Increase</span>
          </div>
        </div>
      </motion.div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.map((pr, idx) => (
          <PRCard key={pr.id} pr={pr} isFeatured={idx === 0} />
        ))}
      </div>
    </div>
  );
};
