import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Apple,
  UserCheck,
  Target,
  Trophy,
  Lightbulb,
  User,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Workout', path: '/workout', icon: <Dumbbell className="w-5 h-5" /> },
  { label: 'Progress', path: '/progress', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Nutrition', path: '/nutrition', icon: <Apple className="w-5 h-5" /> },
  { label: 'Body', path: '/body', icon: <UserCheck className="w-5 h-5" /> },
  { label: 'Goals', path: '/goals', icon: <Target className="w-5 h-5" /> },
  { label: 'Achievements', path: '/achievements', icon: <Trophy className="w-5 h-5" /> },
  { label: 'Insights', path: '/insights', icon: <Lightbulb className="w-5 h-5" /> },
];

const bottomNavItems: NavItem[] = [
  { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  { label: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#09090B] border-r border-zinc-800/80 fixed inset-y-0 left-0 z-30 select-none">
      {/* Brand Logo */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-zinc-800/60">
        <NavLink to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-bright flex items-center justify-center text-black font-black shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            PX
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              Progress<span className="text-brand-400">X</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase block">
              Fitness Intelligence
            </span>
          </div>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          Menu
        </div>
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group relative',
                isActive
                  ? 'bg-[#18181B] text-brand-400 border border-brand-500/30 shadow-md shadow-brand-500/5'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-brand-400 rounded-r-full" />
              )}
              <span
                className={cn(
                  'transition-colors',
                  isActive ? 'text-brand-400' : 'text-zinc-500 group-hover:text-zinc-300'
                )}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Pro Badge Banner */}
      <div className="px-4 py-2">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-zinc-900 via-[#18181B] to-zinc-900 border border-brand-500/30 text-xs">
          <div className="flex items-center gap-2 text-brand-400 font-bold mb-1">
            <Sparkles className="w-4 h-4 fill-brand-400" />
            <span>ProgressX Pro</span>
          </div>
          <p className="text-zinc-400 text-[11px] leading-snug">
            Advanced analytics & DRF backend ready
          </p>
        </div>
      </div>

      {/* Bottom Navigation (Profile, Settings) */}
      <div className="p-3 border-t border-zinc-800/80 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 group',
                isActive
                  ? 'bg-[#18181B] text-brand-400 border border-brand-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              )}
            >
              <span
                className={cn(
                  'transition-colors',
                  isActive ? 'text-brand-400' : 'text-zinc-500 group-hover:text-zinc-300'
                )}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};
