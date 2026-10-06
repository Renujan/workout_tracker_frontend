import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Zap, Trophy, Award, Layers, Apple, Crown, Lock } from 'lucide-react';
import { Achievement } from '../../types';
import { ProgressBar } from './ProgressBar';

interface AchievementCardProps {
  achievement: Achievement;
}

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Apple: <Apple className="w-5 h-5" />,
  Crown: <Crown className="w-5 h-5" />,
};

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const isUnlocked = achievement.unlocked;

  return (
    <motion.div
      whileHover={{ y: isUnlocked ? -3 : 0 }}
      className={`relative rounded-3xl overflow-hidden border transition-all flex flex-col justify-between group ${
        isUnlocked
          ? 'bg-[#18181B] border-brand-500/40 shadow-xl shadow-brand-500/5'
          : 'bg-[#18181B]/60 border-zinc-800/50 opacity-60 grayscale'
      }`}
    >
      {achievement.imageUrl && (
        <div className="h-28 relative overflow-hidden">
          <img
            src={achievement.imageUrl}
            alt={achievement.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/50 to-transparent" />
          <span
            className={`absolute top-3 right-3 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border shadow ${
              isUnlocked
                ? 'bg-brand-400 text-black border-brand-500'
                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
            }`}
          >
            {achievement.category}
          </span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0 transition-colors ${
                isUnlocked
                  ? 'bg-brand-500/15 border-brand-500/40 text-brand-400 shadow-md'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}
            >
              {iconMap[achievement.iconName] || <Trophy className="w-5 h-5" />}
            </div>

            <div>
              <h3 className="font-bold text-white text-base tracking-tight leading-snug">
                {achievement.title}
              </h3>
              <span className="text-[10px] text-zinc-400 font-extrabold uppercase">
                {isUnlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {achievement.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/60">
          {isUnlocked ? (
            <span className="text-[11px] text-brand-400 font-semibold flex items-center gap-1">
              Unlocked on {achievement.unlockedAt}
            </span>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-zinc-500" /> Progress
                </span>
                <span>
                  {achievement.progress}/{achievement.maxProgress}
                </span>
              </div>
              {achievement.progress !== undefined && achievement.maxProgress && (
                <ProgressBar
                  value={achievement.progress}
                  max={achievement.maxProgress}
                  showPercentage={false}
                  size="sm"
                  colorClass="from-zinc-500 to-zinc-400"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
