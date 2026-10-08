import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { InsightCard } from '../components/common/InsightCard';
import { mockInsights } from '../data/mockData';

export const Insights: React.FC = () => {
  const totalInsights = mockInsights.length;

  // Derive a dynamic highlight from the most recent insight
  const latestInsight = mockInsights[0];
  const highlightQuote = latestInsight ? `"${latestInsight.summary} 🔥"` : '"Keep training to generate insights!"';

  // Build a dynamic subtitle based on insight type distribution
  const trainingWeeks = 8; // Would be computed from history in a full app
  const insightSummaryText = `Informational analysis based on your ${trainingWeeks}-week Progressive Overload logs`;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          Fitness Insights 💡
        </h2>
        <p className="text-xs text-zinc-400">Automated training insights derived from your workout logs &amp; nutrition history</p>
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-500/15 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold shadow-lg shrink-0">
            <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-0.5 rounded-full border border-brand-500/20">
              INTELLIGENCE SUMMARY
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight mt-1">
              {totalInsights} Key Performance Highlight{totalInsights !== 1 ? 's' : ''} Identified
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{insightSummaryText}</p>
          </div>
        </div>

        <div className="bg-brand-500/10 border border-brand-500/20 px-4 py-2 rounded-2xl text-xs text-brand-400 font-bold text-center max-w-xs">
          {highlightQuote}
        </div>
      </motion.div>

      {/* Insights Grid */}
      {mockInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-500 text-sm font-semibold">
          <Lightbulb className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
          No insights generated yet. Keep logging your workouts!
        </div>
      )}
    </div>
  );
};
