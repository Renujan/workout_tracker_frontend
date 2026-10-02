import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  TrendingUp,
  Apple,
  User,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { setIsQuickActionOpen } = useApp();

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Workout', path: '/workout', icon: <Dumbbell className="w-5 h-5" /> },
    { label: 'Progress', path: '/progress', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Nutrition', path: '/nutrition', icon: <Apple className="w-5 h-5" /> },
    { label: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-xl border-t border-zinc-800/80 px-4 py-2 select-none">
      <div className="flex items-center justify-around relative max-w-md mx-auto">
        {/* First 2 items */}
        {navItems.slice(0, 2).map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all',
                isActive ? 'text-brand-400 font-bold' : 'text-zinc-500 hover:text-zinc-300 font-medium'
              )}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}

        {/* Floating Central '+' Action Button */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={() => setIsQuickActionOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-500 to-brand-bright text-black flex items-center justify-center shadow-lg shadow-brand-500/30 active:scale-90 transition-transform border-4 border-[#09090B]"
            aria-label="Quick Action"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>
          <span className="text-[10px] font-bold text-zinc-400 mt-0.5">Quick</span>
        </div>

        {/* Last 2 items (skipping Profile or using Nutrition/Progress) */}
        {navItems.slice(2, 4).map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all',
                isActive ? 'text-brand-400 font-bold' : 'text-zinc-500 hover:text-zinc-300 font-medium'
              )}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
