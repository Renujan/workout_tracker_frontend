import React from 'react';
import { motion } from 'framer-motion';
import { User, Dumbbell, Activity, Flame, Trophy, Calendar, Mail, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/common/MetricCard';

export const Profile: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Profile Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-brand-500/40 shadow-2xl"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-500 border-2 border-black flex items-center justify-center text-black text-xs font-black">
              ✓
            </span>
          </div>

          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{user.name}</h2>
                <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1 font-medium mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" /> {user.email}
                </p>
              </div>

              <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold text-zinc-200 flex items-center justify-center gap-1.5 transition-colors self-center sm:self-auto">
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-zinc-400 pt-2 border-t border-zinc-800/80">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-brand-400" /> Training since {user.trainingSince}
              </span>
              <span>•</span>
              <span>Current Weight: <strong className="text-white">{user.currentWeightKg} kg</strong></span>
              <span>•</span>
              <span>Target Weight: <strong className="text-brand-400">{user.targetWeightKg} kg</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Workouts"
          value={user.totalWorkouts}
          subtitle="Lifetime sessions logged"
          icon={<Dumbbell className="w-5 h-5 text-brand-400" />}
        />
        <MetricCard
          title="Total Volume Lifted"
          value={`${(user.totalVolumeKg / 1000).toFixed(1)}k kg`}
          subtitle="Lifetime volume"
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
        />
        <MetricCard
          title="Active Streak"
          value={`${user.currentStreak} Days`}
          subtitle={`Best: ${user.longestStreak} days`}
          icon={<Flame className="w-5 h-5 text-amber-400" />}
        />
        <MetricCard
          title="Personal Records"
          value={user.totalPRs}
          subtitle="Milestones achieved"
          icon={<Trophy className="w-5 h-5 text-amber-400" />}
        />
      </div>

      {/* Account Details & Training Preferences Summary */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Account & Athlete Info</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 bg-[#202023] rounded-2xl border border-zinc-800 space-y-1">
            <span className="text-zinc-500 block uppercase font-extrabold text-[10px]">Training Goal</span>
            <span className="text-white font-bold text-sm">Hypertrophy & Progressive Overload</span>
          </div>

          <div className="p-4 bg-[#202023] rounded-2xl border border-zinc-800 space-y-1">
            <span className="text-zinc-500 block uppercase font-extrabold text-[10px]">Weekly Workout Target</span>
            <span className="text-brand-400 font-bold text-sm">6 Sessions / Week (Push, Pull, Legs)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
