import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Flame, Play, Clock, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTime } from '../../utils/formatters';

const routeTitles: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview & daily momentum' },
  '/workout': { title: 'Workouts', subtitle: 'Push, Pull, Legs & Custom plans' },
  '/workout/active': { title: 'Active Workout Session', subtitle: 'Push Day in progress' },
  '/exercises': { title: 'Exercise Library', subtitle: 'Explore movements & technique' },
  '/history': { title: 'Workout History', subtitle: 'Past sessions & logs' },
  '/progress': { title: 'Progress & Analytics', subtitle: 'Strength & volume metrics' },
  '/records': { title: 'Personal Records 🏆', subtitle: 'All-time bests & milestones' },
  '/nutrition': { title: 'Nutrition & Macros', subtitle: 'Protein, calories & hydration' },
  '/body': { title: 'Body Progress', subtitle: 'Weight, measurements & photos' },
  '/goals': { title: 'Fitness Goals', subtitle: 'Targets & progress milestones' },
  '/achievements': { title: 'Achievements', subtitle: 'Badges & unlocked trophies' },
  '/insights': { title: 'Fitness Insights', subtitle: 'Personalized training data' },
  '/profile': { title: 'Profile', subtitle: 'User account & statistics' },
  '/settings': { title: 'Settings', subtitle: 'Preferences & units' },
};

export const Header: React.FC = () => {
  const location = useLocation();
  const { user, activeWorkout } = useApp();

  // Route title match
  let matched = routeTitles[location.pathname];
  if (!matched && location.pathname.startsWith('/exercises/')) {
    matched = { title: 'Exercise Details', subtitle: 'Performance history & 1RM' };
  }
  if (!matched) {
    matched = { title: 'ProgressX', subtitle: 'Fitness Intelligence' };
  }

  return (
    <header className="h-16 sm:h-20 bg-[#09090B]/80 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
      <div>
        <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          {matched.title}
        </h1>
        {matched.subtitle && (
          <p className="text-xs text-zinc-400 hidden sm:block font-medium">
            {matched.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Active Workout Indicator if not on active workout page */}
        {!activeWorkout.isCompleted && location.pathname !== '/workout/active' && (
          <NavLink
            to="/workout/active"
            className="flex items-center gap-2 bg-brand-500/15 border border-brand-500/40 text-brand-400 px-3 py-1.5 rounded-full text-xs font-bold animate-pulse hover:bg-brand-500/25 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400" />
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Active:</span>
            <span>{formatTime(activeWorkout.elapsedSeconds)}</span>
          </NavLink>
        )}

        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 bg-[#18181B] border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 shadow-sm">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{user.currentStreak} Days</span>
        </div>

        {/* Notifications */}
        <button className="w-9 h-9 rounded-full bg-[#18181B] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-400" />
        </button>

        {/* Profile Avatar */}
        <NavLink to="/profile" className="flex items-center gap-2 group">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-zinc-700 group-hover:border-brand-400 transition-colors"
          />
        </NavLink>
      </div>
    </header>
  );
};
